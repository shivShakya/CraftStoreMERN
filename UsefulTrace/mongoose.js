const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/e-comm");
   
const  ProductSch = new mongoose.Schema({
     name: String,
     price: Number,
     brand: String
})


const saveData = async ()=>{
   const ProductMod = mongoose.model('products',ProductSch);
   let data = new ProductMod({
     name: "m8",
     price: 220,
     brand: "mobile"
   });

   let result = await data.save();
   console.log(result);
};


const updateData = async () => {
    const ProductMod = mongoose.model('products',ProductSch);
    let data = await ProductMod.updateOne(
        {name:"m8"},
        {
            $set:{price:201}
         }
    )
    console.log(data);
};

const deleteData = async () => {
    const ProductMod = mongoose.model('products',ProductSch);
    let data  = await ProductMod.deleteOne(
        {name:"sameso"}
    );
    console.log(data);
};

const findData  = async () => {
    const ProductMod = mongoose.model('products',ProductSch);
    let data  = await ProductMod.find(
        {name:"m8"}
    );
    console.log(data);
};

findData();
