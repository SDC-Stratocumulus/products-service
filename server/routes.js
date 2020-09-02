const router = require("express").Router();
const {
  getProductsList,
  getOneProduct,
  getStyles,
  getRelated,
} = require('./controllers.js');

router.get("/list", getProductsList);
router.get("/:product_id", getOneProduct);
router.get("/:product_id/styles", getStyles);
router.get("/:product_id/related", getRelated);

module.exports = router;
