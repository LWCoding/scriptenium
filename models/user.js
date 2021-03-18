const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

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
    }
})

userSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel