const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const users = require("./MOCK_DATA.json");
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));

let classA = [];
let classB = [];
let classC = [];

app.get("/ip", (req, res) => {
  users.forEach((user) => {
    let IP = Number(user.ip_address.split(".")[0]);
    
    if (IP >= 1 && IP <= 126) {
      classA.push({ id: classA.length + 1, user });
    } else if (IP >= 128 && IP <= 191) {
      classB.push({ id: classB.length + 1, user });
    } else if (IP >= 192 && IP <= 223) {
      classC.push({ id: classC.length + 1, user });
    }
  });

  // Write to JSON files once after all classifications
  fs.writeFile("A.json", JSON.stringify(classA), (err) => {
    if (err) console.log(err);
    else console.log("Successfully created File A");
  });
  
  fs.writeFile("B.json", JSON.stringify(classB), (err) => {
    if (err) console.log(err);
    else console.log("Successfully created File B");
  });
  
  fs.writeFile("C.json", JSON.stringify(classC), (err) => {
    if (err) console.log(err);
    else console.log("Successfully created File C");
  });

  return res.json({ Aclass: classA, Bclass: classB, Cclass: classC });
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    res.json(user);
  })
  .post((req, res) => {
    const body = req.body;
    users.push({ id: users.length + 1, ...body });

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error writing file" });
      } else {
        res.json({ message: "User added successfully" });
      }
    });
  })
  .patch((req, res) => {
    res.json({ message: "Update a User" });
  })
  .delete((req, res) => {
    res.json({ message: "Delete a User" });
  });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express Server Started on PORT : ${PORT}`);
});
