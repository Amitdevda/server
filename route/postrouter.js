const express = require("express")
const { postModel } = require("../models/post_model.js");

const postRouter = express.Router()

postRouter.get("/", async (req, res) => {
    try {
        const data = await postModel.find()
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})
postRouter.post("/add", async (req, res) => {
    const payload = req.body
    try {
        const data = new postModel(payload)
        await data.save();
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

postRouter.patch("/update/:id", async (req, res) => {
    const id = req.params.id
    const payload = req.body
    const note = await postModel.findOne({ "_id": id })
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;
    try {
        if (userID_in_note == userID_making_req) {
            const update = await postModel.findByIdAndUpdate({ "_id": id }, payload)
            res.send("Updated")
        } else {
            res.send("You are not authorised")
        }
    } catch (error) {
        console.log(error)
    }
})

postRouter.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const note = await postModel.findOne({ "_id": id })
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;

    try {
        if (userID_in_note == userID_making_req) {
            const deleted = await postModel.findByIdAndDelete({ "_id": id })
            res.send("Deleted")
        } else {
            res.send("You are not authorised")
        }
    } catch (error) {
        console.log(error)
    }
})



module.exports = { postRouter }