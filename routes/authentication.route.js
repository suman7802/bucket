const authenticationRoute = require("express").Router();
const authenticationController = require("../controllers/authenticationController");
const googleRouter = require("../services/google.auth");

authenticationRoute.use("/", googleRouter);
authenticationRoute.post("/login", authenticationController.login);
authenticationRoute.post("/registration", authenticationController.registration);

module.exports = authenticationRoute;
