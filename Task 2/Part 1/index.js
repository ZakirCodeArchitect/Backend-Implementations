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

app.post("/ip", (req, res) => {
  users.forEach((user) => {
    let firstOctet = Number(user.ip_address.split(".")[0]);

    // user which will fall in the condition will get pushed in the respective array
    if (firstOctet >= 1 && firstOctet <= 126) 
    {
      classA.push({ id: classA.length + 1, user });   
    } 
    else if (firstOctet >= 128 && firstOctet <= 191) 
    {
      classB.push({ id: classB.length + 1, user });
    } 
    else if (firstOctet >= 192 && firstOctet <= 223) 
    {
      classC.push({ id: classC.length + 1, user });
    } 
    else if (firstOctet >= 224 && firstOctet <= 239) 
    {
      classD.push({ id: classD.length + 1, user });
    } 
    else if (firstOctet >= 240 && firstOctet <= 255) 
    {
      classE.push({ id: classE.length + 1, user });
    }
  });

  // writing IP's in the 
  fs.writeFile("A.json", JSON.stringify(classA), (err) => {
    if(err){
      res.json("Failed to write IP's in File A")
    }

    res.status(200).json("IP's successfully written in File A")
  })

  fs.writeFile("B.json", JSON.stringify(classB), (err) => {
    if(err){
      res.json("Failed to write IP's in File B")
    }

    res.status(200).json("IP's successfully written in File B")
  })

  fs.writeFile("C.json", JSON.stringify(classC), (err) => {
    if(err){
      res.json("Failed to write IP's in File C")
    }

    res.status(200).json("IP's successfully written in File C")
  })

  fs.writeFile("D.json", JSON.stringify(classD), (err) => {
    if(err){
      res.json("Failed to write IP's in File D")
    }

    res.status(200).json("IP's successfully written in File D")
  })

  fs.writeFile("E.json", JSON.stringify(classE), (err) => {
    if(err){
      res.json("Failed to write IP's in File E")
    }

    res.status(200).json("IP's successfully written in File E")
  })

  return res.json({
    classA:classA,
    classB:classB,
    classC:classC,
    classD:classD,
    classE:classE,
  })
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
