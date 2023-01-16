const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:String,
    body:String,
    device:String,
    userID:String
},{
    versionKey:false
})

const postModel = mongoose.model("Post",postSchema)

module.exports = {postModel}