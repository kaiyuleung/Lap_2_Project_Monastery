const express = require("express");
const router = express.Router();
const usersController = require("../Controllers/User");

router.route("/").post(usersController.addNewUser);
router.route("/login").post(usersController.userLogin);

module.exports = router;
