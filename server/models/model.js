const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        habits: [
    {
        pray: {
        required: true,
        type: Number,
        target: Number,
        completed: false
    }},
    {
    meditation: {
        required: true,
        type: Number,
        target: Number,
        current: Number,
        frequency: String,
        streak: Number,
        completed: false
    }},
    {
    exercise: {
        required: true,
        type: Number,
        target: Number,
        current: Number,
        frequency: String,
        streak: Number,
        completed: false
    }},
    {
    water_consumption: {
        required: true,
        type: Number,
        target: Number,
        current: Number,
        frequency: String,
        streak: Number,
        completed: false
    }},
    {
    sleep: {
        required: true,
        type: Number,
        target: Number,
        current: Number,
        frequency: String,
        streak: Number,
        completed: false
    }},
    {
    eat_veggies: {
        required: true,
        type: Number,
        target: Number,
        current: Number,
        frequency: String,
        streak: Number,
        completed: false
    }}
]}})

module.exports = mongoose.model('Data', dataSchema)