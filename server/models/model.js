const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    pray: {
        required: true,
        type: Number,
        target: Number,
        completed: false

    },
    meditation: {
        required: true,
        type: Number,
        target: Number,
        completed: false
    },
    exercise: {
        required: true,
        type: Number,
        target: Number,
        completed: false
    },
    water_consumption: {
        required: true,
        type: Number,
        target: Number,
        completed: false
    },
    sleep: {
        required: true,
        type: Number,
        target: Number,
        completed: false
    },
    eat_veggies: {
        required: true,
        type: Number,
        target: Number,
        completed: false
    }
})

module.exports = mongoose.model('Data', dataSchema)