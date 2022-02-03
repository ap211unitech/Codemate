require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Route
app.use('/compile', require('./routes/runner'));
app.use('/prettify', require('./routes/prettier'));

//Serve static assets if application is in production
if (process.env.NODE_ENV === "production") {
    //Set Static Folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})