var express    = require('express');
var router     = express.Router();
var connection = require('../model/db');
var multer     = require('multer');
var fs         = require('fs');

const maxSize  = 50 * 1024 * 1024
var upload     = multer({limits: { fileSize: maxSize}});

router.post('/take_task', function (req, res, next) {
    /*
     *  some user take task
     *  params: req {
     *              task_id,
     *              taker_id
     *            }
        returns: None
     */

    update_task_body = "update Task_info set is_taken = 1 \
            where task_id = \'" + req.body.task_id + "\'";

    connection.query(update_task_body, function(err, result) {
      if (err) {
        console.log("error in take task: update task info error!");
        throw err;
      }

      insert_task_serve_body = "insert into User_Task_Serve \
                      (task_id, taker_id) \
                      VALUES ( " + req.body.task_id + ", " + req.body.taker_id + ")";

      connection.query(insert_task_serve_body, function(err, result) {
        if (err) {
          console.log("error in take task: insert task server error!");
          throw err;
        }

        res.json({state: true});
      });
    });
});

router.post('/complete_task', function (req, res, next) {
    /*
     * complete one task
     * params: req {task_id}
     */
    console.log(req.body);

    var date = new Date();
    var curdate = ""+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    update_task_body = "update Task_Info set is_completed = 1, completed_time = \'" + curdate + " \
            where task_id = " + req.body.task_id;

    connection.query(update_task_body, function(err, result) {
      if (err) {
        console.log("error in complete task: update task state error!");
        throw err;
      }

      // do nothing
    });
});

router.post('/post_task', upload.array('photo', 3), function(req, res, next) {
  /*
    user post a task
    params: DATA {
                  user_name
                  descritpion
                  price
                  start_date(YYYY-MM-DD)
                  end_date(YYYY-MM-DD)
                  tag(array)
                  imgs(send by files)}
    returns: state (bool) indicate whether post succeed
             task_info (json) all task information

  */
  console.log("enter post task!");

  insert_task_body = "insert into Task_Info \
      (poster_name, description, price, start_date, end_date) \
      VALUES ( \'" + req.body.user_name + "\', \'" + req.body.description + "\', " + req.body.price + ", \'" +
      req.body.start_date + "\', \'" + req.body.end_date + "\'" + " )";

  connection.query(insert_task_body, function(err, result) {
    if (err) {
      console.log("error in post_task: insert task error!");
      throw err;
    }

    console.log(req);
    var promises = [];

    var promise = function(i) {

      return new Promise (

        function(resolve, reject) {

          var pic_name = './images/' + result.insertId.toString() + '_'  + i.toString() + '.JPG';
          var fstream = fs.createWriteStream(pic_name);
          var update_img_url_body = "update Task_Info set \
                      img_url" + i.toString() + " = \'" + pic_name.substr(1) + "\' \
                      where task_id = \'" + result.insertId + "\'";

          fstream.write(req.files[i].buffer, function () {

            console.log(update_img_url_body);

            connection.query(update_img_url_body, function(err, result) {
              if (err) {
                console.log("error in post task, insert image url error!");
                throw err;
              }

              resolve(1);
              // do nothing
            });
          });
          fstream.end();
        }
      )
    }

    for (var i = 0; i < req.files.length; i += 1) {

      if (req.files[i] != undefined) {

        promises.push(promise(i));

      }
    }

    Promise.all(promises).then(function(values) {

      var query_task_body = "select * from Task_Info \
            where task_id = " + result.insertId.toString();

      connection.query(query_task_body, function(err, task_rows, fields) {
        if (err) {
          console.log("error in post task: query task info error!");
          throw err;
        }

        res.json({state: true, task_info: task_rows[0]});
      });

    });

    for (var i = 0; i < req.body.tag.length; i += 1) {

      insert_task_tag_body = "insert into Task_Tag \
                    (task_id, tag)                 \
                    VALUES (" + result.insertId + ", \'" + req.body.tag[i] + "\')";
      console.log(insert_task_tag_body);

      connection.query(insert_task_tag_body, function(err, result) {
        if (err) {
          console.log("error in post task: insert tag error!");
          throw err;
        }

        // do nothing
      });

    }

  });
});

router.post("/get_self_task", upload.single(), function(req, res, next) {
  /*
   *  get all self related tasks
   *  params: DATA {user_name}
   *  returns: tasks {
   *              self_post_task (array)
   *              underway_task (array, include post and take)
   *              self_take_task (array)
   *            }
   *            ## note: every task in array has all fields of Task_Info and User_Info in db
   */
  var DATA = req.body;
  console.log(DATA);

  var query_post_task_body = "select * from Task_Info, User_Info \
        where Task_Info.poster_name = User_Info.username and \
        poster_name = \'" + DATA.user_name + "\'";

  connection.query(query_post_task_body, function(err, post_task_rows, fields) {
    if (err) {
      console.log("error in get self task: get post task error!");
      throw err;
    }

    var date = new Date();
    var curdate = ""+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    query_underway_task = "select * from (Task_Info inner join User_Info on Task_Info.poster_name = User_Info.username) \
            left join User_Task_Serve using (task_id) \
            where Task_Info.is_completed = 0 and \
            Task_Info.start_date <= \'" + curdate + "\' and \
            Task_Info.end_date >= \'" + curdate + "\' and \
            (Task_Info.poster_name = \'" + DATA.user_name + "\' or User_Task_Serve.taker_name = \'" + DATA.user_name + "\')"
    console.log(query_underway_task);

    connection.query(query_underway_task, function(err, underway_rows, fields) {
      if (err) {
        console.log("error in get self task: get underway task error!");
        throw err;
      }

      query_take_task_body = "select * from Task_Info, User_Task_Serve, User_Info \
            where Task_Info.task_id = User_Task_Serve.task_id and \
            User_Info.username = Task_Info.poster_name and \
            User_Task_Serve.taker_name = \'" + DATA.user_name + "\'";

      connection.query(query_take_task_body, function(err, take_task_rows, fields) {
        if (err) {
          console.log("error in get self task: get take task error!");
          throw err;
        }

        res.json({self_post_task: post_task_rows, underway_task: underway_rows, self_take_task: take_task_rows});
      });
    });
  });
});

router.post("/get_task_list", upload.single(), function(req, res, next) {
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

  var date    = new Date();
  var curdate = ""+date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

  var query_task_body = "select * from Task_Info \
    where is_completed = " + 0 + " and end_date >= \'" + curdate + "\'";

  connection.query(query_task_body, function(err, task_rows, fields) {
    if (err) {
      console.log("error in get task list: query task info error!");
      throw err;
    }

    var promises  = []
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
      res.json({forumList: task_list});
    });
  });
});

module.exports = router;
