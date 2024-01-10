const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    product: {
        type : String,
        required: true,
        unique: true
    },
    price : {
        type : Number,
        required: true
    }
},{timestamps:true});

const item = mongoose.model("item",itemSchema)

module.exports = item;