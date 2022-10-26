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

router.get("/leaderboard", habitsController.leaderboard);

//Get all Habit
router.get("/data/all", habitsController.streakChecker);

module.exports = router;
