const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 4000;
//TODO dodac middleware do weryfikacji maila
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/auth", require("./routes/auth"));
app.use("/books", require("./routes/booksApi"));
app.use("/transactions", require("./routes/bookTransactions"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/users", require("./routes/users"));

app.listen(port, () => {
  console.log(`Server running on ${port} port`);
});
