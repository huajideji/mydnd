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
    let searchData = {
        role_name: req.query.role_name,
        strength: req.query.strength ? req.query.strength : '',
        agility: req.query.agility ? req.query.agility : '',
        intelligence: req.query.intelligence ? req.query.intelligence : '',
        perception: req.query.perception ? req.query.perception : '',
        constitution: req.query.agility ? req.query.constitution : '',
        charm: req.query.agility ? req.query.charm : '',
        level:req.query.level?req.query.level:''
    }
    let flag = false
    if (!searchData.role_name) {
        res.json({
            code: 200,
            msg: '角色名不能为空',
        })  
    } else {
        flag = true
    }
    if (flag) {
        var sql = `insert into role_list (role_name,strength,agility,intelligence,perception,constitution,charm,level) 
        values('${searchData.role_name}',${parseInt(searchData.strength)},${searchData.agility},${searchData.intelligence},${searchData.perception},${searchData.constitution},${searchData.charm},${searchData.level})`
        con.query(sql, (err, result) => {
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
    }
   
})

module.exports = router