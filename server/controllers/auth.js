const express = require('express');
const router = express.Router;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const createError = require('../middleware/error');

// const generateToken = (id) => {
//     return jwt.sign({id}, process.env.JWT_SECRET,{
//         expiresIn: "30d",
//     });
// }


const register = async(req,res,next) => {
    const {username, email, password} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)

        const userExists = await User.findOne({username});
        const emailExists = await User.findOne({email});
        if(userExists || emailExists){
            res.status(400).json('User already registered');
        }
        else{
            const newUser = await User.create({
                username,
                email,
                password: hash,
            });
            if(newUser){
                res.status(201).json({
                    username: newUser.username,
                    email: newUser.email,
                    isAdmin: newUser.isAdmin,
                    createdAt: newUser.createdAt, 
                });
            }
            else{
                res.status(500).json("Something went wrong")
            }
        }
    } catch (error) {
        next(error)
    }
};

const login = async(req,res,next) => {
    const {username, password} = req.body;
    try {
        const user = await User.findOne({username});
        if(!user){
            return next(createError(404, "User not found"))
        }
        const passwordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!passwordCorrect){
            return next(createError(404, "Password not correct"))
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET)

        const {password, isAdmin, ...otherDetails} = user._doc;

        res.cookie("access_token", token,{
            httpOnly: true
        }).status(200).send({...otherDetails})
    } catch (error) {
        next(error)
    }
};


module.exports = {register, login};