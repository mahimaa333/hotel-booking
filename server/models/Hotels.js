const mongoose = require('mongoose');

const hotelsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min:0,
        max:5
    },
    desc:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    distance:{
        type: String,
        required: true
    },
    images:{
        type: [String]
    },
    rooms:{
        type: [String],
    },
    cheapestPrice:{
        type: Number,
        required: true
    },
    featured:{
        type: Boolean,
        default: false
    },
})


const Hotels = mongoose.model('Hotels', hotelsSchema);

module.exports = Hotels;