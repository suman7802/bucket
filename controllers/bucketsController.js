const bucketModel = require("../models/buckets.model");
const bucketsController = {
  addBucket: async (req, res) => {
    const userId = req.user.id;
    const bucket = {
      userId,
      ...req.body,
    };
    bucketModel
      .createBucket(bucket)
      .then((result) => {
        return res.status(201).json({respond: result});
      })
      .catch((err) => {
        return res.status(500).json({error: err});
      });
  },

  getAllBuckets: async (req, res) => {
    const userId = req.user.id;
    try {
      const buckets = await bucketModel.getAllBuckets(userId);
      return res.status(200).json({buckets: buckets});
    } catch (err) {
      return res.status(500).json({error: err});
    }
  },

  updateBucket: async (req, res) => {
    const userId = req.user.id;
    const bucket = {
      userId,
      ...req.body,
    };
    bucketModel
      .updateBucket(bucket)
      .then((result) => {
        return res.status(201).json({respond: result});
      })
      .catch((err) => {
        return res.status(500).json({error: err});
      });
  },

  deleteBucket: async (req, res) => {
    const userId = req.user.id;
    const bucket = {
      userId,
      ...req.body,
    };

    return await bucketModel
      .deleteBucket(bucket)
      .then((result) => {
        return res.status(200).json({respond: result});
      })
      .catch((err) => {
        return res.status(500).json({error: err});
      });
  },
};

module.exports = bucketsController;
