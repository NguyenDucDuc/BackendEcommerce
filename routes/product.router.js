const productController = require("../controllers/product.controller");
const reviewController = require("../controllers/review.controller");
const auth = require("../middlewares/auth.middleware");

const router = require("express").Router();

router.get("/:id", productController.getProductByID);
router.get("", productController.getProductByKw);
router.post('', auth.verifyAddProduct, productController.addProduct);
router.delete(
  "/:productId",
  auth.verifyDeleteAndUpdateProduct,
  productController.deleteProduct
);
router.put(
  "/:productId",
  auth.verifyDeleteAndUpdateProduct,
  productController.updateProduct
);
router.post("/compare", productController.compareProduct);
router.get("/:id/rate-product", reviewController.countRateOfProduct);
router.get("/:id/reviews", reviewController.getReviewByProductId);

module.exports = router;
