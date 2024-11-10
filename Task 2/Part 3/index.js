const express = require('express');
const fs = require('fs');
const path = require('path');
const users = require('./MOCK_DATA_2.json');
const app = express();
const PORT = 3000;

let classA = [],
    classB = [],
    classC = [],
    classD = [],
    classE = [];

// Function to classify and write users to respective files
app.post("/api/users/:class", (req, res) => {
    const className = req.params.class.toUpperCase();

    users.forEach((user) => {
        let octet = Number(user.ip_address.split('.')[0]);

        if (className === 'A' && octet >= 0 && octet <= 126) {
            classA.push({ id: classA.length + 1, ...user });
        } else if (className === 'B' && octet >= 128 && octet <= 191) {
            classB.push({ id: classB.length + 1, ...user });
        } else if (className === 'C' && octet >= 192 && octet <= 223) {
            classC.push({ id: classC.length + 1, ...user });
        } else if (className === 'D' && octet >= 224 && octet <= 239) {
            classD.push({ id: classD.length + 1, ...user });
        } else if (className === 'E' && octet >= 240 && octet <= 255) {
            classE.push({ id: classE.length + 1, ...user });
        }
    });

    // Writing data to respective files based on the class
    let fileName;
    let dataToWrite;

    switch (className) {
        case 'A':
            fileName = "A.json";
            dataToWrite = classA;
            break;
        case 'B':
            fileName = "B.json";
            dataToWrite = classB;
            break;
        case 'C':
            fileName = "C.json";
            dataToWrite = classC;
            break;
        case 'D':
            fileName = "D.json";
            dataToWrite = classD;
            break;
        case 'E':
            fileName = "E.json";
            dataToWrite = classE;
            break;
        default:
            return res.status(400).json({ message: "Invalid IP class" });
    }

    fs.writeFile(fileName, JSON.stringify(dataToWrite, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ message: `Failed to write IPs in File ${className}` });
        }
        return res.status(200).json({ message: `IPs successfully written in File ${className}`, data: dataToWrite });
    });
});

// Route to read data from files based on IP class
app.get("/ip/:class", (req, res) => {
    const className = req.params.class.toUpperCase();

    fs.readFile(`${className}.json`, "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file" });
        }
        const ipData = JSON.parse(data);
        return res.json(ipData);
    });
});

app.route("/api/users")
.get((req, res) => {
    fs.readFile('./MOCK_DATA_2.json', (err, data) => {
        if(err)
        {
            res.status(404).json("Failed to Read the users data!!!")
        }

        const usersData = JSON.parse(data);
        return res.status(200).json(usersData);
    })
}).post((req, res) => {
    
})


app.get("/api/users/:id", (req, res) => {
    const userId = Number(req.params.id);

    fs.readFile('./MOCK_DATA_2.json', (err, data) => {
        if(err)
        {
            res.status(404).json("Failed to Read the users data!!!")
        }

        const usersData = JSON.parse(data);

        const user = usersData.find((user) => user.id === userId);

        if(user)
        {
            res.status(200).json(user)
        }
        else{
            res.status(404).json("User not Found ")
        }
    })  

})
app.get("/api/users/:name", (req, res) => {
    const userName = req.params.name.toLowerCase(); 

    fs.readFile('./MOCK_DATA_2.json', "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json("Failed to read the users data!");
        }

        const usersData = JSON.parse(data);

        // Find the user by first name (case-insensitive)
        const user = usersData.find((user) => user.first_name.toLowerCase() === userName);

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json("User not found");
        }
    });
});



app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
