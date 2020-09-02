const pool = require("../database/index.js");

module.exports = {
  readProductList: (count, callback) => {
    const queryStr = "SELECT * FROM products LIMIT $1";
    pool.connect().then((client) => {
      return client
        .query(queryStr, [count])
        .then((res) => {
          callback(null, res.rows);
          client.release();
        })
        .catch((err) => {
          callback(err, null);
          client.release();
          console.log(err.stack);
        });
    });
  },

  readOneProduct: async (id, callback) => {
    const queryStr1 = `SELECT
    id,
    name,
    slogan,
    description,
    category,
    default_price
    FROM products
    WHERE id= $1`;
    const queryStr2 = `SELECT
    feature,
    value
    FROM features
    WHERE product_id= $1`;
    const client = await pool.connect();
    try {
      const productData = client.query(queryStr1, [id]);
      const featureData = client.query(queryStr2, [id]);
      const promisedData = await Promise.all([productData, featureData]);
      if (promisedData[0].rows) {
        const result = promisedData[0].rows[0];
        result.features = promisedData[1].rows;
        callback(null, result);
      }
    } catch (err) {
      callback(err, null);
      console.log(err);
    } finally {
      client.release();
    }
  },

  readStyles: async (id, callback) => {
    const queryStrStyle = `SELECT
    id,
    name,
    original_price,
    sale_price,
    default_style
    FROM styles
    WHERE product_id = $1`;
    const queryStrPhotos = `SELECT
    style_id,
    thumbnail_url,
    url
    FROM photos
    JOIN styles
    ON
    photos.style_id = styles.id
    WHERE styles.product_id = $1`;
    const queryStrSkus = `SELECT
    style_id,
    size,
    quantity
    FROM skus
    JOIN styles
    ON
    skus.style_id = styles.id
    WHERE styles.product_id = $1`;
    const client = await pool.connect();
    try {
      const styleData = client.query(queryStrStyle, [id]);
      const photosData = client.query(queryStrPhotos, [id]);
      const skusData = client.query(queryStrSkus, [id]);
      const promisedData = await Promise.all([styleData, photosData, skusData]);
      const [styles, photos, skus] = promisedData;
      if (styles.rows) {
        const result = {
          product_id: id,
          results: styles.rows,
        };

        const skusByStyle = {};
        const photosByStyle = {};

        if (photos.rows) {
          for (let i = 0; i < photos.rows.length; i++) {
            let id = photos.rows[i].style_id;
            delete photos.rows[i].style_id;
            if (photosByStyle[id]) {
              photosByStyle[id].push(photos.rows[i]);
            } else {
              photosByStyle[id] = [photos.rows[i]];
            }
          }
        }
        if (skus.rows) {
          for (let i = 0; i < skus.rows.length; i++) {
            let id = skus.rows[i].style_id;
            let key = skus.rows[i].size;
            let value = skus.rows[i].quantity;
            if (skusByStyle[id]) {
              skusByStyle[id][key] = value;
            } else {
              skusByStyle[id] = {};
              skusByStyle[id][key] = value;
            }
          }
        }
        for (let i = 0; i < result.results.length; i++) {
          result.results[i].style_id =  result.results[i].id
          delete result.results[i].id
          result.results[i]['default?']=  result.results[i].default_style
          delete result.results[i].default_style
          let id = result.results[i].style_id
          if (photosByStyle.hasOwnProperty(id)) {
            result.results[i].photos = photosByStyle[id];
          }
          if (skusByStyle.hasOwnProperty(id)) {
            result.results[i].skus = skusByStyle[id];
          }
        }
        callback(null, result);
      }
    } catch (err) {
      callback(err, null);
      console.log(err);
    } finally {
      client.release();
    }
  },

  readRelated: (id, callback) => {
    const queryStr =
      "SELECT related_products_id from related WHERE product_id= $1";
    pool.connect().then((client) => {
      return client
        .query(queryStr, [id])
        .then((res) => {
          client.release();
          let result = res.rows.map((e) => {
            return e.related_products_id;
          });
          callback(null, result);
        })
        .catch((err) => {
          client.release();
          callback(err, null);
          console.log(err.stack);
        });
    });
  },
};
