const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect("mongodb://127.0.0.1:27017/railway_management",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log('DB connected') ) .catch((err)=>console.log(err.message))