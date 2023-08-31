require("dotenv").config();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const userModel = require("../models/users.model");
const existing = require("../utils/existing.user");

const authenticationController = {
  registration: async (req, res) => {
    const tempEmail = req.body.email;
    const tempPassword = req.body.password;
    const tempGroupCode = req.body.groupCode;

    const email = await existing.email(tempEmail);
    const groupCode = await existing.groupCode(tempGroupCode);

    if (email) {
      return res.status(404).json({error: "email already exist"});
    }

    if (groupCode) {
      console.log("Joined on existing group");
    }

    if (!email) {
      const hashedPassword = bcrypt.hashSync(tempPassword, 10);
      const newUser = {
        email: tempEmail,
        hashPassword: hashedPassword,
        groupCode: tempGroupCode,
      };

      userModel
        .addUser(newUser)
        .then((userId) => {
          return res
            .status(201)
            .json({message: "User added successfully.", userId: userId});
        })
        .catch((err) => {
          return res.status(500).json({error: err});
        });
    }
  },

  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await existing.email(email);

    if (!user) {
      return res.status(404).json({error: "user not found"});
    }

    let passwordMatch = await bcrypt.compare(password, user.hashpassword);

    if (!passwordMatch) {
      return res.status(400).json({error: "Invalid credentials"});
    }

    const accessToken = JWT.sign(user.email, process.env.JWT_SECRET);

    try {
      return res
        .cookie("access-token-04", accessToken, {
          secure: false,
          Path: "*",
        })
        .status(200)
        .json({message: "Login successful"});
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  },
};

module.exports = authenticationController;
