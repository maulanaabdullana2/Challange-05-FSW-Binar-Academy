const router = require("express").Router();
const authadmin = require("../controllers/authController");
const authenticate = require("../middlewares/authenthicate");
router.post("/login", authadmin.login);
router.post("/register", authenticate, authadmin.register);

module.exports = router;
