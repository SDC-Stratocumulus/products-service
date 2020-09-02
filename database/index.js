const {Pool} = require("pg");
const config = require("./config.js");
const pool = new Pool(config);

//const db = pool.connect();

pool.on("error", (err, client) => {
  console.log("Unexpected error on idle client", err);
});

module.exports = pool;
