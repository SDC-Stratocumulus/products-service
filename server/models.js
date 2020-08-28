const db = require("../database/index.js");

module.exports = {
  readProductList: (params) => {
    const queryStr = `SELECT
    p.id
    p.product_name
    p.slogan
    p.product_descr
    c.category_name
    s.price
    FROM products p
    INNER JOIN categories c
    ON (c.category_id = p.category_id)
    INNER JOIN styles s
    ON (s.product_id = p.id AND s.default = "1")`;
    return db
      .then((client) => {
        return client.query(queryStr);
      })
      .catch((err) => {
        console.log("errFromreadProductList: ", err);
      });
  },
  readOneProduct: (id) => {
    const queryStr = `SELECT
    p.id
    p.product_name
    p.slogan
    p.product_descr
    c.category_name
    s.price
    f.feature_name
    f.feature_value
    FROM products p where p.id=?
    INNER JOIN categories c
    ON (c.category_id = p.category_id)
    INNER JOIN styles s
    ON (s.product_id = p.id AND s.default = "1")
    INNER JOIN features f
    ON (p.id = f.product_id)`;
    return db
      .then((client) => {
        return client.query(queryStr);
      })
      .catch((err) => {
        console.log("errFromreadOneProduct: ", err);
      });
  },
  readStyles: (id) => {
    const queryStr = `SELECT * FROM styles WHERE product_id = ?
    INNER JOIN photos
    ON (photos.style_id = styles.id)
    INNER JOIN skus
    ON (skus.style_id = styles.id)`;
    return db
      .then((client) => {
        return client.query(queryStr);
      })
      .catch((err) => {
        console.log("errFromreadStyles: ", err);
      });
  },
  readRelated: (id) => {
    const queryStr = "SELECT related_products from products WHERE id=?";
    return db
      .then((client) => {
        return client.query(queryStr);
      })
      .catch((err) => {
        console.log("errFromreadRelated: ", err);
      });
  },
};
