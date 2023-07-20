const {MongoClient} = require('mongodb');
const { get } = require('mongoose');
const url = 'mongodb://localhost:27017';

const client = new MongoClient(url);

async function dbConnect(){

    let result = await client.connect();
    let db =  result.db('e-comm');
    return db.collection('products');
   // let response = await collection.find({price:450}).toArray();
   // console.log(response);
}

module.exports = dbConnect;