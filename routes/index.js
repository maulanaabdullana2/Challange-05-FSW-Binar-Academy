const router = require("express").Router();

const Product = require("./CarsRoutes");
const auth = require("./authRoutes");

router.use("/api/v1/cars", Product);
router.use("/api/v1/member", auth);

module.exports = router;
