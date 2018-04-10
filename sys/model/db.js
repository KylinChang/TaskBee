var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '13.58.57.31',
  user     : 'peihan',
  password : '12345678',
  database : 'TaskBee'
});

connection.connect();
console.log("ada");

module.exports = connection;
