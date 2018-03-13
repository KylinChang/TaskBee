var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'TaskBee'
});

connection.connect();
console.log("ada");

module.exports = connection;
