const express = require('express');
const _ = require('lodash');
const mongoClient = require('../db');
const constant = require('./../constant');
const router = express.Router();

// async function getDocument (collectionName, query){
//     let a = await mongoClient.getCollection(collectionName)
//         .find(query,{projection:{ _id: 0 }})
//         .toArray();
//         console.log(a);
//     return a;
// }
// var greetings = {
//     getDocument: function(collectionName, query) {
//         let a = await mongoClient.getCollection(collectionName)
//         .find(query,{projection:{ _id: 0 }})
//         .toArray();
//         console.log(a);
//         return a;
//     },
    
//     sayHelloInSpanish: function() {
//     return "Hola";
//     }
//     };
        // mongoClient.getCollection('users')
        // .find(query,{projection:{ _id: 0 }})
        // .toArray(function(err, docs){
        //     return docs;
        //     // res.json( Object.assign(constant.SUCCESS, {data: docs}));
        // }); 