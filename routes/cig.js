const express = require('express');
const _ = require('lodash');
const mongoClient = require('../db');
const constant = require('./../constant');
const router = express.Router();
const util = require('./../utils/util');

router.get('/users', async function (req, res, next){
    console.info("get user method");
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
    console.info("GET user id method");
    const userId = req.params.wechatId;
    const query = {
        wechatId : userId
    }
    try {
        const template = await mongoClient.getCollection('users')
        .findOne( query, { projection:{ _id: 0 }} )
        res.json( { ...constant.SUCCESS, data : template});
    } catch(err) {
        console.error(err);
        res.send(constant.ERROR);
        return next();
    }
})
router.put('/users/update/:wechatId', async function (req, res, next){
    console.info("UPDATE user method");
    //const userId = req.params.wechatId;
    const userId = req.body.wechatId;
    // let data = req.body.data;
    // let userObject = {
    //     "name":data.name,
    //     "address": data.address,
    //     "createdDate":data.createdDate,
    //     "university":data.university,
    //     "friends": data.friends,
    //     "gender":data
    // }
    const query = {
        wechatId : userId
    }
    try {
        const template = await mongoClient.getCollection('users')
        .findOne( query, { projection:{ _id: 0 }})
        let updateDateNow = new Date().getTime();
        if(_.isNil(template.updatedDate)){
            let updatedDateArray = [];
            updatedDateArray.push(updateDateNow);
            template.updatedDate = updatedDateArray;
        }  else{ 
            template.updatedDate.unshift(updateDateNow);            
        }
        // res.json( { ...constant.SUCCESS, data : template});
        // console.log('template : ', template);
        await mongoClient.getCollection('users').replaceOne(query, template);
        res.json({...constant.SUCCESS, responseInfo : "Update User Info"});
    } catch(err) {
        console.error("Error Update User Info");
        res.send(constant.ERROR);
        return next();
    }
})
router.post('/users/add', function (req, res, next){
    console.info("POST insert user ");
    const body = req.body;
    const query = {
        wechatId: body.wechatId
    }
    mongoClient.getCollection('users').findOne(query).then(function(doc){
        console.log("doc is ", doc);
        if(doc){
            res.status(400).json({...constant.ERROR, responseInfo: "User already exist"});
            return;
        }else{
            const currentTimeStamp = new Date().getTime();
            if(!body.createdDate){
                body.createdDate = currentTimeStamp;
            }
            body.updateDate = [currentTimeStamp];
            mongoClient.getCollection('users').insertOne(body).then(function(err){
                res.json({...constant.SUCCESS, responseInfo : "User added successfully"});
            })   
        }
    })
})
router.get('/usersorder', async function (req, res, next){
    console.info("GET user order method");
    try {
        let orders = [];
        await mongoClient.getCollection('users')
        .find({}, { projection:{ _id: 0 }} )
        .toArray(function(err, docs){
            _.forEach(docs, function(doc){
                const wechatId = doc.wechatId;
                const username = doc.name;
                _.forEach(doc.orderHistory, function(order){
                    order['wechatId'] = wechatId;
                    order['userName'] = username;
                    orders.push(order);
                })                
            })            
            res.json( {...constant.SUCCESS, data: orders});
        }); 
        
    } catch(err) {
        console.error(err);
        res.send(constant.ERROR);
        return next();
    }
});
router.put('/usersorder/date', async function (req, res, next){
    console.info("PUT user order date method");
try {
    // let orders = [];
    await mongoClient.getCollection('users')
    .find({}, { projection:{ _id: 0 }} )
    .toArray(function(err, docs){
        _.map(docs, function(doc){
            const newOrderDate = _.sortBy(doc.orderHistory, [function(o) { return o.orderDate; }]).reverse();
            if(!_.isEqual(newOrderDate, doc.orderHistory)){
                console.log("newOrderDate: ", newOrderDate);
                console.log("doc.orderHistory: ", doc.orderHistory);
                // doc.orderHistory = neworderDate;
                // mongoClient.getCollection('users').findAndModify({
                //     query: {wechatId: doc.wechatId},
                //     update: {$set : { "doc.orderHistory" : newOrderDate }}
                // })
                // mongoClient.getCollection('users').replaceOne(
                //     {wechatId: doc.wechatId}, {"doc.orderHistory" : newOrderDate}
                //     // update: {$set : { "doc.orderHistory" : newOrderDate }}
                // )
            }
            console.log(doc);
        })            
        //res.json( {...constant.SUCCESS, data: orders});
    }); 
    
} catch(err) {
    console.error(err);
    res.send(constant.ERROR);
    return next();
}
})
router.put('/usersorder/wechatId', async function (req, res, next){
    console.info("UPDATE user order");
    // const wechatId = req.body.wechatId;
    // const order = req.body.order;
    // const todayDate = new Date().getTime();
    // if(!order.hasOwnProperty('orderDate')){
    //     order.orderDate = todayDate;
    // }
    // try{
    //     mongoClient.getCollection('users').updateOne(
    //         { wechatId: wechatId },
    //         { $push: { orderHistory: order } }
    //     ).then(function(){
    //         res.json({...constant.SUCCESS, responseInfo : "User order added successfully"});
    //     })
    // }catch(e){
    //     console.err(e);
    // }
})
router.get('/category', async function (req, res, next){
   console.info("GET cig method");
//    const cigName = req.params;
   let query = {}; 
    try {
        await mongoClient.getCollection('category')
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
router.get('/category/name', async function (req, res, next){
    console.info("GET cig name method");
    const cigName = req.params;
    let query = {
        "name": cigName
    }; 
     try {
         await mongoClient.getCollection('category')
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


module.exports = router;