const pool = require("./db.model");

const bucketModel = {
  createBucket: (bucket) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO buckets (price, description, date, userId) VALUES ($1, $2, $3, $4)";
      const values = [
        bucket.price,
        bucket.description,
        bucket.date,
        bucket.userId,
      ];
      pool.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getAllBuckets: (userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM buckets WHERE userId = $1`,
        [userId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },

  updateBucket: (bucket) => {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE buckets SET price = $1, description = $2, updateDate = $3 WHERE id = $4 AND userId = $5";
      const values = [
        bucket.price,
        bucket.description,
        bucket.updateDate,
        bucket.id,
        bucket.userId,
      ];
      pool.query(query, values, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteBucket: (bucket) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM buckets WHERE id = $1 AND userId = $2`,
        [bucket.id, bucket.userId],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        }
      );
    });
  },
};

module.exports = bucketModel;
