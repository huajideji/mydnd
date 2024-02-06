const express = require('express');
const router = express.Router();
const { con } = require('../db/db');
const {pool} = require('../db/db');
router.get('/allRole', async (req, res) => {
    con.query('select * from role_list', (err, result) => {
        if (err) {
            res.json({
                code: 500,
                msg: '读取数据库失败',
                data:err.message
            })
        } else {
            res.json({
                code: 200,
                msg: 'sucess',
                data:result
            })
        }
     })
})
router.post('/addRole', async (req, res) => {
    function toLiteral(str) {
        var dict = { '\b': 'b', '\t': 't', '\n': 'n', '\v': 'v', '\f': 'f', '\r': 'r' };
        return str.replace(/([\\'"\b\t\n\v\f\r])/g, function($0, $1) {
            return '\\' + (dict[$1] || $1);
        });
    }
    var sql = `insert into role_list (role_name,main_atrribute,skill) values('${toLiteral(req.query.role_name)}','${toLiteral(req.query.main_atrribute)}','${toLiteral(req.query.skill)}')`
    console.log(sql)
    con.query(sql,(err, result) => {
        if (err) {
          res.json({
                code: 500,
                msg: '读取数据库失败',
                data:err.message
            })  
        } else {
            res.json({
                code: 200,
                msg: 'sucess',
                data:'添加成功'
            })
        }
    })
})

// pool.getConnection((err, connection) => {
//     let jsondata2 = '{"name":"花鸡3"}'
//     var sql = `insert into test_list (jsondata) values('${jsondata2}')`
//     connection.query(sql,(err, result) => {
//     if (err) {
//       console.log(err.message)
//     } else {
//        console.log(result)
//     }
// })
// })

module.exports = router