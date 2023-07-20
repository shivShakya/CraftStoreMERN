const express = require('express');
const dbConnect = require('../Backend/mongodb');
const main = require('../Backend/index');
const insert = require('./insert');

const app = express();

app.use(express.json());


app.get('/',async(req,res)=>{

    let data = await main();
    res.send(data);
});

app.post('/post',async(req,res)=>{
    const db = await dbConnect();
    const {name , price , brand ,category, _v} = req.body;
    const result = await insert(name,price,brand,category,_v);
   res.send(req.body);
});

app.listen(3000,()=>{
    console.warn("localhost 3000");
});

