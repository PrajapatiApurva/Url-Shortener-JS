require("dotenv").config();
const mongoose=require('mongoose')

let mongoUrl= process.env.MONGODB_URL
const connectDB=async()=>{

    await mongoose.connect(mongoUrl)
    .then(()=>{console.log("Connected...")})
    .catch((err)=>{console.log(`Not Connected... ${err}`)})
}

module.exports={connectDB}

// connectDB();