const router = require("express").Router();
const authController = require("../controllers/auth");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const userController = require("../controllers/users");

router.post("/register", authController.createUser);
router.post("/login", authController.loginUser);
router.get("/verify", authentication, authController.verifyUser);
router.get("/log-out", authController.logOutUser);

module.exports = router;
