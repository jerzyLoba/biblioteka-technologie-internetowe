const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (user_id, role) =>
  jwt.sign({ user: user_id, role: role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
