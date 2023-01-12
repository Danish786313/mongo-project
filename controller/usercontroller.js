const User = require("../models/usermodel")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {
    User.find({ email : req.body.email }).exec().then(user => {
        if (user.length) {
            return res.status(409).json({
                success : false,
                message : "User already exist"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) throw Error
                const user = new User({
                    _id: mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: hash
                })
        
                user.save().then(user => {
                    return res.status(200).json({
                        success: true,
                        message: "user created successfully"
                    }) 
                }).catch(err => {
                    return res.status(400).json({
                        success: false,
                        message: "Something went wrong while creating user",
                        error: err
                    })
                })
            })
        }
    }).catch(err => {
        res.status(500).json({
            success: false,
            message: "somrthing went wrong",
            error: err
        })
    })
}

exports.login = async (req, res) => {
    User.find({ email : req.body.email}).exec().then(user => {
        if(!user.length) {
            return res.status(400).json({
                success: false,
                message: "user does not exist"
            })
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) throw Error
                if (result) {
                    const token = jwt.sign({
                        email : user[0].email,
                        password: user[0].password
                    }, process.env.secret, { expiresIn : "1h" })
                }
                return res.status(200).json({
                    success : true,
                    message: "user loged in successfully",
                    Token: token
                })
            })
        }
    }).catch()
}