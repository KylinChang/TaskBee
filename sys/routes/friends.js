var express    = require('express');
var router     = express.Router();
var connection = require('../model/db');

router.post('/add_friend', function (req, res, next) {
  /*
    add one friend to friend list
    params: req.body {
                  user_name
                  friend_name
                 }
    returns: None
  */
  console.log(req.body);

  var insert_friend_body = "insert into Friend_List \
              (user_name, friend_name) \
              VALUES (\'" + req.body.user_name + "\', \'" + req.body.friend_name + "\')";
  connection.query(insert_friend_body, function(err, result) {
    if (err) {
      console.log("error in add friend: insert friend1 error!");
      throw err;
    }

    var insert_friend_body = "insert into Friend_List \
                (user_name, friend_name) \
                VALUES (\'" + req.body.user_name + "\', \'" + req.body.friend_name + "\')";
    connection.query(insert_friend_body, function(err, result) {
      if (err) {
        console.log("error in add friend: insert friend2 error!");
        throw err;
      }
    });
  });
});


router.post('/get_friends', function (req, res, next) {
  /*
    return all friends of a user;
    params: req.body {user_name}
    returns: friend_names []
  */
  console.log(req.body);

  query_friend_body = "select friend_name from Friend_List \
          where user_name = \'" + req.body.user_name + "\'";
  connection.query(query_friend_body, function(err, friend_rows, fields) {
    if (err) {
      console.log("error in get friend: query friend name error!");
      throw err;
    }

    socket.emit("get_friends_res", {friend_names: friend_rows});
  });
});

module.exports = router;
