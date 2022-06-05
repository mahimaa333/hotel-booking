const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieparser = require('cookie-parser');
const cors = require('cors')

const mongodb = require('./config/db');
const authRoute = require('./routes/auth');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const usersRoute = require('./routes/users');

const app = express()
dotenv.config()

const PORT = process.env.PORT || 8000

app.use(cors())
app.use(cookieparser())
app.use(express.json());

app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)

app.use((err,req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
})

app.listen(PORT, () => {
    mongodb();
    console.log(`Connected to the port ${PORT}`)
})