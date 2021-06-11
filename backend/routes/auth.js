const router = require("express").Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth");
const authentication = require("../middleware/authentication");
const registerValidation = require("../middleware/registerValidation");

router.post(
  "/register",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 5 }),
  registerValidation,
  authController.createUser
);
router.post("/login", authController.loginUser);
router.get("/verify", authentication, authController.verifyUser);
router.get("/log-out", authController.logOutUser);

module.exports = router;
