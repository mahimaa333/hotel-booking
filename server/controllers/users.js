const User = require("../models/User")

const updateUser = async(req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("deleted User")
    } catch (error) {
        next(error)
    }
}

const getUser = async(req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser)
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async(req, res, next) => {
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        next(error)
    }
}

module.exports = {updateUser, deleteUser, getUser, getAllUsers};