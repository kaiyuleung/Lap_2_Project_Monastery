const userModel = require("../Schema/User");
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
		const newUser = await userModel.create({
			username: req.body.username,
			password: hashedPassword,
		});
		res.status(201).json({ result: newUser });
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

const userLogin = async (req, res) => {
	const { username, password } = req.body;
	// Look for user
	const user = await userModel.find({ username });
	if (!user.length) {
		return res.status(400).send("Cannot find user");
	}
	try {
		// Check Password
		if (await bcrypt.compare(password, user[0].password)) {
			// JWT
			const user = { name: username };
			const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
			res.status(200).json({ accessToken: accessToken });
		} else {
			res.status(401).send("Not Allowed! Password does not match.");
		}
	} catch (error) {
		res.status(404).json({ msg: error.message });
	}
};

module.exports = { getUsers, addNewUser, userLogin };
