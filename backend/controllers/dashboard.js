const pool = require("../config/db");

const getInfo = async (req, res) => {
  try {
    const user = await pool.query("SELECT name FROM users WHERE id = $1", [
      req.user,
    ]);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getInfo,
};
