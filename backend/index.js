const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
const app = express()
app.use(express.json())

app.get('/',(req,res)=>{
    console.log("hello");
    res.send("HI There!")
})

const PORT = process.env.PORT || 4000;


app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
    mongoose.connect(process.env.MONGO_URI).then(()=>console.log("mongo DB connected"));
})