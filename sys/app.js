var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var ejs = require('ejs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//var connection = require('./model/db');
var mysql = require('mysql');

var hashmap = require('hashmap');

var fs = require('fs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);
//app.use(express.static(path.join(__dirname, 'images')));
app.use('/images', express.static(__dirname+'/images/'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//var io = require('socket.io')(1234);
//console.log("start to listen on socket..");
//io.on('reqData', function (data) {
//  console.log(data);
//  socket.emit('getData', { my: 'data' });
//});

var connection = require('./model/db');

var io = require('socket.io')(1234);
console.log("start to listen on socket..");
io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on('get_profile', function (DATA) {
    /*
      load data from database
      params: DATA {user_name}
      returns: DATA {user_info, task_post, task_serve, skills}
      return type: user_info, task_post, task_serve, skills have same fields as database table
    */
    console.log(DATA);

    var query_user_info_body = "select * from User_Info where username = " + DATA.user_name;
    connection.query(query_user_info_body, function(err, user_info_rows, fields) {
      if (err) {
        console.log("error in get_profile: get user info!");
        throw err;
      }

      var query_task_post_body = "select * from User_Task_Post where user_id = " + user_info_rows[0].user_id;
      connection.query(query_task_post_body, function(err, task_post_rows, fields) {
        if (err) {
          console.log("error in get_profile: get user post task!");
          throw err;
        }

        var query_task_serve_body = "select * from User_Task_Serve where user_id = " + user_info_rows[0].user_id;
        connection.query(query_task_serve_body, function(err, task_serve_rows, fields) {
          if (err) {
            console.log("error in get_profile: get user task serve!");
            throw err;
          }

          var query_skills_body = "select * from User_Tag, Skill_Tag \
                              where User_Tag.tag_id = Skill_Tag.skill_tag_id and \
                              User_Tag.user_id = " + user_info_rows[0].user_id;
          connection.query(query_skills_body, function(err, skill_rows, fields) {
            if (err) {
              console.log("error in get_profile: get skills!");
              throw err;
            }

            socket.emit('DATA', {user_info : user_info_rows[0], task_post : task_post_rows,
              task_serve : task_serve_rows, skills : skill_rows});
          });
        });
      });
    });
  });

  socket.on('login', function (DATA) {
    /*
      login function
      params: DATA {user_name, password}
      returns: DATA {state, info}
      return type: state(bool) indicates login state \
                   info(string) indicates failure reason
    */
    console.log(DATA);



    var query_login_body = "select * from User_Info where username = " + DATA.user_name;
    connection.query(query_login_body, function(err, rows, fields) {
      if (err) throw err;
      console.log("error in login!");

      if (rows.length <= 0) {
        socket.emit("DATA", {state : false, info : "user name not found"});
      } else if (rows[0].password != DATA.password) {
        socket.emit("DATA", {state : false, info : "wrong password"});
      } else {
        socket.emit("DATA", {state : true});
      }

    });
  });

  socket.on('register', function(DATA) {
    /*
      register function
      params: DATA {email, user_name, password}
      returns: DATA {state, info}
      return type: state(bool) indicate register state
                   info(string) indicate failure reason
    */
    console.log(DATA);

    var query_user_name_body = "select * from User_Info where \
                          username = " + DATA.user_name;
    connection.query(query_user_name_body, function(err, user_name_rows, field) {
      if (err) {
        console.log("error in register: query username!");
        throw err;
      }

      if (user_name_rows.length > 0) {
        socket.emit("DATA", {state : false, info : "user name exists"});
      }

      var query_email_body = "select * from User_Info where \
                          email = " + DATA.email;
      connection.query(query_email_body, function(err, email_rows, field) {
        if (err) {
          console.log("error in register: query email!");
          throw err;
        }

        if (email_rows.length > 0) {
          socket.emit("DATA", {state : false, info : "email exists"});
        }

        var date = new Date();
        var curdate = ""+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        insert_user_info_body = 'insert into User_Info \
        (username, email, password, creat_time, money) \
        values( \'' + DATA.user_name + '\', \'' + DATA.email + ' ' + DATA.password + '\',\''
    + date + '\', 0 )';

        connection.query(insert_user_info_body, function(err, result) {
              if (err) throw err;
        });
      });
    });
  });

  socket.on('upload_photo', function(DATA) {
    /*
      upload photo
      params: DATA {photo}
      returns: None
    */
    console.log(DATA);
    var fstream = fs.createWriteStream('/images/tmp.JPG');
    fstream.write(DATA.body);
    fstream.end();
  });
});


module.exports = app;
