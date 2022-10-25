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
    console.log(req.user)
    try{
        const data = await Model.find({username: req.user});
        res.json(data)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

async function update (req, res) {
    console.log("update route running")
    // const id = req.params.id;
    // const updatedData = req.body;
    // const options = { new: true };
    try {
        let data = await Model.findById(req.params.id);
        const newData = data.habits.map(
            // data => {console.log(data)}
            data => {data.pray.current += 1;
            return data}
            )
        const pleaseUpdate = await Model.findByIdAndUpdate(req.params.id, data)
        console.log(newData)
        // await data.habits[0].pray.current + 1;
        // console.log(data.habits[0].pray.current +1)
        res.send(pleaseUpdate)
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

module.exports = { post, getAll, getOne, update, destroy }
