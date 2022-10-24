require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const cors = require('cors');
const routes = require('./routes/Routes');

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use('/api', routes)

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})



