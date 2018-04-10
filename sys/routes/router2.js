var express = require('express');
var router = express.Router();
var connection = require('../model/db');

router.post("/get_task_list", function(req, res, next) {
  /*
   *  get all active task
   *  params: None
   *  returns: Tasks [
                     task_info (Json object, have all fields of Task_Info table in db \
                           note: img_url can be NULL)
                     tags ([], array of tags)
                     poster_info (Json object, have all fields of tabel User_Info in db)
                     ]
   * */
  console.log("in get task list!");

  var date = new Date();
  var curdate = ""+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var query_task_body = "select * from Task_Info \
    where is_completed = " + 0 + " and end_date >= \'" + curdate + "\'";
  //console.log(query_task_body);

  connection.query(query_task_body, function(err, task_rows, fields) {
    if (err) {
      console.log("error in get task list: query task info error!");
      throw err;
    }

    var promises = []
    var task_list = []

    var promise = function(query_tag_body, query_user_info_body, task_row) {

      return new Promise(function(resolve, reject) {

        connection.query(query_tag_body, function(err, tag_rows, fields) {
          if (err) {
            console.log("error in get task list: query tag error!");
            throw err;
          }

          console.log(query_user_info_body);

          connection.query(query_user_info_body, function(err, user_rows, fields) {
            if (err) {
              console.log("error in get task list: query poster info error!");
              throw err;
            }

            var tag_res = [];
            for (var j = 0; j < tag_rows.length; j += 1) {
              tag_res.push(tag_rows[j].tag);
            }

            task_list.push({task_info: task_row, tags: tag_res, poster_info: user_rows[0]});

            resolve(1);
          });
        });
      });
    }

    for (var i = 0; i < task_rows.length; i += 1) {
      var query_tag_body = "select tag from Task_Tag \
              where task_id = \'" + task_rows[i].task_id + "\'";
      var query_user_info_body = "select * from User_Info \
              where username = \'" + task_rows[i].poster_name + "\'";
      var task_row = task_rows[i];

      promises.push(promise(query_tag_body, query_user_info_body, task_row));
    }

    Promise.all(promises).then(function(values) {
      //console.log(task_list);
      res.json({forumList: task_list});
    });
  });
});

module.exports = router;
