const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name is required'],
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    }

}, {timestamp:true})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel;