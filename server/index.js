const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const router = require("./routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use("/products", router);

app.get("/products", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`products service app listening at http://localhost:${port}`);
});
