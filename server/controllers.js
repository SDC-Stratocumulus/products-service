const {readProductList, readOneProduct, readStyles, readRelated} = require('./models.js')

module.exports= {

  getProductsList: (req, res) => {
    const params = [req.body , count];
    return readProductList(params)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.sendStatus(500)
      console.log('errFromGetProductsList: ', err)
    })
  },
  getOneProduct: (req, res) => {
    const id = req.params.product_id
    return readOneProduct(id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.sendStatus(500)
      console.log('errFromGetOneProduct: ', err)
    })
  },
  getStyles: (req, res) => {
    const id = req.params.product_id
    return readStyles(id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.sendStatus(500)
      console.log('errFromGetProductsList: ', err)
    })
  },
  getRelated: (req, res) => {
    const id = req.params.product_id
    return readRelated(id)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.sendStatus(500)
      console.log('errFromGetRelated : ', err)
    })
  },
}