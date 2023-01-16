const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const { userModel } = require("../models/user_model.js");

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password } = req.body;
    try {
        bcrypt.hash(password, 3, async (err, hashed) => {
            const data = new userModel({ name, email, gender, password: hashed });
            await data.save();
            res.send(data)
        })
    } catch (error) {
        console.log(error)
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "masai");
                    res.send({
                        "msg": "login Sucessfull",
                        "token": token
                    })
                } else {
                    res.send("Wrong Credentials")
                }
            })
        } else {
            res.send("Can not find account Please Sign-up first")
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = {userRouter}