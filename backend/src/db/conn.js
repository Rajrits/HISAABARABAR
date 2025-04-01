const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config();
mongoose.connect(process.env.MONGO_URI,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
}).then(()=>{
    console.log("connection Success");
}).catch((e)=>{
    console.log(e);
})