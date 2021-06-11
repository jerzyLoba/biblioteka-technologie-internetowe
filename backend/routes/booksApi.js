const router = require("express").Router();
const books = require("../controllers/books");
const authorization = require("../middleware/authorization");
const authentication = require("../middleware/authentication");

router.get("/", books.getBooks);
router.get("/:id", books.getBookById);
router.post("/create", authentication, authorization, books.createBook);
router.put("/update/:id", authentication, authorization, books.updateBook);
router.delete("/delete/:id", authentication, authorization, books.deleteBook);

module.exports = router;
