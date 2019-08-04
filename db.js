console.log(__filename);
// const config = require('./config.js');
const MongoClient = require('mongodb').MongoClient;
var mongodb;

const uri = "mongodb+srv://Ethan_Zhao:Ethan1026@cluster0-xwhjn.mongodb.net/test?retryWrites=true&w=majority";

//const url = "mongodb://localhost:27017/cig"
MongoClient.connect(uri,{
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
