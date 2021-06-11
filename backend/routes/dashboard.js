const router = require("express").Router();
const dashboardController = require("../controllers/dashboard");
const authentication = require("../middleware/authentication");

router.get("/", authentication, dashboardController.getInfo);

module.exports = router;
