const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

// imports
// const signup = require('./routes/signupRoutes');
const profile = require('./routes/profileRoutes');

// connections: 
const app = express();
const PORT = process.env.PORT || 3001;
const MONGODB = process.env.MONGO_DB;

// middlewares:
app.use(bodyParser.json()); // to get data from the JSON Body
app.use(bodyParser.urlencoded({ extended: true })); // to parse URL Encoded Data
app.set('view engine', 'ejs');


//  MongoDB
mongoose.connect(MONGODB).then(() => {
    console.log("MongoSB successfully connected")
}).catch((error) => {
    console.error("Error connecting MongoDB", error.message);
})

// routes:
// app.use("/", signup);
app.use("/api", profile);
app.get('/', (req, res) => {
    res.send('Welcome to the User Profile Management App!');
})

// Server: 
app.listen(PORT, () => {
    console.log(`Sever running on PORT: ${PORT}`)
})
