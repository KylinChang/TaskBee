var express    = require('express');
var router     = express.Router();
var connection = require('../model/db');

router.post('/get_profile', function (req, res, next) {
  /*
    load req from reqbase
    params: req {user_name}
    returns: req {user_info, task_post, task_serve, skills}
    return type: user_info, task_post, task_serve, skills have same fields as reqbase table
  */
  console.log(req.body);

  var query_user_info_body = "select * from User_Info where username = \'" + req.body.user_name + "\'";
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

          res.json({user_info : user_info_rows[0], task_post : task_post_rows,
            task_serve : task_serve_rows, skills : skill_rows, pic_name : pic_name});
        });
      });
    });
  });
});

module.exports = router;
