const express = require("express")
const auth = require("../middleware/auth")
const referer = require("../middleware/referer")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

const userRouter = express.Router()

userRouter.post("/register", referer, async (req, res) => {
    if (req.body.reenter != req.body.password) {
        return res.status(400).send({error: "Passwords do not match."})
    }
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    try {
        const token = await user.generateAuthToken()
        await user.save()
        req.session.token = token
        req.session.user = user
    } catch (error) {
        console.log(error)
        return res.status(400).send({error: "Invalid username or password."})
    }
    return res.status(200).send()
})

userRouter.post("/login", referer, async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(400).send({error: "Invalid username or password."})
    }
    let isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
        return res.status(400).send({error: "Username or password is incorrect."})
    }
    const token = await user.generateAuthToken()
    req.session.token = token
    req.session.user = user
    return res.status(200).send()
})

userRouter.get("/logged-in", referer, auth, (req, res) => {
    return res.status(200).send({
        user: req.session.user
    })
})

userRouter.get("/logout", (req, res) => {
    req.session.destroy()
    return res.status(200).send()
})

module.exports = userRouter