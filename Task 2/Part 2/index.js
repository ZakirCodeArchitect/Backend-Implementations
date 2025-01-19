const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const users = require("./MOCK_DATA.json");
const fs = require("fs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Ensure you can parse JSON bodies

app.route("/:id")
.get((req, res) => {
    const id = Number(req.params.id)
    const user  = users.find((user) => user.id === id)
    if(!user){
        res.json("User not Found")
    }
    else{
        res.send(user);
    }
})
.patch((req, res) => {
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
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Express Server Started on PORT : ${PORT}`);
});
