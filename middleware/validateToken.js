require("dotenv").config();
const existing = require("../utils/existing.user");
const JWT = require("jsonwebtoken");

async function validateToken(req, res, next) {
  const accessToken = req.cookies["access-token-04"];
  if (!accessToken) {
    return res.status(400).json({error: "NOT Authenticated"});
  }
  try {
    const userData = JWT.verify(accessToken, process.env.JWT_SECRET);
    if (userData) {
      const user = await existing.email(userData);
      req.user = user;
      next();
    }
  } catch (err) {
    return res.status(500).json({error: err});
  }
}

module.exports = validateToken;
