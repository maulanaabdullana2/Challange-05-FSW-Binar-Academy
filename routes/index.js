const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../docs/swagger.json");

router.use("/api-docs", swaggerUI.serve);
router.use("/api-docs", swaggerUI.setup(swaggerDocument));

const Product = require("./CarsRoutes");
const auth = require("./authRoutes");
const Admin = require("./adminRoutes");

router.use("/api/v1/cars", Product);
router.use("/api/v1/member", auth);
router.use("/api/v1/admin", Admin);

module.exports = router;
