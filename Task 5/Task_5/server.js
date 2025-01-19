const express = require('express')
const dotenv = require("dotenv").config();
const app = express();
const mongoose = require('mongoose');
const path = require('path')
// const morgan = require('morgan');

const productsRoute = require("./routes/productsRoute");

// const morgan = require('morgan');


//middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
// app.use(morgan('tiny')); // for logging requests to the console 
app.use(express.static(path.join(__dirname, 'public'))); // for serving static files

// Constants
const PORT = process.env.PORT || 3001;
const Mongo_DB_URL = process.env.MONGO_DB;

//  MongoDB
mongoose.connect(Mongo_DB_URL)
.then(()=>{
    console.log("MongoDB connected successfully")
}).catch((error)=>{
    console.log(`Failed to connect MongoDB : ${error.message}`)
});

// routing 
app.use("/", productsRoute);

// server
app.listen(PORT, ()=>{
    console.log(`Server Running on : ${PORT}`)
})