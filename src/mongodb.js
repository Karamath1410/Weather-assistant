require("dotenv").config();

const mongoose = require('mongoose');

mongoose.connect("link")
.then(()=>{
    console.log("Successfully connected to database");
})
.catch(()=>{
    console.log("Not connected to database");
    console.log(console.error());
});

const LoginSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    }
);

const collection = new mongoose.model("Collection1",LoginSchema);

module.exports = collection;
