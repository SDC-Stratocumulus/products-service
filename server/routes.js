const router = require("express").Router();
const {
  getProductsList,
  getOneProduct,
  getStyles,
  getRelated,
} = require('./controllers.js');

router.get("/products/list", getProductsList);
router.get("/products/:product_id", getOneProduct);
router.get("/products/:product_id/styles", getStyles);
router.get("/products/:product_id/related", getRelated);

module.exports = router;
