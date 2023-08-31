const pool = require("./db.model");

const bucketModel = {
  createBucket: (bucket) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO buckets (price, description, userId) VALUES ($1, $2, $3)";
      const values = [bucket.price, bucket.description, bucket.userId];
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
        "UPDATE buckets SET price = $1, description = $2 WHERE id = $3 AND userId = $4";
      const values = [
        bucket.price,
        bucket.description,
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
