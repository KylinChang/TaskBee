var express    = require('express');
var router     = express.Router();
var multer     = require('multer');
var connection = require('../model/db');
var fs         = require('fs');

const maxSize    = 50 * 1024 * 1024
var upload     = multer({limits: { fileSize: maxSize}});

router.post('/uploadphoto', upload.single('photo'), function(req, res, next) {
  console.log('photo upload!');

  query_user_info_body = "select * from User_Info where username = \'" + req.body.username + "\'";
  connection.query(query_user_info_body, function(err, user_rows, fields) {
    if (err) {
      console.log('error in photo upload: query user name!');
      throw err;
    }

    var pic_name = './images/' + user_rows[0].user_id.toString() + '.JPG';
    var fstream = fs.createWriteStream(pic_name);
    fstream.write(req.file.buffer, function () {

      var update_img_url_body = "update User_Info set img_url = \'" + pic_name.substr(1) + "\' " +
                "where username = \'" + req.body.username + "\'";
      connection.query(update_img_url_body, function(err, result) {
        if (err) {
          console.log("error in upload photo: insert image url error!");
          throw err;
        }

        res.json({url : pic_name.substr(1)});
      });
    });
    fstream.end();
  });
});

module.exports = router;
