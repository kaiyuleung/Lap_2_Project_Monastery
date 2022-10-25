const Model = require('../models/Model');

async function post (req, res) {
    // console.log("req.body.username:", req.body.username)
    // console.log("req.body.habits:", req.body.habits[0])
    const data = new Model({
        username: req.body.username,
        habits: req.body.habits
    })
    // console.log("user", req.body.username)
    console.log(req.body.habits)

    try {
        
        // const dataToSave = await data.save();
        // // console.log("dataToSave", dataToSave)
        // // console.log("data", data)
        // res.status(200).json(dataToSave)
        const newHabit = await Model.create(data);
        // console.log("req body", req.body)
        // console.log("new habit", newHabit)
        // console.log("model"),
        res.status(201).json({ result: newHabit });
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
}

async function getAll (req, res) {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

async function getOne (req, res) {
    console.log("req user form getOne:", req.user.name)
    try{
        const data = await Model.find({username: req.user.name});
        res.json(data)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

async function getHabit (req, res) {
    console.log("getHabit working", req.params.id)
    try{
        const data = await Model.find({username: req.user.name});
        const newData = data[0].habits.filter(h => {
            return h._id == req.params.id
        }) 
        console.log(newData)
        res.json(data)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

async function update (req, res) {
    console.log("update route running")
    try {
        let data = await Model.find({username: req.user.name});
        let newData = data[0].habits.filter(h => {
            return h._id == req.params.id
        })
        let userID = data[0].id
        newData[0].current += 1
        await Model.updateOne({_id: userID}, data[0])
    res.json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

async function destroy (req, res) {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = { post, getAll, getOne, getHabit, update, destroy }
