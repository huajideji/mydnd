const express = require('express');
const router = express.Router();
const { con } = require('../db/db');
const { pool } = require('../db/db');

const addweapon =  function (params) {
    return new Promise((resolve, reject) => {
        var sql = `insert into weapon_list (name,dmg,valueAdded,description,cateId,type,price,quality)
        values('${params.name}','${params.dmg}','${params.valueAdded}','${params.description}','${params.cateId}',${params.type},${params.price},${params.quality})`
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
    })
  
}
const addarmor = function (params) {
    console.log(params)
    return new Promise((resolve, reject) => {
        var sql = `insert into armor_list (name,max_agility,valueAdded,description,cateId,ac,price,quality)
        values('${params.name}','${params.max_agility}','${params.valueAdded}','${params.description}','${params.cateId}',${params.ac},${params.price},${params.quality})`
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
    })
  
}
const addliquid =  function (params) {
    return new Promise((resolve, reject) => {
        var sql = `insert into liquid_list (name,valueAdded,description,cateId,price,quality)
        values('${params.name}','${params.valueAdded}','${params.description}','${params.cateId}',${params.price},${params.quality})`
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
    })
  
}
const addscroll =  function (params) {
    return new Promise((resolve, reject) => {
        var sql = `insert into scroll_list (name,valueAdded,description,cateId,price,quality)
        values('${params.name}','${params.valueAdded}','${params.description}','${params.cateId}',${params.price},${params.quality})`
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
    })
  
}
const addsundries =  function (params) {
    return new Promise((resolve, reject) => {
        var sql = `insert into sundries_list (name,valueAdded,description,cateId,price,quality)
        values('${params.name}','${params.valueAdded}','${params.description}','${params.cateId}',${params.price},${params.quality})`
            con.query(sql, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
    })
  
}
router.get('/searchItem', async (req, res) => {
    let paramsData = {
        name: req.query.name?req.query.name:'',
        id: req.query.id ? req.query.dmg : '',
        cateId :req.query.cateId?req.query.cateId:''
    }
    let str
    switch (parseInt(paramsData.cateId)) {
        case 1: {
            str = 'weapon_list'
        }; break
        case 2: {
            str = 'armor_list'
        }; break
        case 3: {
            str = 'liquid_list'
        }; break
        case 4: {
            str = 'scroll_list'
        }; break
        case 5: {
            str = 'sundries_list'
        }; break
    }
    let sql = `select * from ${str} where cateId=${req.query.cateId} ${req.query.name ? `and name like '%${req.query.name}%'` : ''}${req.query.id ? ' and id=' + req.query.id : ''}`
    console.log(sql)
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
                data:result
            })
        }
     })
})
//添加物品
router.post('/addItem', async (req, res) => {
    if (!req.query.name) {
        res.json({
            code: 200,
            msg: '名称不能为空',
        })  
    }
    if (!req.query.cateId) {
        res.json({
            code: 200,
            msg: '类型不能为空',
        })  
    }
    let paramsData = {
        name: req.query.name,
        dmg: req.query.dmg ? req.query.dmg : '',
        valueAdded: req.query.valueAdded ? req.query.valueAdded:0,
        description: req.query.description ? req.query.description : '',
        cateId: req.query.cateId,
        type: req.query.type ? req.query.type : '',
        price: req.query.price ? req.query.price : 0,
        quality: req.query.quality ? req.query.quality : '',
        max_agility: req.query.max_agility ? req.query.max_agility : 0,
        ac: req.query.ac ? req.query.ac : 0,
    }
    let echo
    console.log(paramsData.cateId)
    switch (parseInt(paramsData.cateId)) {
        case 1: {
            echo = await addweapon(paramsData)
        }; break
        case 2: {
            echo = await addarmor(paramsData)
        }; break
        case 3: {
            echo = await addliquid(paramsData)
        }; break
        case 4: {
            echo = await addscroll(paramsData)
        }; break
        case 5: {
            echo = await addsundries(paramsData)
        }; break
    }
    if (echo==true) {
        res.json({
            code: 200,
            msg: '添加成功',
        })  
    } else {
        res.json({
            code: 500,
            msg: echo,
        })  
    }
})

//查询物品种类
router.get('/getItemCateList', async (req, res) => {
    con.query('select * from item_catelist', (err, result) => {
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
//查询物品列表
router.get('/getItemList', async (req, res) => {
    let senddata
    if (!req.query.type) {
        res.json({
            code: 200,
            msg: '物品类型不能为空',
        })
    }
    switch (parseInt(req.query.type)) {
        case 1: {
            con.query('select * from weapon_list', (err, result) => { 
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
        }; break
        case 2: {
            con.query('select * from armor_list', (err, result) => { 
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
        }; break
        case 3: {
            con.query('select * from liquid_list', (err, result) => { 
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
        }; break
        case 4: {
            con.query('select * from scroll_list', (err, result) => { 
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
        }; break
        case 5: {
            con.query('select * from sundries_list', (err, result) => { 
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
        };break
    }
})
module.exports = router