const pool = require("../config/db");
//TODO dodac role uzytkownikow na usuwanie i updoot
const getBooks = (req, res) => {
  pool.query("SELECT * FROM books", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ books: results.rows });
  });
};

const getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM books WHERE books.id = $1",
    [id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).json(results.rows[0]);
    }
  );
};

const createBook = (req, res) => {
  const { title, isbn, author } = req.body;
  pool.query(
    "INSERT INTO books (title, isbn, author) VALUES ($1, $2, $3)",
    [title, isbn, author],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).send(`Book created.`);
    }
  );
};

const updateBook = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, isbn, author } = req.body;
  pool.query(
    "UPDATE books SET title = $1, isbn = $2, author = $3 WHERE id = $4",
    [title, isbn, author, id],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send(`Ksiązka zaktualizowana`);
    }
  );
};

const deleteBook = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("DELETE FROM books WHERE id = $1", [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).send(`Ksiazka została usunięta`);
  });
};

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
