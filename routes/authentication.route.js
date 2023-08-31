const authenticationRoute = require("express").Router();
const authenticationController = require("../controllers/authenticationController");

authenticationRoute.post("/login", authenticationController.login);
authenticationRoute.post("/registration",authenticationController.registration);

module.exports = authenticationRoute;
