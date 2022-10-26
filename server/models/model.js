const mongoose = require('mongoose');

// const dataSchema = new mongoose.Schema({
//     username: {
//         required: true,
//         type: String
//     },
//     habits: [
//     {
//         pray: {
//             target: Number,
//             current: Number,
//             frequency: String,
//             streak: Number,
//             completed: Boolean
        
//     }},
//     {
//         meditation: {
//                 // required: true,
//                 target: Number,
//                 current: Number,
//                 frequency: String,
//                 streak: Number,
//                 completed: Boolean

//         }},
//     {
//         exercise: {
//             type: Object, "default": {
//                 // required: true,
//                 target: Number,
//                 current: Number,
//                 frequency: String,
//                 streak: Number,
//                 completed: Boolean
//         }
//     }},
//     {
//     water_consumption: {
//         type: Object, "default": {
//             // required: true,
//             target: Number,
//             current: Number,
//             frequency: String,
//             streak: Number,
//             completed: Boolean
//         }
//     }},
//     {
//     sleep: {
//         type: Object, "default": {
//             // required: true,
//             target: Number,
//             current: Number,
//             frequency: String,
//             streak: Number,
//             completed: Boolean
//         }
//     }},
//     {
//     eat_veggies: {
//         type: Object, "default": {
//             // required: true,
//             target: Number,
//             current: Number,
//             frequency: String,
//             streak: Number,
//             completed: Boolean
//         }
//     }}
// ]})

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
