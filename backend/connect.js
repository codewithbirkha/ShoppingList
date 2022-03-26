const mongoose = require('mongoose')
const connectDB=async()=>{

    try{
    const conn=await mongoose.connect(process.env.MONGO_URL)
    console.log("Mongodb Connected")
    }catch(error){
        console.log('could no connected');
    }
}
module.exports = connectDB