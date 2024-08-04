const mongoose=require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log('DB connected') ) .catch((err)=>console.log(err.message))