const pool = require("./db.model");

const userModel = {
  addUser: async (user) => {
    try {
      const query =
        "INSERT INTO users (email, hashPassword, groupCode) VALUES ($1, $2, $3) RETURNING id";
      const values = [user.email, user.hashPassword, user.groupCode];
      const result = await pool.query(query, values);
      const insertedUserId = result.rows[0].id;
      return insertedUserId;
    } catch (error) {
      console.error("Error adding user:", error);
      throw error;
    }
  },

  updateUser: (hashPassword, groupCode, id) => {
    console.log(groupCode, id, hashPassword);
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE users SET hashPassword = $1, groupCode = $2 WHERE id = $3`,
        [hashPassword, groupCode, id],
        (err, results) => {
          if (err) {
            reject(err);
            console.log(err);
          } else {
            resolve(results);
          }
        }
      );
    });
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      pool.query(`DELETE FROM users WHERE id = $1`, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = userModel;
