const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const userRoutes = require('./Routes/user.routes');
const linkRoutes = require('./Routes/link.routes')

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/user", userRoutes);
app.use("/api/links", linkRoutes);


app.get('/',(req,res)=>{
    res.send("Hi There!")
})

const PORT = process.env.PORT || 4000;



app.listen(PORT, ()=>{
    console.log(`Server is running on PORT: ${PORT}`);
    mongoose.connect(process.env.MONGO_URI).then(()=>console.log("mongo DB connected"));
})