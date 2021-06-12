const pool = require("../config/db");

const getProfileTransactionList = async (req, res) => {
  try {
    const { user } = req;

    const userTransactions = await pool.query(
      "SELECT b.title, bb.user_id, bb.date_of_rental, bb.date_of_return FROM borrowed_books bb, books b WHERE user_id = $1 AND b.id = bb.book_id",
      [user]
    );

    res.status(200).json({
      history: userTransactions.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

const getUserTransactionList = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);

    const userInfo = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [userId]
    );
    const userTransactions = await pool.query(
      "SELECT * FROM borrowed_books WHERE user_id = $1",
      [userId]
    );

    res.status(200).json({
      user_info: userInfo.rows[0],
      history: userTransactions.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

const getBookTransactionList = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const bookTransactions = await pool.query(
      "SELECT * FROM borrowed_books WHERE book_id = $1",
      [id]
    );

    res.status(200).json({
      history: bookTransactions.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

const borrowBook = async (req, res) => {
  try {
    const { user } = req;
    const book_id = parseInt(req.params.id);

    const isBookAvail = await pool.query(
      "SELECT returned FROM books WHERE id = $1",
      [book_id]
    );

    if (!isBookAvail.rows[0].returned) {
      return res.status(409).send("Książka została już wypożyczona");
    }

    const userBorrowedBooks = await pool.query(
      "SELECT * FROM borrowed_books WHERE user_id = $1 AND returned = FALSE",
      [user]
    );

    const hasUserExceededLimit = userBorrowedBooks.rowCount > 0;

    if (hasUserExceededLimit) {
      return res.status(409).send("Przekroczyłeś limit książek!");
    }

    const transaction = await pool.query(
      "INSERT INTO borrowed_books (book_id, user_id) VALUES ($1, $2) RETURNING *",
      [book_id, user]
    );

    const book = await pool.query(
      "UPDATE books SET returned = FALSE WHERE id = $1 RETURNING *",
      [book_id]
    );

    res.json({ transaction, book, message: "ksiazka zostala wypozyczona" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

const returnBook = async (req, res) => {
  try {
    const { user_id } = req.body;
    const book_id = parseInt(req.params.id);

    if (!user_id) {
      return res.status(400).send("user not provided");
    }

    const borrowedBookQuery = await pool.query(
      "SELECT id FROM borrowed_books WHERE book_id = $1 AND user_id = $2 ORDER BY id DESC",
      [book_id, user_id]
    );
    const transactionId = borrowedBookQuery.rows[0].id;

    const result = await pool.query(
      "UPDATE borrowed_books SET returned = TRUE, date_of_return = now() WHERE id = $1 RETURNING *",
      [transactionId]
    );

    const book = await pool.query(
      "UPDATE books SET returned = TRUE WHERE id = $1 RETURNING *",
      [book_id]
    );

    res.status(200).send(`book with id ${book.rows[0].id} returned`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  getProfileTransactionList,
  getUserTransactionList,
  getBookTransactionList,
  borrowBook,
  returnBook,
};
