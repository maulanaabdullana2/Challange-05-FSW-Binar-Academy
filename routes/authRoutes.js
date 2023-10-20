const router = require("express").Router();
const auth = require("../controllers/authController");
const authenticate = require("../middlewares/authenthicate");
router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/me", authenticate, auth.currentuser);

module.exports = router;
