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
var user_socket = {};
var connection = require('./model/db');

const max_limit = '100mb'
const  maxSize = 50 * 1024 * 1024

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

      var query_task_post_body = "select * from Task_Info where poster_name = " + user_info_rows[0].user_name;
      connection.query(query_task_post_body, function(err, task_post_rows, fields) {
        if (err) {
          console.log("error in get_profile: get user post task!");
          throw err;
        }

        var query_task_serve_body = "select * from User_Task_Serve, Task_Info \
            where User_Task_Serve.task_id = Task_Info.task_id and User_Task_Serve.taker_name = " + user_info_rows[0].user_name;
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
      returns: DATA {state, info, message_content, email}
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
      } else if (user_info_rows[0].password != DATA.password) {
        socket.emit("login_res", {state : false, info : "wrong password"});
      } else {
        user_socket[DATA.user_name] = socket.id;
        query_message_body = "select * from message_queue where receive_user = \'" +
                              DATA.user_name + "\'";

        connection.query(query_message_body, function(err, message_rows, fields) {
          if (err) {
            console.log("error in login: query message error!");
            throw err;
          }

          socket.emit("login_res", {state : true, message_content : message_rows,
                                  user_info : user_info_rows[0]});
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
              console.log("register succeed!");

              socket.emit("register_res", {state : true});
        });
      });
    });
  });

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

    socket.on("take_task", function(DATA) {
      /*
       *  some user take task
       *  params: DATA {
       *              task_id,
       *              taker_id
       *            }
          returns: None
       * */
      //console.log("DATA");

      update_task_body = "update Task_info set is_taken = 1 \
              where task_id = \'" + DATA.task_id + "\'";

      connection.query(update_task_body, function(err, result) {
        if (err) {
          console.log("error in take task: update task info error!");
          throw err;
        }

        insert_task_serve_body = "insert into User_Task_Serve \
                        (task_id, taker_id) \
                        VALUES ( " + DATA.task_id + ", " + DATA.taker_id + ")";

        connection.query(insert_task_serve_body, function(err, result) {
          if (err) {
            console.log("error in take task: insert task server error!");
            throw err;
          }

          socket.emit("take_task_res", {state: true});
        });
      });
    });

    socket.on("complete_task", function(DATA) {
      /*
       * complete one task
       * params: DATA {task_id}
       * */
      console.log(DATA);

      var date = new Date();
      var curdate = ""+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
      update_task_body = "update Task_Info set is_completed = 1, completed_time = \'" + curdate + " \
              where task_id = " + DATA.task_id;

      connection.query(update_task_body, function(err, result) {
        if (err) {
          console.log("error in complete task: update task state error!");
          throw err;
        }

        // do nothing
      });
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
