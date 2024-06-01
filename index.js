require("dotenv").config();
const express=require('express');
const mongoose=require('mongoose')
const ShortUniqueId=require('short-unique-id');
const bodyParser=require('body-parser');

//Creating Object of express
const app=express();
//initializing Port number
const PORT=5501;
const URL=require('./models/urlModel');
//Middleware
app.use(bodyParser.json());

app.use((req,res,next)=>{
    let lodData=`${new Date().toISOString()} | ${req.url} | ${req.method}`;
    console.log(lodData);
    next();
});


//LocalModule Calling
const {connectDB} = require('./mongoDb')

//Function of local-Module
connectDB();

//Importing MongoDB models


//Methods
const isValidUrl = url => {
    const urlRegex = /^(http|https):\/\/[\w.-_~:\/?#[\]@!$&'()*+,;=]+$/;
    return urlRegex.test(url);
}


//Routes
app.get('/',(req,res)=>{
    res.status(200).send("Welcome to BHARAT");
});

app.get('/about',(req,res)=>{
    res.status(200).send("<h2>We are the Future Leaders</h2>");
});

app.get('/contact',(req,res)=>{
    res.json({
        number:'1234657890'
    });
});


app.post('/shorten',async(req,res)=>{
    const {fullUrl} = req.body;

    if(!isValidUrl(fullUrl)){
        return res.json({message:"Invalid Url"});
    }
    try{
        const existingUrl=await URL.findOne({fullUrl});
        if(existingUrl){
            return res.json({shortUrl:existingUrl.shortUrl});
        }
        
        const uid =new ShortUniqueId({length:15});
        const newUrlGen= uid.rnd();
        // console.log(newUrlGen);
        const newUrl=URL({fullUrl,shortUrl:newUrlGen});
        await newUrl.save();
        res.json({newUrlGen});
        
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Internal Server Error"})
    }
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = req.params.shortUrl;
  
    try {
      const url = await URL.findOne({ shortUrl });
      if (url) {
        await URL.updateOne({ shortUrl }, { $inc: { clicks: 1 } });  // Increment clicks (optional)
        return res.redirect(url.fullUrl);
      }
  
      res.status(404).json({ message: 'Short URL not found' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

//Port Listening
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});