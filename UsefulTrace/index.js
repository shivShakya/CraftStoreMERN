const dbConnect = require('./mongodb');
/*
dbConnect().then((res)=>{
   res.find({}).toArray().then((data)=>{
       console.warn(data);
   })
})
*/

const main = async () => {
      let data = await dbConnect();
      data  = await data.find().toArray();
      return data ;   
};


module.exports = main;

