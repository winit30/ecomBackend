const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const {mongoose} = require("./db/db");

const categoryController = require("./controllers/categoryController");
const productController = require("./controllers/productController");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.static('productAssets'));
app.use(express.static('public'));

app.use('/categories', categoryController);
app.use('/products', productController);

const port = process.env.PORT || 4000;


app.listen(port, () => {
	console.log(`server is running on port ${port}`);
});
