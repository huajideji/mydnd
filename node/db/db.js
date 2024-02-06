const dbconfig = require('./dbconfig.js');
var mysql = require("mysql");
var con = mysql.createConnection(dbconfig)
var pool = mysql.createPool(dbconfig)
con.connect(function (err, connection) {
	if(!err){
        console.log("数据库连接成功")
       
	}else{
		console.error("数据库连接失败",err);
	}
})
module.exports = {con,pool}