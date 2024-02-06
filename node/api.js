//导入express框架
var express = require("express");
var app = express();
//解决跨域问题
const cors = require('cors');
// 中间件 获取参数的
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
var roleRouter = require('./router/role')
app.use('/role', roleRouter)
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("服务器启动成功了地址是", port);
})