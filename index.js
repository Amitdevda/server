const express = require("express");
const cors = require("cors")
const { userRouter } = require("./route/userrouter.js")
const { connection } = require("./config/db.js");
const { authenticate } = require("./middleware/authentication.js")
const { postRouter } = require("./route/postrouter.js")

const app = express();
app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use(authenticate)
app.use("/post", postRouter)

app.listen(5000, async () => {
    try {
        await connection;
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Not connect DB" + error)
    }
    console.log("Server is Running at port 5000")
})