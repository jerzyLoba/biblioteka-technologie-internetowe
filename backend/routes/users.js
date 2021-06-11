const router = require("express").Router();
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const userController = require("../controllers/users");

router.get(
  "/get-users/",
  authentication,
  authorization,
  userController.getUsers
);

module.exports = router;
