const express = require('express');
const { model } = require('mongoose');
const Model = require('../models/Model');

const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
    // console.log("req.body.username:", req.body.username)
    // console.log("req.body.habits:", req.body.habits[0])
    const data = new Model({
        username: req.body.username,
        habits: req.body.habits
    })
    try {
        // const dataToSave = await data.save();
        // // console.log("dataToSave", dataToSave)
        // // console.log("data", data)
        // res.status(200).json(dataToSave)
        const newHabit = await Model.create(req.body);
        res.status(201).json({ result: newHabit });
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)

    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    console.log("update route running")
    // const id = req.params.id;
    // const updatedData = req.body;
    // const options = { new: true };

    try {
        
        let data = await Model.findById(req.params.id);
        const newData = data.habits.map(
            data => {data.pray.current += 1;
            return data})
        const pleaseUpdate = await Model.findByIdAndUpdate(req.params.id, data)
        console.log(newData)
        // await data.habits[0].pray.current + 1;
        // console.log(data.habits[0].pray.current +1)
        res.send(pleaseUpdate)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
