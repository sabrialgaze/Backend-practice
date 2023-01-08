'use strict'

const mongoose = require('mongoose');

// define ads schema
const adSchema = mongoose.Schema({
    name: {type: String , index:true},
    onSale: {type: Boolean, index:true}, 
    price: {type: Number , index:true},
    img: {type: String , index:true},
    tags: {type: [String] , index:true},
});

adSchema.statics.array = function(filter, skip, limit, fields, sort) {
    const query = Ad.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec()
};

adSchema.statics.tagsArray = function() {
    const query = Ad.distinct('tags'); 
    return query.exec(); 
};


// create model
const Ad = mongoose.model('Ad', adSchema);

// export model
module.exports = Ad;