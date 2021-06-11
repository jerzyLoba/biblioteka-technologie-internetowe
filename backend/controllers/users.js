const pool = require("../config/db");

const getUsers = async (req, res) => {
  try {
    const userInfo = await pool.query("SELECT name, email, id FROM users");

    res.status(200).json({
      user_info: userInfo.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getUsers,
};
