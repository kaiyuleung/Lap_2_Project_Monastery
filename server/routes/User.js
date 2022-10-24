const express = require("express");
const Router = express.Router();
const { getUsers, addNewUser, userLogin } = require("../Controllers/User");

Router.route("/").get(getUsers).post(addNewUser);
Router.route("/login").post(userLogin);

module.exports = Router;
