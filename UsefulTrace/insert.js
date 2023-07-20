const dbConnect = require('../Backend/mongodb');


const insert = async(name,price,brand,category,_v)=>{
   const db = await dbConnect();

   const result = await db.insertOne(
    {name: name,
    price: price,
    brand: brand,
    category: category,
    _v: _v}
    );

  return result;
}



module.exports = insert;