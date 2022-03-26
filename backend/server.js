const express = require('express')
const dotenv = require('dotenv')
const connectDB=require('./connect')
const cors =require('cors')
dotenv.config()
const PORT = process.env.PORT
connectDB()
const app=express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.get('/',(req,res)=>{
    res.send('welcome to api')
})


app.use('/api/items', require('./routes/itemRoutes'));


app.listen(5000,()=> console.log(`server is running on port ${PORT}`));