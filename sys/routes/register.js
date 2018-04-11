var express = require('express');
var router = express.Router();
var connection = require('../model/db');

router.post('/register', function (req, res, next) {
  /*
    register function
    params: req {email, user_name, password}
    returns: req {state, info}
    return type: state(bool) indicate register state
                 info(string) indicate failure reason
  */
  console.log(req.body);

  var query_user_name_body = "select * from User_Info where \
                        username = \'" + req.body.user_name + "\'";
  connection.query(query_user_name_body, function(err, user_name_rows, field) {
    if (err) {
      console.log("error in register: query username!");
      throw err;
    }

    if (user_name_rows.length > 0) {
      socket.emit("register_res", {state : false, info : "user name exists"});
    }

    var query_email_body = "select * from User_Info where \
                        email = \'" + req.email + "\'";

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
      values( \'' + req.user_name + '\', \'' + req.email + '\', \'' + req.password + '\',\''
  + curdate + '\', 0 )';

      connection.query(insert_user_info_body, function(err, result) {
            if (err) throw err;
            console.log("register succeed!");

            socket.emit("register_res", {state : true});
      });
    });
  });
});

module.exports = router;
