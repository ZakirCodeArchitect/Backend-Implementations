const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const users = require("./MOCK_DATA.json");
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Ensure you can parse JSON bodies

let classA = [],
    classB = [],
    classC = [],
    classD = [],
    classE = [];

app.get("/ip", (req, res) => {
  users.forEach((user) => {
    let firstOctet = Number(user.ip_address.split(".")[0]);

    if (firstOctet >= 1 && firstOctet <= 126) {
      classA.push({ id: classA.length + 1, user });
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      classB.push({ id: classB.length + 1, user });
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      classC.push({ id: classC.length + 1, user });
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      classD.push({ id: classD.length + 1, user });
    } else if (firstOctet >= 240 && firstOctet <= 255) {
      classE.push({ id: classE.length + 1, user });
    }
  });

  // Write to JSON files once after all classifications
  const classes = { 
    A: classA, 
    B: classB, 
    C: classC, 
    D: classD, 
    E: classE 
  };

  for (const [key, value] of Object.entries(classes)) {
    fs.writeFile(`${key}.json`, JSON.stringify(value), (err) => {
      if(err){ 
        console.log(err);
      }
      else console.log(`Successfully created File ${key}`);
    });
  }

  return res.json(classes);
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
