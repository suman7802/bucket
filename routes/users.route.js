const userRoutes = require("express").Router();
const usersController = require("../controllers/usersController.js");

userRoutes.put("/updateUser", usersController.updateUser);
userRoutes.delete("/deleteUser", usersController.deleteUser);

module.exports = userRoutes;
