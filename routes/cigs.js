var express = require('express');
var _ = require('lodash');
var mongoClient = require('./../db');


var router = express.Router();

router.get('/users', async function (req, res, next){
    console.log(" in get method");
    const template = await mongoClient.getCollection('users').find().toArray();
    console.log(template);
})

module.exports = router;