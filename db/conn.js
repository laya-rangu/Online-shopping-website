const mongoose = require("mongoose");

const DB = "mongodb+srv://priyavykuntapu01:priya0102@cluster0.fxdjwwn.mongodb.net/shopping?retryWrites=true&w=majority";
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>console.log("connection is successfully done")).catch((error)=>console.log("error hai" + error.message))