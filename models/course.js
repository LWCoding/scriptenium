const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const courseSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 16,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    token: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    xp: {
        type: Number,
        default: 0
    },
    xpNeeded: {
        type: Number,
        default: 100
    }
})

userSchema.methods.toJSON = function() {
    const user = this.toObject()
    delete user.token
    delete user.password
    return user
}

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET, {expiresIn: "7 days"})
    this.token = token
    await this.save()
    return token
}

const courseModel = mongoose.model("Course", courseSchema)

module.exports = courseModel