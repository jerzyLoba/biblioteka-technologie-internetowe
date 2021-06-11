const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({ message: "Not authenticated" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload.user;
    req.role = payload.role;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(403).json({
      message: "Not authenticated",
    });
  }
};
