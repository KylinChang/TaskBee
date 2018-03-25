var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var ejs = require('ejs');

var users = require('./routes/users');

var app = express();

//var connection = require('./model/db');
var mysql = require('mysql');

var fs = require('fs');

var multer = require('multer');

var user_socket = {};

maxSize = 50 * 1024 * 1024
// var storage = multer.diskStorage({
//   destination: './images/',
//   filename: function (req, file, cb) {
//     crypto.pseudoRandomBytes(16, function (err, raw) {
//       if (err) return cb(err)
//
//       cb(null, raw.toString('hex') + path.extname(file.originalname))
//     });
//   }
// });

var upload = multer({limits: { fileSize: maxSize}});

app.use(bodyParser.urlencoded({ limit: '100mb', extended: true, parameterLimit: maxSize }));
app.use(bodyParser.json({limit: '100mb'}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
//app.use(upload.array());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/', routes);
app.use('/users', users);
//app.use(express.static(path.join(__dirname, 'images')));
app.use('/images', express.static(__dirname+'/images/'))

app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/uploadphoto', upload.single('photo'), function(req, res, next) {
  console.log('photo upload!');

  query_user_info_body = "select * from User_Info where username = \'" + req.body.username + "\'";
  connection.query(query_user_info_body, function(err, user_rows, fields) {
    if (err) {
      console.log('error in photo upload: query user name!');
      throw err;
    }

    var pic_name = './images/' + user_rows[0].user_id.toString() + '.JPG';
    var fstream = fs.createWriteStream(pic_name);
    fstream.write(req.file.buffer, function () {
      res.json({url : pic_name.substr(1)});
    });
    fstream.end();
  });
});


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
    console.log(err.stack);
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
    error: err
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

    var query_user_info_body = "select * from User_Info where username = \'" + DATA.user_name + "\'";
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

            var pic_name = './images/' + user_rows[0].user_id.toString() + '.JPG';
            if (!fs.existsSync(pic_name)) {
              pic_name = undefined;
            }

            socket.emit('get_profile_res', {user_info : user_info_rows[0], task_post : task_post_rows,
              task_serve : task_serve_rows, skills : skill_rows, pic_name : pic_name});
          });
        });
      });
    });
  });

  socket.on('login', function (DATA) {
    /*
      login function
      params: DATA {user_name, password}
      returns: DATA {state, info, message_content}
      return type: state(bool) indicates login state
                   info(string) indicates failure reason
                   message_content(string) contains all message haven't been received, fields corresponding to \
                                            message_queue tabel in db
    */
    console.log(DATA);



    var query_login_body = "select * from User_Info where username = \'" + DATA.user_name + "\'";
    connection.query(query_login_body, function(err, rows, fields) {
      if (err) throw err;
      console.log("error in login: query login error!");

      if (rows.length <= 0) {
        socket.emit("login_res", {state : false, info : "user name not found"});
      } else if (rows[0].password != DATA.password) {
        socket.emit("login_res", {state : false, info : "wrong password"});
      } else {
        user_socket[DATA.user_name] = socket.id;
        query_message_body = "select * from message_queue where receive_user = " +
                              DATA.user_name;

        connection.query(query_message_body, function(err, message_rows, fields) {
          if (err) {
            console.log("error in login: query message error!");
            throw err;
          }

          socket.emit("login_res", {state : true, message_content : message_rows});
        });
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
                          username = \'" + DATA.user_name + "\'";
    connection.query(query_user_name_body, function(err, user_name_rows, field) {
      if (err) {
        console.log("error in register: query username!");
        throw err;
      }

      if (user_name_rows.length > 0) {
        socket.emit("register_res", {state : false, info : "user name exists"});
      }

      var query_email_body = "select * from User_Info where \
                          email = \'" + DATA.email + "\'";
      connection.query(query_email_body, function(err, email_rows, field) {
        if (err) {
          console.log("error in register: query email!");
          throw err;
        }

        if (email_rows.length > 0) {
          socket.emit("register_res", {state : false, info : "email exists"});
        }

        var date = new Date();
        var curdate = ""+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        insert_user_info_body = 'insert into User_Info \
        (username, email, password, create_time, money) \
        values( \'' + DATA.user_name + '\', \'' + DATA.email + '\', \'' + DATA.password + '\',\''
    + curdate + '\', 0 )';

        connection.query(insert_user_info_body, function(err, result) {
              if (err) throw err;

              socket.emit("register_res", {state : true});
        });
      });
    });
  });

  socket.on('send_message', function (DATA) {
    /*
     *  forward message from one user to another
     *  params: DATA {send_user, receive_user, content}
     *  returns: None
     * */
    console.log(DATA);

    var receiver_socket_id = user_socket[DATA.receive_user];

    if (io.sockets.socket[receiver_socket_id] == undefined) {
      user_socket[DATA.receive_user] = undefined;
    }

    if (user_socket[DATA.receive_user] == undefined) {
      insert_message_body = "insert into message_queue \
        (send_user, receive_user, content) \
        VALUES( \'" + DATA.send_user + "\', \'" + DATA.receive_user + "\'" + DATA.content + "\' )";

      connection.query(insert_message_body, function(err, result) {
        if (err) {
          console.log('error in send message: insert message error!');
          throw err;
        }
      });
    } else {
      var date = new Date();
      var curdate = ""+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      io.sockets.socket(receiver_socket_id).emit("push_message", {content: DATA.content, send_user: DATA.send_user, time: curdate});
    }
});

  //socket.on('send_message', function ());

  // socket.on('upload_photo', function(DATA) {
  //   /*
  //     upload photo
  //     params: DATA {photo}
  //     returns: None
  //   */
  //   console.log(DATA);
  //   var fstream = fs.createWriteStream('/images/tmp.JPG');
  //   fstream.write(DATA.body);
  //   fstream.end();
  // });
});

module.exports = app;
