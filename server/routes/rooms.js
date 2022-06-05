const express = require('express');
const createError = require('../middleware/error');
const router = express.Router();
const {createRoom, updateRoom, deleteRoom, getRoom, getAllRooms, updateRoomAvailability} = require('../controllers/rooms');
const { verifyAdmin } = require('../middleware/verifyToken');

//Create
router.post("/:hotelid", verifyAdmin, createRoom)

//Update
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom)

//Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

//Get
router.get("/:id", getRoom)

//Get all
router.get("/", getAllRooms)

module.exports = router;