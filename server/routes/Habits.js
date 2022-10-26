const express = require("express");
const router = express.Router();
const habitsController = require("../Controllers/Habits");

//Get User's habits
router.get("/", habitsController.getUser);

//Get by Habit
router.get("/:id", habitsController.getHabit);

//Get all Habit
router.get("/data/all", habitsController.streakChecker);

//Post a habit
router.post("/", habitsController.postHabit);

//Update by ID Method
router.patch("/:id", habitsController.updateHabit);

//Delete by ID Method
router.delete("/:id", habitsController.destroyHabit);

module.exports = router;
