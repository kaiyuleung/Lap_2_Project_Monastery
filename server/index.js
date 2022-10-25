require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const cors = require('cors');
const user = require('./routes/User');
const habit = require('./routes/Habits');
const authenticateToken = require('./Middleware/authenticateToken')

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
	console.log(error);
});

database.once("connected", () => {
	console.log("Database Connected");
});
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "API Up & Running..." });
});

// app.use('/api', routes)
app.use('/users', user)
app.use('/habits', authenticateToken, habit)

app.listen(3001, () => {
	console.log(`Server Started at ${3001}`);
});
