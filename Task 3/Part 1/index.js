const express = require("express");
const path = require("path");
const os = require("os");

const app = express();


const Seconds = os.uptime();
const SecInHrs = 60 * 60
const Hours = Math.floor(Seconds/SecInHrs);
const Min = Math.floor((Seconds%SecInHrs)/60);
const osUptime = `${Hours} Hours, ${Min} Min, ${Math.floor(Seconds % 60)} Seconds`;
 
console.log("\nComputer System Uptime: ", osUptime);

const file = __filename;    // parsing  
console.log("\nFile Path : ", file);

console.log("File : ", path.basename(file));
console.log("File Extension : ", path.extname(file));
console.log("Directory :", path.dirname(file));

app.listen(3000, ()=>{
    console.log("\nServer started")
})

