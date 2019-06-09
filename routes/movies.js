const express = require('express')
const _ = require('lodash')
const mongoClient = require('./../db')
const constants = require('../utils/constants')
const cheerio = require('cheerio')
const request = require('request')
const router = express.Router();



router.get('/', async function (req, res, next) {
    // let index = 1;
    // let url = constants.Movies.Duo_Nao;
    // console.log(url);
    let users = await mongoClient.getCollection('users').find().toArray();
    console.log(users);
    
    // request(url + index, function(error, response, body){
    //     if(response.statusCode === 200 && !error){
    //         const $ = cheerio.load(body);
    //         const video = $('#video');
    //         console.log(video); 
    //         //res.json({data: JSON.stringify(video)});
    //     }
    // })
    
})




module.exports = router;