require("./mongoose");
const path = require('path');
const express = require('express');
const session = require("express-session");
const cors = require("cors")

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json())
app.use(cors())

const MongoStore = require("connect-mongo")
app.use(session({ 
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URL}), 
    secret: process.env.COOKIE_SECRET, 
    resave: true, 
    saveUninitialized: true, 
    cookie: {
        httpOnly: true, 
        secure: false,
        sameSite: "lax"
    } 
}))

const userRouter = require("./routers/users.js")
app.use(userRouter)

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
});