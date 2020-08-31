const { db } = require("../database/index.js");

module.exports = {
  readProductList: (params) => {
    const queryStr = `SELECT * FROM products`;

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
    p.category
    p.default_price
    f.feature_name
    f.feature_value
    FROM products p where p.id=?
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
    const queryStr = `SELECT
    s.style_name
    s.price
    s.sale_price
    s.default_style
    p.thumbnail_url
    p.full_size_url
    u.size
    u.quantity
    FROM styles s WHERE product_id = ?
    INNER JOIN photos p
    ON (photos.style_id = styles.id)
    INNER JOIN skus u
    ON (skus.style_id = styles.id)`;
    return db
      .then((client) => {
        return client.query(queryStr);
      })
      .catch((err) => {
        console.log("errFromreadStyles: ", err);
      });
  },
  readRelated: (id, callback) => {
    console.log(id);
    const queryStr =
      `SELECT related_products_id from related WHERE product_id=${id}`;
    db.query(queryStr, id, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        callback(null, data);
      }
    });
  },
};
