"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3001;
//middleware
app.use(express.json());
app.get('/', function (req, res) {
    res.send("Hello, Typescript with Express.js");
});
app.get('/user/:name', function (req, res) {
    var name = req.params.name;
    res.send("Hello, ".concat(name));
});
app.listen(PORT, function () {
    console.log("Server running on Port: ".concat(PORT));
});
