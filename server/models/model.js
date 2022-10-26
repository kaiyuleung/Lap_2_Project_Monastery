const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    totalStreak: { 
        required: true,
        type: Number,
        default: 0
    },
    habits: [
        {
            habitName: {type: String, default: "Pray"},
            target: {type: Number, default: 1},
            current: {type: Number, default: 0},
            frequency: {type: String, default: "Daily"},
            streak: {type: Number, default: 0},
            completed: {type: Boolean, default: false}
        }
    ]
})

module.exports = mongoose.model('Data', dataSchema)
