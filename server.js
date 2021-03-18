require("./mongoose.js");
const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
app = express();
app.use(express.static(path.join(__dirname, 'dist')));

const userRouter = require("./routers/users.js")
app.use(userRouter)

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
});