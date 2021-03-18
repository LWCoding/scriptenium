const jwt = require("jsonwebtoken")
const User = require("../models/user")

const auth = async (req, res, next) => {
    try {
        const token = req.session.token;
        if (!token) {
            throw new Error()
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({_id: decoded._id, "token": token})
        req.session.user = user
        if (!user) {
            throw new Error()
        }
        let cookieExpiryDate = new Date(Date.now() + 604800000) // 1 week
        req.session.cookie.expires = cookieExpiryDate
        next()
    } catch (error) {
        return res.status(401).send({error: "User not authenticated."})
    }
} 

module.exports = auth