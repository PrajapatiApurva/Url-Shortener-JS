const mongoose=require('mongoose');

const urlSchema= new mongoose.Schema({
    "fullUrl":{type:String,required:true},
    "shortUrl":{type:String,required:true,unique:true},
    "clicks":{type:Number,default:0}
});
    // {
    //     timestamps:true
    // }


const URL = mongoose.model("shorteners",urlSchema);

module.exports = URL;