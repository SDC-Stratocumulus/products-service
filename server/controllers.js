const {
  readProductList,
  readOneProduct,
  readStyles,
  readRelated
} = require("./models.js");

module.exports = {
  getProductsList: (req, res) => {
    //let page = req.body.page || 1;
    let count = req.body.count || 5;
    return readProductList(count, (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.log("errFromGetProductsList: ", err);
      } else {
        res.status(200).json(data);
      }
    });
  },

  getOneProduct: (req, res) => {
    const id = req.params.product_id;
    return readOneProduct(id, (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.log("errFromGetOneProduct: ", err);
      } else {
        res.status(200).json(data);
      }
    });
  },

  getStyles: (req, res) => {
    const id = req.params.product_id;
    readStyles(id, (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.log("errFromGetStyles: ", err);
      } else {
        res.status(200).json(data);
      }
    });
  },

  getRelated: (req, res) => {
    const id = req.params.product_id;
    readRelated(id, (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.log("errFromGetRelated : ", err);
      } else {
        res.status(200).json(data);
      }
    });
  },
};
