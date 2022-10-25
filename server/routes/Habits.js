const express = require('express');
const router = express.Router();
const habitsController = require('../Controllers/Habits');

//Post Method
router.post('/post', habitsController.post )

//Get all Method
router.get('/getAll', habitsController.getAll)

//Get by ID Method
// router.get('/getOne/:id', async (req, res) => {
//     try{
//         const data = await Model.findById(req.params.id);
//         res.json(data)

//     }
//     catch(error){
//         res.status(500).json({message: error.message})
//     }
// })

//Get by ID Method
router.get('/getUserHabits', habitsController.getOne)

//Get by Habit
router.get('/getUserHabits/:id', habitsController.getHabit)

//Update by ID Method
router.patch('/update/:id', habitsController.update)

//Delete by ID Method
router.delete('/delete/:id', habitsController.destroy)

module.exports = router;
