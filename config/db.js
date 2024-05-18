var mysql = require('mysql'); 

var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'pnoy_dishcovery',
});


connection.connect(function (error) {
if (!!error) {
console.log(error);
} else {
console.log('Pnoy Dishcovery MySQL Database Connected..!');
}
});

module.exports = connection;