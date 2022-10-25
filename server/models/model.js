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
        type: String
    },
    habits: [
    {
            habitName: {type: String, default: "Pray"},
            target: {type: Number, default: 0},
            current: {type: Number, default: 0},
            frequency: String,
            streak: {type: Number, default: 0},
            completed: {type: Boolean, default: false}
        
    },
    {
        habitName: {type: String, default: "Meditation"},
        target: {type: Number, default: 0},
        current: {type: Number, default: 0},
        frequency: String,
        streak: {type: Number, default: 0},
        completed: {type: Boolean, default: false}
    },
    {
        habitName: {type: String, default: "exercise"},
        target: {type: Number, default: 0},
        current: {type: Number, default: 0},
        frequency: String,
        streak: {type: Number, default: 0},
        completed: {type: Boolean, default: false}
    },
    {
        habitName: {type: String, default: "water_consumption"},
        target: {type: Number, default: 0},
        current: {type: Number, default: 0},
        frequency: String,
        streak: {type: Number, default: 0},
        completed: {type: Boolean, default: false}
    },
    {
        habitName: {type: String, default: "sleep"},
        target: {type: Number, default: 0},
        current: {type: Number, default: 0},
        frequency: String,
        streak: {type: Number, default: 0},
        completed: {type: Boolean, default: false}
    },
    {
        habitName: {type: String, default: "eat_veggies"},
        target: {type: Number, default: 0},
        current: {type: Number, default: 0},
        frequency: String,
        streak: {type: Number, default: 0},
        completed: {type: Boolean, default: false}
    }
]})

module.exports = mongoose.model('Data', dataSchema)
