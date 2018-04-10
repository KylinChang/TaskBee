/*
  Import Libraries
*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = require('./routes/index')
var ejs = require('ejs');
var users = require('./routes/users');
var app = express();
var mysql = require('mysql');
var fs = require('fs');
var multer = require('multer');

// User Object
var user_socket = {};
var connection = require('./model/db');

const max_limit = '100mb'
const maxSize = 50 * 1024 * 1024

app.use(bodyParser.urlencoded({ limit: max_limit, extended: true, parameterLimit: maxSize }));
app.use(bodyParser.json({limit: max_limit}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/', routes);
app.use('/users', users);
app.use('/images', express.static(__dirname+'/images/'));
app.use(router);

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


/*

open socket I/O


*/

  

  socket.on('send_message', function (DATA) {
    /*
     *  forward message from one user to another
     *  params: DATA {
                      send_user
                      receive_user
                      message_content
                    }
     *  returns: None
     *  message sent to receiver: {
                          message_content (string)
                          user_info (JSON, has all field of User_Info table in db)
                          time (timestamp)
                        }
     * */
    // console.log(DATA);

    var receiver_socket_id = user_socket[DATA.receive_user];
    //console.log(user_socket);
    //console.log(receiver_socket_id);
    //console.log(io.sockets.sockets[receiver_socket_id]);

    //console.log(Object.keys(io.sockets.sockets));
    if (io.sockets.sockets[receiver_socket_id] == undefined) {
      console.log("receive user offline!");
      user_socket[DATA.receive_user] = undefined;
    }

    if (user_socket[DATA.receive_user] == undefined) {
      console.log("can't find receive user!");
      insert_message_body = "insert into message_queue \
        (send_user, receive_user, content) \
        VALUES( \'" + DATA.send_user + "\', \'" + DATA.receive_user + "\', \'" + DATA.message_content + "\' )";

      connection.query(insert_message_body, function(err, result) {
        if (err) {
          console.log('error in send message: insert message error!');
          throw err;
        }

      });
    } else {
      console.log("message sent!");
      var date = new Date();
      var curdate = ""+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

      var query_user_info_body = "select * from User_Info \
            where User_Info.username = \'" + DATA.send_user + "\'";

      connection.query(query_user_info_body, function(err, user_info_rows, fields) {
        if (err) {
          console.log("error in send message: query sender info error!");
          throw err;
        }

        io.to(receiver_socket_id).emit("push_message", {message_content: DATA.message_content, user_info: user_info_rows[0], time: curdate});
      });
    }
  });

    

    socket.on("add_friend", function(DATA) {
      /*
        add one friend to friend list
        params: DATA {
                      user_name
                      friend_name
                     }
        returns: None
      */
      console.log(DATA);

      var insert_friend_body = "insert into Friend_List \
                  (user_name, friend_name) \
                  VALUES (\'" + DATA.user_name + "\', \'" + DATA.friend_name + "\')";
      connection.query(insert_friend_body, function(err, result) {
        if (err) {
          console.log("error in add friend: insert friend1 error!");
          throw err;
        }

        var insert_friend_body = "insert into Friend_List \
                    (user_name, friend_name) \
                    VALUES (\'" + DATA.user_name + "\', \'" + DATA.friend_name + "\')";
        connection.query(insert_friend_body, function(err, result) {
          if (err) {
            console.log("error in add friend: insert friend2 error!");
            throw err;
          }
        });
      });
    });

    socket.on("get_friends", function(DATA) {
      /*
        return all friends of a user;
        params: DATA {user_name}
        returns: friend_names []
      */
      console.log(DATA);

      query_friend_body = "select friend_name from Friend_List \
              where user_name = \'" + DATA.user_name + "\'";
      connection.query(query_friend_body, function(err, friend_rows, fields) {
        if (err) {
          console.log("error in get friend: query friend name error!");
          throw err;
        }

        socket.emit("get_friends_res", {friend_names: friend_rows});
      });
    });

  });

module.exports = app;
