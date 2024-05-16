const mongoose=require('mongoose')

let mongoUrl='mongodb://localhost:27017/UrlShortener'

const connectDB=async()=>{

    await mongoose.connect(mongoUrl)
    .then(()=>{console.log("Connected...")})
    .catch((err)=>{console.log(`Not Connected... ${err}`)})
}

module.exports={connectDB}