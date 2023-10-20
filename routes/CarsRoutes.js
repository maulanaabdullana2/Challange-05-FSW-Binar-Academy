const router = require("express").Router();

const Product = require("../controllers/carsController");
const upload = require("../middlewares/upload");
const checkRole = require("../middlewares/checkRole");
const authenticate = require("../middlewares/authenthicate");

router.get("/", authenticate, Product.findProducts);
router.patch(
  "/:id",
  authenticate,
  checkRole("Super Admin", "Admin"),
  authenticate,
  upload.single("image"),
  Product.editcars
);
router.get("/:id", Product.findcarsByID);
router.delete(
  "/:id",
  authenticate,
  checkRole("Super Admin", "Admin"),
  Product.deletecars
);
router.post(
  "/",
  authenticate,
  checkRole("Super Admin", "Admin"),
  upload.single("image"),
  Product.createCars
);
module.exports = router;
