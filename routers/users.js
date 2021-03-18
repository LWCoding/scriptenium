const express = require("express")
const auth = require("../middleware/auth")
const referer = require("../middleware/referer")
const User = require("../models/user")
const bcrypt = require("bcryptjs")

const userRouter = express.Router()

userRouter.post("/register", referer, async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    try {
        await user.save()
        const token = await user.generateAuthToken()
        req.session.token = token
        req.session.user = user
        let date = new Date()
        let cookieExpiryDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay())
        req.session.cookie.expires = cookieExpiryDate
    } catch (error) {
        return res.status(400).send({error: "Username or password is invalid!"})
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
    let date = new Date()
    let cookieExpiryDate = new Date(date.getFullYear() + 1, date.getMonth(), date.getDay())
    req.session.cookie.expires = cookieExpiryDate
    return res.status(200).send()
})

userRouter.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("/")
})

module.exports = userRouter