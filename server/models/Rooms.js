const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    maxPeople:{
        type: Number,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    roomNumbers: [{
        number: Number, 
        unavailableDates: {type: [Date]}
    }],
}, { timestamps: true })


const Rooms = mongoose.model('rooms', roomsSchema);

module.exports = Rooms;