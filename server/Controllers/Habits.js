const Model = require('../models/model');

// async function post (req, res) {
//     const data = new Model({
//         username: req.body.username,
//         habits: req.body.habits
//     })
//     try {
//         const newHabit = await Model.create(data);
//         res.status(201).json(newHabit);
//     }
//     catch (error) {
//         res.status(400).json({message: error.message})
//     }
// }

async function getUser (req, res) {
    try{
        const userData = await Model.findOne({username: req.user.name});
        res.status(200).json(userData);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

async function getHabit (req, res) {
    try{
        const userData = await Model.findOne({username: req.user.name});
        const habitData = userData.habits.filter(h => h._id == req.params.id);
        if(!habitData.length){ throw new Error("No matched habit.") }
        res.status(200).json(habitData[0]);
    }
    catch(error){
        res.status(404).json({message: error.message})
    }
}

async function postHabit (req, res) {
    const newHabit = {
        "habitName": req.body.habitName,
        "target": req.body.target,
        "current":  req.body.target,
        "frequency":  req.body.frequency,
        "streak":  req.body.streak,
        "completed":  req.body.completed
    }
    try {
        const userData = await Model.findOne({username: req.user.name});
        if(userData.habits.some(h => h.habitName === newHabit.habitName)){
            throw new Error("Habit already exists.")
        }
        userData.habits.push(newHabit);
        await Model.updateOne({_id: userData._id}, userData)
        res.status(202).json(userData.habits.at(-1));

    } catch (err) { 
        res.status(400).json({message: err.message}) 
    }
}

async function updateHabit (req, res) {
    try {
        const userData = await Model.findOne({username: req.user.name});
        const habitData = userData.habits.filter(h => h._id == req.params.id);
        if(!habitData.length){ throw new Error("No matched habit.") }

        switch(req.body.mode){
            case "a":
                habitData[0].completed = true;
                break;
            case "b":
                habitData[0].current += 1;
                break;
            case "c":
                habitData[0].streak = 0;
                break;
            default:
                throw new Error("Not a valid update mode.");
        }
        await Model.updateOne({_id: req.params.id}, userData)


        // let data = await Model.find({username: req.user.name});
        // let newData = data[0].habits.filter(h => {
        //     return h._id == req.params.id
        // })
        // let userID = data[0].id
        // newData[0].current += 1
        // await Model.updateOne({_id: userID}, data[0])
    res.json(habitData[0])
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function destroyHabit (req, res) {
    try {
        const userData = await Model.findOne({username: req.user.name});
        const habitDataIdx = userData.habits.findIndex(h => h._id == req.params.id);
        const habitDataName = userData.habits[habitDataIdx].habitName;
        if(habitDataIdx === -1){ throw new Error("No matched habit.") }
        userData.habits.splice(habitDataIdx,1)
        await userData.save();
        res.send(`Document with ${habitDataName} has been deleted..`)

        // const data = await Model.findByIdAndDelete(req.params.id)
        // res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

module.exports = { getUser, postHabit, getHabit, updateHabit, destroyHabit }
