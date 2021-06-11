const router = require("express").Router();
const bookTransactions = require("../controllers/bookTransactions");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router.get(
  "/get-profile",
  authentication,
  bookTransactions.getProfileTransactionList
);
router.get(
  "/get-user/:id",
  authentication,
  authorization,
  bookTransactions.getUserTransactionList
);
router.get(
  "/get-book/:id",
  authentication,
  authorization,
  bookTransactions.getBookTransactionList
);
router.get("/borrow/:id", authentication, bookTransactions.borrowBook);
router.post(
  "/return/:id",
  authentication,
  authorization,
  bookTransactions.returnBook
);

module.exports = router;
