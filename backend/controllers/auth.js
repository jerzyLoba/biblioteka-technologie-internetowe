const bcrypt = require("bcrypt");
const pool = require("../config/db");
const genJwt = require("../utils/generateJwt");

const createUser = async (req, res) => {
  try {
    //TODO dodac check na undefined oraz porownanie password==password2
    const { name, email, password, password2 } = req.body;
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (users.rows.length !== 0) {
      return res.status(401).send("Użytkownik istnieje");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    const token = genJwt(newUser.rows[0].id, newUser.rows[0].role);
    res.cookie("token", token, { httpOnly: true });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ valid: false, message: "Niepoprawne dane logowania" });
    }

    const isPassValid = await bcrypt.compare(password, user.rows[0].password);

    if (!isPassValid) {
      return res
        .status(401)
        .json({ valid: false, message: "Email lub haslo jest niepoprawne" });
    }

    const token = genJwt(user.rows[0].id, user.rows[0].role);
    res.cookie("token", token, { httpOnly: true });
    return res.json({ valid: true, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

const verifyUser = async (req, res) => {
  try {
    res.json({ role: req.role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

const logOutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json("cookie deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};
// const updateUser = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { title, isbn, author } = req.body;
//   pool.query(
//     "UPDATE books SET title = $1, isbn = $2, author = $3 WHERE id = $4",
//     [title, isbn, author, id],
//     (err, results) => {
//       if (err) {
//         throw err;
//       }
//       res.status(200).send(`Book with id ${id} updated`);
//     }
//   );
// };

// const deleteBook = (req, res) => {
//   const id = parseInt(req.params.id);
//   pool.query("DELETE FROM books WHERE id = $1", [id], (err, results) => {
//     if (err) {
//       throw err;
//     }
//     res.status(200).send(`Book with id ${id} deleted`);
//   });
// };

module.exports = {
  createUser,
  loginUser,
  verifyUser,
  logOutUser,
};
