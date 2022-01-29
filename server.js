require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Route
app.use('/compile', require('./routes/runner'));
app.use('/prettify', require('./routes/prettier'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})