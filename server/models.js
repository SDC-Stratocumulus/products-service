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
    product_name,
    slogan,
    product_descr,
    category,
    default_price
    FROM products
    WHERE id= $1`;
    const queryStr2 = `SELECT
    feature_name,
    feature_value
    FROM features
    WHERE product_id= $1`;
    const client = await pool.connect();
    try {
      const productData = client.query(queryStr1, [id]);
      const featureData = client.query(queryStr2, [id]);
      const promisedData = await Promise.all([productData, featureData]);
      if (promisedData[0].rows) {
        const result = promisedData[0].rows[0];
        result.name = result.product_name;
        delete result.product_name;
        result.description = result.product_descr;
        delete result.product_descr;
        result.features = promisedData[1].rows;
        result.features.forEach((e) => {
          e.feature = e.feature_name;
          delete e.feature_name;
          e.value = e.feature_value;
          delete e.feature_value;
        });
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
    style_name,
    price,
    sale_price,
    default_style
    FROM styles
    WHERE product_id = $1`;
    const queryStrPhotos = `SELECT
    style_id,
    thumbnail_url,
    full_size_url
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
      if (promisedData[0].rows) {
        console.log("styleData.rows: ", promisedData[0].rows);
        const result = {
          product_id: id,
          results: promisedData[0].rows,
        };
        let skusByStyle = {};
        let photosByStyle = {};
        if (promisedData[1].rows) {
          for (let i = 0; i < promisedData[1].rows.length; i++) {
            if (photosByStyle[promisedData[1].rows[i].style_id]) {
              photosByStyle[promisedData[1].rows[i].style_id].push(
                promisedData[1].rows[i]
              );
            } else {
              photosByStyle[promisedData[1].rows[i].style_id] = [
                photosByStyle[promisedData[1].rows[i]],
              ];
            }
          }
        }
        if (promisedData[2].rows) {
          for (let i = 0; i < promisedData[2].rows.length; i++) {
            if (skusByStyle[promisedData[2].rows[i].style_id]) {
              skusByStyle[promisedData[2].rows[i].style_id].push(
                promisedData[1].rows[i]
              );
            } else {
              skusByStyle[promisedData[2].rows[i].style_id] = [
                skusByStyle[promisedData[2].rows[i]],
              ];
            }
          }
        }
        for (let i = 0; i < promisedData[0].rows.length; i++) {
          if (photosByStyle.hasOwnProperty(promisedData[0].rows[i].id)) {
            result.results.promisedData[0].rows[i].photos =
              photosByStyle[promisedData[0].rows[i].id];
          }
          if (skusByStyle.hasOwnProperty(promisedData[0].rows[i].id)) {
            result.results.promisedData[0].rows[i].skus =
              skusByStyle[promisedData[0].rows[i].id];
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
