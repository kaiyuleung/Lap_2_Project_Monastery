const Model = require('../models/model');

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
        // await Model.updateOne({_id: userData._id}, userData)
        await userData.save();
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
            case "d":
                habitData[0].streak += 1;
                break;
            default:
                throw new Error("Not a valid update mode.");
        }

        // Total Streak Count Updates
        userData.totalStreak = userData.habits.map(h => h.streak).reduce( (r,v) => r + v );
        // await Model.updateOne({_id: req.params.id}, userData)
        await userData.save();


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

    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
}

async function leaderboard (req, res){
    const rankBy = ["totalStreak", "totalTask"];
    try {
        switch (req.body.rankBy) {
            case rankBy[0]:
                res.json(await Model.find({"totalStreak": {$gte: 1} })
                    .sort({"totalStreak": -1 })
                    .limit(3)
                    .map(u => { 
                        return {
                        username: u.username,
                        totalStreak: u.totalStreak
                        }
                    }))
                break;
            case rankBy[1]:
                res.status(200).json(await Model.find({"totalStreak": {$gte: 1} })
                .sort({"totalStreak": -1 })
                .limit(3)
                .map(u => { 
                    return {
                    username: u.username,
                    totalStreak: u.totalStreak
                    }
                }))
                break;
            default:
                throw new Error(`Ranking mode must be one of the following options: [${rankBy}]`)

        }
        
        //todo ranking for users with a tie for same place needs to be done in the frontend
    } catch (err) { res.status(400).json({ message: err.message }) }
}

module.exports = { getUser, postHabit, getHabit, updateHabit, destroyHabit, leaderboard }
