'use strict'

const mongoose = require('mongoose');

// define ads schema
const adSchema = mongoose.Schema({
    name: String,
    onSale: Boolean,
    price: Number,
    img: String,
    tags: [String]
});

// create model
const Ad = mongoose.model('Ad', adSchema);

// export model
module.exports = Ad;