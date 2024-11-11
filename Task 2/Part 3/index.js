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

// Get users with respect to class
app.get("/ip/:class", (req, res) => {
    const className = req.params.class.toUpperCase();

    // Check if the class is 'C'
    if (className !== 'C') {
        return res.status(400).json({ message: "Enter 'C' class to retrieve the data" });
    }

    fs.readFile("./MOCK_DATA_2.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Failed to read the file." });
        }

        let usersData = JSON.parse(data);

        // Filter to get users with Class C IP addresses (first octet 192 to 223)
        const classCUsers = usersData.filter((user) => {
            const firstOctet = parseInt(user.ip_address.split('.')[0], 10);
            return firstOctet >= 192 && firstOctet <= 223;
        });

        // Return the filtered data
        res.status(200).json(classCUsers);
    });
});



// able to set organization to QAU of class D and other classes too.
app.patch('/ip/users/:class', (req, res) => {
    const className = req.params.class.toUpperCase(); // for class in the URL

    if (className !== 'D') {
        return res.status(400).json("Enter valid class. Only Class D IP addresses are supported.");
    }
    
    fs.readFile("./MOCK_DATA_2.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json("Failed to read the file.");
        }

        let classDetails = JSON.parse(data);
        let count = 0;

        // Update organization for Class D IPs
        classDetails.forEach((user) => {
            const firstOctet = parseInt(user.ip_address.split('.')[0]);

            if (firstOctet >= 224 && firstOctet <= 239) {
                user.organization = "QAU";
                count++;
            }
        });

        // Write updated data back to the file
        fs.writeFile("./MOCK_DATA_2.json", JSON.stringify(classDetails, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json("Failed to update organization.");
            }
    
            res.status(200).json(`Organization successfully updated for ${count} users with Class D IP addresses to QAU.`);
        });
    });
});

// delete all users having Class E IP addresses. 
app.delete('/ip/users/:class', (req, res) => {
    const className = req.params.class.toLowerCase();

    if (className !== 'e') {
        return res.status(400).json("Invalid IP class. Only Class E is supported.");
    }

    fs.readFile("./MOCK_DATA_2.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).json("Failed to read the file.");
        }

        let usersData = JSON.parse(data);
        const initialCount = usersData.length;

        // Filter out users who do not have Class E IP addresses
        usersData = usersData.filter((user) => {
            const firstOctet = parseInt(user.ip_address.split('.')[0]);
            return !(firstOctet >= 240 && firstOctet <= 255);
        });

        const deletedCount = initialCount - usersData.length;

        // Write the updated data back to the file
        fs.writeFile("./MOCK_DATA_2.json", JSON.stringify(usersData, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json("Failed to delete users with Class E IP addresses.");
            }

            res.status(200).json({
                message: `Successfully deleted ${deletedCount} users with Class E IP addresses.`,
            });
        });
    });
});


app.route("/api/users")
.get((req, res) => {    // To get all users
    fs.readFile('./MOCK_DATA_2.json', (err, data) => {
        if(err)
        {
            res.status(404).json("Failed to Read the users data!!!")
        }

        const usersData = JSON.parse(data);
        return res.status(200).json(usersData);
    })
}).post((req, res) => {     // insert some new instances saved in a newly generated .json file.
    const newUser = req.body;

    // Check if the user data is provided
    if (!newUser) {
        return res.status(400).json({ message: "Please provide user data in the request body." });
    }

    const newFile = "./NEW_MOCK_DATA.json"; // Path to the new file

    // Read existing data from the new file, or start with an empty array if the file doesn't exist
    fs.readFile(newFile, "utf-8", (err, data) => {
        let users = [];

        if (!err && data) {
            try {
                users = JSON.parse(data); // Parse existing data if the file is found
            } catch (parseError) {
                return res.status(500).json({ message: "Failed to parse the existing user data." });
            }
        } else if (err && err.code !== 'ENOENT') {
            return res.status(500).json({ message: "Failed to read the new file." });
        }

        // Add the new user data to the existing array
        users.push(newUser);

        // Write the updated array back to the new file
        fs.writeFile(newFile, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).json({ message: "Failed to save new user data." });
            }

            res.status(201).json({
                message: "New user saved successfully to a new file!",
                user: newUser
            });
        });
    });
});

app.route("/api/users/:id")     // to get any user data
.get((req, res) => {
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

}).patch((req, res) => {    // to update any user
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id ==id )  // getting the index where data is stored in the File.
    
    if(index != -1)
    {
        const updatedDetails = { ...users[index], ...req.body};
        users[index] = updatedDetails;

        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if(err)
            {
                res.status(404).json("Error Updating Data")
            }

            res.json({mesaage: "User Data Updated Successfully", user: updatedDetails})
        })
    }
    else{
        res.json("User Not Found")
    }
}).delete((req, res) => { // to delete any user
    const id = Number(req.params.id);

    fs.readFile('./MOCK_DATA_2.json', "utf-8", (err, data) => {
        if (err) {
            return res.status(404).json("Failed to read data");
        }

        let userData = JSON.parse(data);
        const index = userData.findIndex((user) => user.id === id); // Getting the index of the user to delete

        if (index !== -1) {
            const deletedUser = userData.splice(index, 1)[0]; // Remove the user and capture the deleted user

            fs.writeFile("./MOCK_DATA_2.json", JSON.stringify(userData, null, 2), (writeErr) => {
                if (writeErr) {
                    return res.status(500).json("Error deleting user");
                }

                res.status(200).json({ message: "User deleted successfully", user: deletedUser });
            });
        } else {
            res.status(404).json("User not found");
        }
    });
});

// Getting all users by name:
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
