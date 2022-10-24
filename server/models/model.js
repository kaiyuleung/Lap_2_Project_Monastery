const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    habits: [
    {
        pray: {
        type: Object, "default": {
            target: Number,
            current: Number,
            frequency: String,
            streak: Number,
            completed: Boolean
        }   
    }},
    {
        meditation: {
            type: Object, "default": {
                // required: true,
                target: Number,
                current: Number,
                frequency: String,
                streak: Number,
                completed: Boolean
            }
        }},
    {
    exercise: {
        type: Object, "default": {
            // required: true,
            target: Number,
            current: Number,
            frequency: String,
            streak: Number,
            completed: Boolean
        }
    }},
    {
    water_consumption: {
        type: Object, "default": {
            // required: true,
            target: Number,
            current: Number,
            frequency: String,
            streak: Number,
            completed: Boolean
        }
    }},
    {
    sleep: {
        type: Object, "default": {
            // required: true,
            target: Number,
            current: Number,
            frequency: String,
            streak: Number,
            completed: Boolean
        }
    }},
    {
    eat_veggies: {
        type: Object, "default": {
            // required: true,
            target: Number,
            current: Number,
            frequency: String,
            streak: Number,
            completed: Boolean
        }
    }}
]})

module.exports = mongoose.model('Data', dataSchema)
