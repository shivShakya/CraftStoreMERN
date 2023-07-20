const dbConnect = require('./mongodb');


const Delete = async() => {
     let db = await dbConnect();
     let result  = await db.deleteOne(
        {name:"maxx"}
     );

     console.log(result);
};


Delete();