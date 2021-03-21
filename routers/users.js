const express = require("express")
const auth = require("../middleware/auth")
const referer = require("../middleware/referer")
const User = require("../models/user")
const Course = require("../models/course")
const bcrypt = require("bcryptjs")

const userRouter = express.Router()

userRouter.get("/enrolled-courses", referer, auth, async (req, res) => {
    const courses = []
    let curr = 0
    const length = req.session.user.courses.length
    if (length == 0) {
        return res.status(200).send({courses})
    }
    req.session.user.courses.forEach(async (course) => {
        const courseData = await Course.findOne({ title: course.title })
        courses.push(courseData)
        curr += 1
        if (curr == length) {
            return res.status(200).send({courses})
        }
    })
})

userRouter.post("/enroll", referer, auth, async (req, res) => {
    const course = await Course.findOne({ title: req.body.title })
    if (!course) {
        return res.status(400).send({error: "Course title not found."})
    }
    req.session.user.courses.push({
        title: course.title
    })
    try {
        await req.session.user.save()
    } catch (error) {
        console.log(error)
        return res.status(400).send({error: "Could not add course to user."})
    }
    return res.status(200).send()
})

userRouter.post("/unenroll", referer, auth, async (req, res) => {
    const idx = req.session.user.courses.findIndex((course) => course.title = req.body.title)
    if (idx == -1) {
        return res.status(400).send({error: "User does not have that course!"})
    }
    req.session.user.courses.splice(idx, 1)
    try {
        await req.session.user.save()
    } catch (error) {
        console.log(error)
        return res.status(400).send({error: "Could not remove course from user."})
    }
    return res.status(200).send()
})


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