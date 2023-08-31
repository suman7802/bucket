const pool = require("../models/db.model");

const existing = {
  email: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (err, result) => {
          if (err) reject(err);
          else {
            const userExists = result.rows.length > 0;
            resolve(userExists ? result.rows[0] : null);
          }
        }
      );
    });
  },

  groupCode: (groupCode) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM users WHERE groupCode = $1`,
        [groupCode],
        (err, result) => {
          if (err) reject(err);
          else {
            const groupExists = result.rows.length > 0;
            resolve(groupExists ? result.rows[0] : null);
          }
        }
      );
    });
  },
};

module.exports = existing;
