console.log(__filename);
// const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;
var mongodb;

const url = "mongodb://localhost:27017/cig"
MongoClient.connect(url,{
    poolSize:10,
    useNewUrlParser: true ,
},function(err, db){
    if(err){
        console.log('ERROR connecting to MongoDB');
        return;
    }
    console.log(" Connecting Successfully");
    mongodb = db.db("cig");
    // db.close();
});

module.exports.getCollection = function (collection){
    return mongodb.collection(collection);
}
