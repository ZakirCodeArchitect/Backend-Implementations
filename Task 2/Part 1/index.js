const express = require("express");
const app = express();
require("dotenv").config();
const users = require("./MOCK_DATA.json");
const fs = require("fs");

app.use(express.urlencoded({ extended: false })); // Ensure you can parse URL encoded bodies
app.use(express.json()); // To parse the incoming requests with JSON payloads


    app.post("/ip/:class", (req, res) => {
      let classA = [],
          classB = [],
          classC = [],
          classD = [],
          classE = [];
    
          const className = req.params.class.toUpperCase();

      users.forEach((user) => {
        let firstOctet = Number(user.ip_address.split(".")[0]);
    
        if (firstOctet >= 1 && firstOctet <= 126) {
          classA.push(user);
        } else if (firstOctet >= 128 && firstOctet <= 191) {
          classB.push(user);
        } else if (firstOctet >= 192 && firstOctet <= 223) {
          classC.push(user);
        } else if (firstOctet >= 224 && firstOctet <= 239) {
          classD.push(user);
        } else if (firstOctet >= 240 && firstOctet <= 255) {
          classE.push(user);
        }
      });
    
      fs.writeFile(`${className}.json`, JSON.stringify(classA), (err) => {
        if (err) {
          return res.status(500).json({ message: "Error writing file A.json" });
        }
      });
    
      // fs.writeFile("B.json", JSON.stringify(classB), (err) => {
      //   if (err) {
      //     return res.status(500).json({ message: "Error writing file B.json" });
      //   }
      // });
    
      // fs.writeFile("C.json", JSON.stringify(classC), (err) => {
      //   if (err) {
      //     return res.status(500).json({ message: "Error writing file C.json" });
      //   }
      // });
    
      // fs.writeFile("D.json", JSON.stringify(classD), (err) => {
      //   if (err) {
      //     return res.status(500).json({ message: "Error writing file D.json" });
      //   }
      // });
    
      // fs.writeFile("E.json", JSON.stringify(classE), (err) => {
      //   if (err) {
      //     return res.status(500).json({ message: "Error writing file E.json" });
      //   }
      // });
    
      return res.status(200).json({
        message: "Users have been classified and written to respective files."
      });
    });
app.get("/ip/:class", (req, res) => {

  // Enter A,B,C,D,E
    const className = req.params.class.toUpperCase();

    fs.readFile(`${className}.json`, "utf-8", (err,data) => {
      if (err) {
        res.status(500).json({ message: "Error Reading files" });
      } 
      const ipData = JSON.parse(data);
      return res.json(ipData);
  })
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express Server Started on PORT : ${PORT}`);
});
