
const mongoose = require ("mongoose");


const connectDB =  async()=>{
 try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected TO MongoDB")
 }catch(err){
    console.log("connection with db failed", err)
 }
   
}

//mongoose.connect no longer accepts a callback 




module.exports=connectDB 
