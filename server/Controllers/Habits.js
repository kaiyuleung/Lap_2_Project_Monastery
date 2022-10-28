const Model = require("../models/model");
const schedule = require("node-schedule");

async function getUser(req, res) {
	try {
		const userData = await Model.findOne({ username: req.user.name });
		res.status(200).json(userData);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
}



async function getHabit(req, res) {
	try {
		const userData = await Model.findOne({ username: req.user.name });
		const habitData = userData.habits.filter((h) => h._id == req.params.id);
		if (!habitData.length) {
			throw new Error("No matched habit.");
		}
		res.status(200).json(habitData[0]);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}

async function postHabit(req, res) {
	const newHabit = {
		habitName: req.body.habitName,
		target: req.body.target,
		current: req.body.current,
		frequency: req.body.frequency,
		streak: req.body.streak,
		completed: req.body.completed,
	};
	try {
		const userData = await Model.findOne({ username: req.user.name });
		if (userData.habits.some((h) => h.habitName === newHabit.habitName)) {
			throw new Error("Habit already exists.");
		}
		userData.habits.push(newHabit);
		await userData.save();
		res.status(202).json(userData.habits.at(-1));
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
}

async function updateHabit(req, res) {
	try {
		//* Get logged-in user's data
		const userData = await Model.findOne({ username: req.user.name });
		//* Filter user's habits data by ID
		const habitData = userData.habits.filter((h) => h._id == req.params.id);
		//* Error handling for no matched habit
		if (!habitData.length) {
			throw new Error("No matched habit.");
		}

		habitData[0].current += 1;

		//* User Scores Updates
		userData.totalStreak = userData.habits
			.map((h) => h.streak)
			.reduce((r, v) => r + v);

		//* save updated user data
		await userData.save();
		//* send updated habit
		res.status(200).json(habitData[0]);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
}

async function destroyHabit(req, res) {
	try {
		const userData = await Model.findOne({ username: req.user.name });
		const habitDataIdx = userData.habits.findIndex(
			(h) => h._id == req.params.id
		);
		const habitDataName = userData.habits[habitDataIdx].habitName;
		if (habitDataIdx === -1) {
			throw new Error("No matched habit.");
		}
		userData.habits.splice(habitDataIdx, 1);
		await userData.save();
		res.send(`Document with ${habitDataName} has been deleted..`);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}

async function leaderboard(req, res) {
	const rankBy = ["totalStreak", "totalTask"];
	try {
		switch (req.params.mode) {
			case rankBy[0]:
				let data = await Model.find({ totalStreak: { $gte: 1 } })
					.sort({ totalStreak: -1 })
					.limit(5);

                if ( data.length > 0) {
                    res.status(200).json(
                        data.map(u => { 
                            return {
                            username: u.username,
                            score: u.totalStreak
                            }
                        }))
                } else {
                    res.status(204)
                }
                break;
            case rankBy[1]:

                break;
            default:
                throw new Error(`Ranking mode must be one of the following options: [${rankBy}]`)
        }
        
        //todo ranking for users with a tie for same place needs to be done in the frontend
    } catch (err) { res.status(400).json({ message: err.message }) }
}

// ########################################################################
async function dailyChecker(req, res) {
	try {
        console.log("daily checker has ran")
		
		const userData = await Model.find({});
		console.log(userData[0].habits[0].frequency);
		for (let i = 0; i < userData.length; i++) {
			for (let j = 0; j < userData[i].habits.length; j++) {
                if(userData[i].habits[j].frequency.toLowerCase() == "daily"){
                    if (userData[i].habits[j].current >= userData[i].habits[j].target) {
					userData[i].habits[j].streak += 1;
					userData[i].habits[j].current = 0;
					} else {
					userData[i].habits[j].streak = 0;
					userData[i].habits[j].current = 0;
				}
                } 
			}
		}
		await userData.forEach((data) => data.save());
		res.status(200).json({message: "daily habits checked"});
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}

async function weeklyChecker(req, res) {
	try {
        console.log("weekly checker has ran")
		const userData = await Model.find({});
		for (let i = 0; i < userData.length; i++) {
			for (let j = 0; j < userData[i].habits.length; j++) {
                if((userData[i].habits[j].frequency.toLowerCase() == "weekly")) {
                    if (userData[i].habits[j].current >= userData[i].habits[j].target) {
					userData[i].habits[j].streak += 1;
					userData[i].habits[j].current = 0;
					} else {
					userData[i].habits[j].streak = 0;
					userData[i].habits[j].current = 0;
				}
                } 
			}
		}
		await userData.forEach((data) => data.save());
		res.status(200).json(userData);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}

async function monthlyChecker(req, res) {
	try {
        console.log("monthly checker has ran")
		const userData = await Model.find({});
		for (let i = 0; i < userData.length; i++) {
			for (let j = 0; j < userData[i].habits.length; j++) {
                if((userData[i].habits[j].frequency.toLowerCase() == "monthly")) {
                    if (userData[i].habits[j].current >= userData[i].habits[j].target) {
					userData[i].habits[j].streak += 1;
					userData[i].habits[j].current = 0;
					} else {
					userData[i].habits[j].streak = 0;
					userData[i].habits[j].current = 0;
				}
                } 
			}
		}
		await userData.forEach((data) => data.save());
		res.status(200).json(userData);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
}



const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.tz = "Europe/Belfast";
schedule.scheduleJob(rule, async function () {
	await fetch(`http://localhost:3001/habits/data/all`, {
		method: "GET",
		headers: {
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjY3ODEyMTV9.mURhBMZXogpiq2MaVhBF25DksH2JW3KGfJKwXN_ZN_M`,
		},
	});
});

const rule2 = new schedule.RecurrenceRule();
rule2.dayOfWeek = 0;
rule2.hour = 0;
rule2.minute = 0;
rule2.tz = "Europe/Belfast";
schedule.scheduleJob(rule2, async function () {
	await fetch(`http://localhost:3001/habits/data/allWeeks`, {
		method: "GET",
		headers: {
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjY3ODEyMTV9.mURhBMZXogpiq2MaVhBF25DksH2JW3KGfJKwXN_ZN_M`,
		},
	});
});

const rule3 = new schedule.RecurrenceRule();
rule3.month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
rule3.date = 0;
rule3.hour = 0;
rule3.minute = 0;
rule3.tz = "Europe/Belfast";
schedule.scheduleJob(rule3, async function () {
	await fetch(`http://localhost:3001/habits/data/allMonths`, {
		method: "GET",
		headers: {
			Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjY3ODEyMTV9.mURhBMZXogpiq2MaVhBF25DksH2JW3KGfJKwXN_ZN_M`,
		},
	});
});

module.exports = {
	getUser,
	postHabit,
	getHabit,
	updateHabit,
	destroyHabit,
	leaderboard,
	dailyChecker,
    weeklyChecker,
    monthlyChecker
};
