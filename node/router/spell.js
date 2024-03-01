const express = require('express');
const router = express.Router();
const { con } = require('../db/db');
const { pool } = require('../db/db');
module.exports = router
//查询法术列表
router.get('/getspellList', async (req, res) => {
    if (req.query.name) {
        con.query(`select * from spell_list where name like'%${req.query.name}%'`, (err, result) => { 
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
        return
    }
    if (req.query.spell_id) {
        con.query(`select * from spell_list where id=${req.query.spell_id}`, (err, result) => { 
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
        return
    }
    if (req.query.occu_id) {
        con.query(`select * from spell_list where occupation like '%${req.query.occu_id}%' and ring=${req.query.ring}`, (err, result) => { 
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
        return
    }
  
})