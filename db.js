const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;
let mongodb = null;



const uri = config.mongoUrl;
const client = new MongoClient(uri);
console.log('connecting to mongodb ' + uri);
client.connect(function(err) {
  const collection = client.db("TEST");
  console.log(collection);
  // perform actions on the collection object
  client.close();
});

// MongoClient.connect(uri,{
//     poolSize:10
// },function(err, db){
//     if(err){
//         console.log('ERROR connecting to MongoDB');
//         return;
//     }
//     console.log(" Connecting Successfully");
//     mongodb = db;
//     client.close();
// })

// module.exports.getCollection = function (collection){
//     return mongodb.collection(collection);
// }
