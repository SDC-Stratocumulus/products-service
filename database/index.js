const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: process.env.DB_HOST || "localhost",
  database: "sdc",
  password: "postgres",
  port: "5432",
});

const db = pool.connect();

pool.on("error", (err, pool) => {
  console.error("Unexpected error on idle client", err);
});

module.exports = db;
