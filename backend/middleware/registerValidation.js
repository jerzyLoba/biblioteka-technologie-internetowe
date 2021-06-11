const { validationResult } = require("express-validator");

module.exports = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (errors.isEmpty()) {
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    console.error(err.message);
    res.status(403).json(errors);
  }
};
