const bucketsRoutes = require("express").Router();
const bucketsController = require("../controllers/bucketsController.js");

bucketsRoutes.post("/addBucket", bucketsController.addBucket);
bucketsRoutes.get("/getBuckets", bucketsController.getAllBuckets);
bucketsRoutes.put("/editBucket", bucketsController.updateBucket);
bucketsRoutes.delete("/deleteBucket", bucketsController.deleteBucket);

module.exports = bucketsRoutes;
