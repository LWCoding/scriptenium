const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 16,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    token: {
        type: String,
        required: true
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

const userModel = mongoose.model("User", userSchema)

module.exports = userModel