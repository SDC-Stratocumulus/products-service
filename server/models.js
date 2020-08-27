const db = require('../database/index.js')

module.exports= {
  readProductList: (params) => {
    const queryStr = 'SELECT * '
    return db
    .then((client) => {
      return client.query(queryStr)
    })
    .catch((err) => {
      console.log('errFromreadProductList: ',err)
    })
  },
  readOneProduct: (id) => {
    const queryStr = 'SELECT '
    return db
    .then((client) => {
      return client.query(queryStr)
    })
    .catch((err) => {
      console.log('errFromreadOneProduct: ',err)
    })
  },
  readStyles: (id) => {
    const queryStr = 'SELECT '
    return db
    .then((client) => {
      return client.query(queryStr)
    })
    .catch((err) => {
      console.log('errFromreadStyles: ',err)
    })
  },
  readRelated: (id) => {
    const queryStr = 'SELECT '
    return db
    .then((client) => {
      return client.query(queryStr)
    })
    .catch((err) => {
      console.log('errFromreadRelated: ',err)
    })
  }

}

