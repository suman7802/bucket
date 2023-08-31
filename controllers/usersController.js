const bcrypt = require("bcryptjs");

const userModel = require("../models/users.model");

const usersController = {
  updateUser: async (req, res) => {
    const id = req.user.id;
    const password = req.body.password;
    const groupCode = req.body.groupCode;
    const hashPassword = bcrypt.hashSync(password, 10);

    userModel
      .updateUser(hashPassword, groupCode, id)
      .then((userId) => {
        return res
          .status(200)
          .json({message: "User update successfully.", userId: userId});
      })
      .catch((err) => {
        return res.status(500).json({error: err});
      });
  },

  deleteUser: (req, res) => {
    const id = req.user.id;
    userModel
      .deleteUser(id)
      .then((userId) => {
        return res
          .status(200)
          .json({message: "User deleted successfully.", userId: userId});
      })
      .catch((err) => {
        return res.status(500).json({error: err});
      });
  },
};

module.exports = usersController;
