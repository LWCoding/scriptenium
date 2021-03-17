const path = require('path');
const express = require('express');

const port = process.env.PORT || 3000;
app = express();
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
    console.log(`App listening on port ${port}.`)
});