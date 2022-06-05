const Hotels = require("../models/Hotels")
const Rooms = require("../models/Rooms")

const createRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid
    const newRoom = new Rooms(req.body)
    try {
        const saveRoom = await newRoom.save()
        try {
            await Hotels.findByIdAndUpdate(hotelId, {$push : {rooms: saveRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(saveRoom)
    } catch (error) {
        next(error)
    }
}

const updateRoom = async(req, res, next) => {
    try {
        const updatedRoom = await Rooms.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(updatedRoom)
    } catch (error) {
        next(error)
    }
}

const deleteRoom = async(req, res, next) => {
    const hotelId = req.params.hotelid
    try {
        await Rooms.findByIdAndDelete(req.params.id)
        try {
            await Hotels.findByIdAndUpdate(hotelId, {$pull : {rooms: req.params.id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json("deleted Room")
    } catch (error) {
        next(error)
    }
}

const getRoom = async(req, res, next) => {
    try {
        const getRoom = await Rooms.findById(req.params.id)
        res.status(200).json(getRoom)
    } catch (error) {
        next(error)
    }
}

const getAllRooms = async(req, res, next) => {
    try {
        const allRooms = await Rooms.find()
        res.status(200).json(allRooms)
    } catch (error) {
        next(error)
    }
}

const updateRoomAvailability = async (req, res, next) => {
    try {
      await Rooms.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };

module.exports = {createRoom, updateRoom, deleteRoom, getRoom, getAllRooms,updateRoomAvailability};