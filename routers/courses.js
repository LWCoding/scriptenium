const express = require("express")
const referer = require("../middleware/referer")
const auth = require("../middleware/auth")
const Course = require("../models/course")

const courseRouter = express.Router()

courseRouter.get("/courses", referer, auth, async (req, res) => {
    var courses = await Course.find({})
    const titles = []
    req.session.user.courses.forEach((course) => {
        titles.push(course.title)
    })
    courses = courses.filter((course) => { return !titles.includes(course.title) })
    return res.status(200).send({courses})
})

courseRouter.post("/create", async (req, res) => {
    if (!req.body.title || !req.body.description || !req.body.tags) {
        return res.status(400).send({error: "All fields must be specified (title/description/tags)"})
    }
    const course = new Course({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags
    })
    try {
        await course.save()
    } catch (error) {
        return res.status(400).send({error: "Error saving course"})
    }
    return res.status(200).send()
})

courseRouter.patch("/add-content", async (req, res) => {
    const course = await Course.findOne({ title: req.body.title })
    const page = {
        type: req.body.type,
        unparsed: req.body.unparsed
    }
    course.content.push(page)
    try {
        await course.save()
    } catch(error) {
        return res.status(400).send({error: "Error saving course"})
    }
    return res.status(200).send()
})

module.exports = courseRouter