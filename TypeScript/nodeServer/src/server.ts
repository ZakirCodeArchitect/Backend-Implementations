const express = require('express');
import { Request, Response} from "express";

const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Hello, Typescript with Express.js")
})

app.get('/user/:name', (req: Request, res: Response) => {
    const {name} = req.params;
    res.send(`Hello, ${name}`)
})
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
})
