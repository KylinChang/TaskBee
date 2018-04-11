var express    = require('express');
var router     = express.Router();
var connection = require('../model/db');
var bcrypt     = require('bcrypt');

router.post('/login', function (req, res, next) {
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
    console.log(req.body);

    var query_login_body = "select * from User_Info where username = \'" + req.body.user_name + "\'";
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

        bcrypt.compare(req.body.password, hash_in_DB, function(err, matched) {
          if (err) {
            console.log("error in login: bcrypt compare failed");
            throw err;
          }
          if (matched) {
            console.log("login: password matched!");
            user_socket[req.body.user_name] = socket.id;
            query_message_body = "select * from message_queue where receive_user = \'" +
                                  req.body.user_name + "\'";

            connection.query(query_message_body, function(err, message_rows, fields) {
              if (err) {
                console.log("error in login: query message error!");
                throw err;
              }

              socket.emit("login_res", {state : true, message_content : message_rows,
                          user_info : user_info_rows[0]});
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

module.exports = router;
