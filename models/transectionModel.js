const mongoose = require('mongoose');


const transectionSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    },
    type:{
        type: String,
        required: [true, "Type is Required"]
    },
    category: {
        type: String,
        required: [true, "Category is Required"]
    },
    referance: {
        type: String,
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    date: {
        type: Date,
        required: [true, "date is required"]
    }
}, { timestamps: true })

const transectionModel = mongoose.model('trasection', transectionSchema);
module.exports = transectionModel;