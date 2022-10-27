const express = require("express");
const router = express.Router();
const habitsController = require("../Controllers/Habits");

//Get User's habits
router.get("/user", habitsController.getUser);

//Get by Habit
router.get("/user/:id", habitsController.getHabit);

//Post a habit
router.post("/user", habitsController.postHabit);

//Update by ID Method
router.patch("/user/:id", habitsController.updateHabit);

//Delete by ID Method
router.delete("/user/:id", habitsController.destroyHabit);

// Get leaderboard
router.get("/leaderboard/:mode", habitsController.leaderboard);

//Get all Habit
router.get("/data/all", habitsController.dailyChecker);

//Get all Habit
router.get("/data/allWeeks", habitsController.weeklyChecker);

//Get all Habit
router.get("/data/allMonths", habitsController.monthlyChecker);

module.exports = router;
