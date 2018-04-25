var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'TaskBee'
});

connection.connect();
console.log("ada");

module.exports = connection;
