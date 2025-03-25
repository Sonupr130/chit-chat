import express from "express";
import dbConnect from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
// app.use(cors());
app.use(express.json());

dbConnect();

app.get('/', (req, res) =>{
    res.send("server started")
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
