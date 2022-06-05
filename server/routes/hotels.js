const express = require('express');
const createError = require('../middleware/error');
const Hotels = require('../models/Hotels');
const router = express.Router();
const {createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, getHotelsByCity, getHotelsByType,getHotelRooms} = require('../controllers/hotels');
const { verifyAdmin } = require('../middleware/verifyToken');

//Create
router.post("/", verifyAdmin, createHotel)

//Get all
router.get("/", getAllHotels)
router.get("/countbycity", getHotelsByCity)
router.get("/countbytype", getHotelsByType)
router.get("/room/:id", getHotelRooms);

//Update
router.put("/:id", verifyAdmin, updateHotel)

//Delete
router.delete("/find/:id", verifyAdmin, deleteHotel)

//Get
router.get("/find/:id", getHotel)


module.exports = router;