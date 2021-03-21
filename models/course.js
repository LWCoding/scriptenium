const mongoose = require("mongoose")

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    content: [{
        type: {
            type: String,
            required: true,
            lowercase: true,
            validate(val) {
                const validPages = ["reading", "quiz"]
                if (!validPages.includes(val)) {
                    throw new Error("Invalid type for content page")
                }
            }  
        },
        unparsed: {
            type: String,
            required: true
        }
    }]
})

const courseModel = mongoose.model("Course", courseSchema)

module.exports = courseModel