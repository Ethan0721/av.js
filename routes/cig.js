const express = require('express');
const _ = require('lodash');
const mongoClient = require('../db');
const constant = require('./../constant');
const router = express.Router();
const util = require('./../utils/util');

router.get('/users', async function (req, res, next){
    console.info("get user method");

    // const queryUser = {
    //     wechatId: 'dwc123'
    // }
    // const value = util.getDocument('users',queryUser);
    // console.log(value);
   let query = {}; 
    try {
        await mongoClient.getCollection('users')
        .find(query,{projection:{ _id: 0 }})
        .toArray(function(err, docs){
            res.json( {...constant.SUCCESS, data: docs} );
        }); 
    } catch(err) {
        res.json(constant.ERROR);
        console.log(err);
        return;
    }
});
router.get('/users/:wechatId', async function (req, res, next){
    console.info("get user id method");
    const userId = req.params.wechatId;
    const query = {
        wechatId : userId
    }
    try {
        const template = await mongoClient.getCollection('users')
        .findOne( query, { projection:{ _id: 0 }} )
        res.json( { ...constant.SUCCESS, data : template});
    } catch(err) {
        print(err);
        res.send(constant.ERROR);
        return next();
    }
})


router.post('/users/add', function (req, res, next){
    console.info("insert user ");
    const body = req.body;
    const query = {
        wechatId: body.wechatId
    }
    mongoClient.getCollection('users').findOne(query).then(function(doc){
        console.log("doc is ", doc);
        if(doc){
            res.json({...constant.ERROR, responseInfo: "User already exist"});
            return;
        }else{
            if(!body.createdDate){
                const createdDate = new Date().getTime();
                // console.log(createdDate)
                body.createdDate = createdDate;
            }
            mongoClient.getCollection('users').insertOne(body).then(function(err){
                res.json({...constant.SUCCESS, responseInfo : "User added successfully"});
            })   
        }
    })
})

router.post('/users/order', async function (req, res, next){
    console.info("insert user order");
    const wechatId = req.body.wechatId;
    const order = req.body.order;
    const todayDate = new Date().getTime();
    if(!order.hasOwnProperty('orderDate')){
        order.orderDate = todayDate;
    }
    try{
        mongoClient.getCollection('users').updateOne(
            { wechatId: wechatId },
            { $push: { orderHistory: order } }
        ).then(function(){
            res.json({...constant.SUCCESS, responseInfo : "User order added successfully"});
        })
    }catch(e){
        print(e);
    }
})





module.exports = router;