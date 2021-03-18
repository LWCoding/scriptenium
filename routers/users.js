const express = require("express")
const mongoose = require("mongoose")
const auth = require("../auth.js")

const userRouter = express.Router()

userRouter.get("/users", auth, (req, res) => {
    console.log("Through!")
    res.sendStatus(200)
})

module.exports = userRouter