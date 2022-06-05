const express = require('express');
const createError = require('../middleware/error');
const Hotels = require('../models/Hotels');
const router = express.Router();
const {updateUser, deleteUser, getUser, getAllUsers} = require('../controllers/users');
const {verifyToken, verifyUser, verifyAdmin} = require('../middleware/verifyToken');

//Update
router.put("/:id", verifyUser, updateUser)

//Delete
router.delete("/:id", verifyUser, deleteUser)

//Get
router.get("/:id", verifyUser, getUser)

//Get all
router.get("/", verifyAdmin, getAllUsers)

module.exports = router;