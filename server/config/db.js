const mongoose = require('mongoose');

const mongodb  = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    try{
        const connection = mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB Database')
    }
    catch(e){
        console.log(e);
    }
};

mongoose.connection.on("disconnected", () => {
    console.log('database is disconnected')
})


module.exports = mongodb;