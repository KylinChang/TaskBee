/*
  Import Libraries
*/

var bcrypt       = require('bcryptjs');
var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var router       = require('./routes/index')
var ejs          = require('ejs');
var app          = express();
var mysql        = require('mysql');
var fs           = require('fs');
var multer       = require('multer');

// User Object
var user_socket = {};
var connection  = require('./model/db');

const max_limit = '100mb'
const maxSize   = 50 * 1024 * 1024

app.use(bodyParser.urlencoded({ limit: max_limit, extended: true, parameterLimit: maxSize }));
app.use(bodyParser.json({limit: max_limit}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./routes/index');
app.use('/', routes);
app.use('/images', express.static(__dirname+'/images/'));
app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err    = new Error('Not Found');
  err.status = 404;
  next(err);
});


/*
  error handlers
  development error handler
  will print stacktrace
*/

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

/*
  production error handler
  no stacktraces leaked to user
*/

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

var io = require('socket.io')(1234);
console.log("start to listen on socket..");
io.on('connection', function(socket) {
  console.log('a user connected');

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

    var receiver_socket_id = user_socket[DATA.receive_user];
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
      var date    = new Date();
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

  /*
    login function
  */
  socket.on('login', function (DATA) {
      /*
        login function
        params: req {user_name, password}
        returns: req {state, info, message_content, email}
        return type: state(bool) indicates login state
                     info(string) indicates failure reason
                     message_content(string) contains all message haven't been received, fields corresponding to \
                                              message_queue tabel in db
                     user_info(JSON) user infos, fields corresponding to User_Info table in db
      */
      console.log(DATA);

      var query_login_body = "select * from User_Info where username = \'" + DATA.user_name + "\'";
      connection.query(query_login_body, function(err, user_info_rows, fields) {
        if (err) {
          console.log("error in login: query login error!");
          throw err;
        }

        if (user_info_rows.length <= 0) {
          socket.emit("login_res", {state : false, info : "user name not found"});
        }
        else {
          // grab the hased user password from DB
          var hash_in_DB = user_info_rows[0].password;

          bcrypt.compare(DATA.password, hash_in_DB, function(err, matched) {
            if (err) {
              console.log("error in login: bcrypt compare failed");
              throw err;
            }
            if (matched) {
              console.log("login: password matched!");
              user_socket[DATA.user_name] = socket.id;
              query_message_body = "select * from message_queue where receive_user = \'" +
                                    DATA.user_name + "\'";

              connection.query(query_message_body, function(err, message_rows, fields) {
                if (err) {
                  console.log("error in login: query message error!");
                  throw err;
                }

                delete_message_body = "delete from message_queue where receive_user = \'" +
                                    DATA.user_name + "\'";
                connection.query(delete_message_body, function(err, res) {
                  if (err) {
                    console.log("error in log: delete message error!");
                    throw err;
                  }

                  var promises = [];
                  var return_body = [];

                  var promise = function(message_rows, i, return_body) {

                    return new Promise (

                      function(resolve, reject) {

                        query_user_info_body = "select * from User_Info where username = \' " + message_rows[i].send_user + "\'";
                        connection.query(query_user_info_body, function(error, user_rows, fields) {
                          if (err) {
                            console.log("error in login: user info query error!");
                            throw err;
                          }

                          return_body.push({message_content : message_rows[i], send_user_info : user_rows[0]});
                          resolve(1);
                        });

                      }
                    )
                  }

                  for (var i = 0; i < message_rows.length; i += 1) {

                      promises.push(promise(message_rows, i, return_body));

                  }

                  Promise.all(promises).then(function(values) {

                    socket.emit("login_res", {state : true, body : return_body,
                                            user_info : user_info_rows[0]});

                  });

                });

              });
            }
            else {
              console.log("login: matched failed");
              socket.emit("login_res", {state : false, info : "wrong password"});
            }
          });
        }
      });
  });
});

module.exports = app;
