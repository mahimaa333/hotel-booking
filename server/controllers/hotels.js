const Hotels = require("../models/Hotels")
const Rooms = require("../models/Rooms")

const createHotel = async(req, res, next) => {
    const newHotel = new Hotels(req.body)
    try {
        const saveHotel = await newHotel.save()
        res.status(200).json(saveHotel)
    } catch (error) {
        next(error)
    }
}

const updateHotel = async(req, res, next) => {
    try {
        const updatedHotel = await Hotels.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(updatedHotel)
    } catch (error) {
        next(error)
    }
}

const deleteHotel = async(req, res, next) => {
    try {
        await Hotels.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted hotel")
    } catch (error) {
        next(error)
    }
}

const getHotel = async(req, res, next) => {
    try {
        const getHotel = await Hotels.findById(req.params.id)
        res.status(200).json(getHotel)
    } catch (error) {
        next(error)
    }
}

const getAllHotels = async(req, res, next) => {
    const { min, max, ...others } = req.query;
    try {
        const hotels = await Hotels.find({
        ...others,
        cheapestPrice: { $gt: min | 1, $lt: max || 1000 },
        }).limit(req.query.limit);
        res.status(200).json(hotels);
    } catch (error) {
        next(error);
    }
}

const getHotelsByCity = async(req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map((city) => {
            return Hotels.countDocuments({city: city})
        }))
        res.status(200).json(list)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const getHotelsByType = async(req, res, next) => {
    try {
        const hotelCount = await Hotels.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotels.countDocuments({ type: "apartment" });
        const resortCount = await Hotels.countDocuments({ type: "resorts" });
        const villaCount = await Hotels.countDocuments({ type: "villas" });
        const cabinCount = await Hotels.countDocuments({ type: "cabins" });
    
        res.status(200).json([
          { type: "hotel", count: hotelCount },
          { type: "apartment", count: apartmentCount },
          { type: "resorts", count: resortCount },
          { type: "villas", count: villaCount },
          { type: "cabins", count: cabinCount },
        ]);
      } catch (error) {
        next(error);
      }
}

const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotels.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Rooms.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };

module.exports = {createHotel, updateHotel, deleteHotel, getHotel, getAllHotels, getHotelsByCity, getHotelsByType, getHotelRooms};