var express = require('express');
var router = express.Router();
var connection = require('../model/db');

router.post('/take_task', function (req, res, next) {
    /*
     *  some user take task
     *  params: req {
     *              task_id,
     *              taker_id
     *            }
        returns: None
     * */
    //console.log("req");

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

        socket.emit("take_task_res", {state: true});
      });
    });
});

router.post('/complete_task', function (req, res, next) {
    /*
     * complete one task
     * params: req {task_id}
     * */
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
