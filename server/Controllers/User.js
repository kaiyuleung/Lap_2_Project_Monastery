const userModel = require("../models/User");
const Model = require('../models/model');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
	try {
		const users = await userModel.find({});
		res.status(200).json({ result: users });
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

const addNewUser = async (req, res) => {
	try {
		// Hash Password
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		// Create new User
		const userHabits = await Model.create({	
			username: req.body.username,
			habits: [
				{"habitName": "Pray"},
				{"habitName": "exercise"},
				{"habitName": "Meditation"},
				{"habitName": "water_consumption"},
				{"habitName": "eat_veggies"},
				{"habitName": "sleep"}
			]
		})
		const newUser = await userModel.create({
			username: req.body.username,
			password: hashedPassword,
			habitsID: userHabits._id
		});

		res.status(201).json({ result: newUser });
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

const userLogin = async (req, res) => {
	const { username, password } = req.body;
	// Look for user
	const User = await userModel.find({ username });
	if (!User.length) {
		return res.status(400).json("Cannot find user");
	}
	try {
		// Check Password
		if (await bcrypt.compare(password, User[0].password)) {
			// JWT
			const user = { name: username };
			const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
			res.status(200).json({ accessToken: accessToken, habitsID: User[0].habitsID });
		} else {
			res.status(401).json("Not Allowed! Password does not match.");
		}
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

module.exports = { getUsers, addNewUser, userLogin };
