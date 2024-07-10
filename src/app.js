// Imports
const express = require("express");
const app = express();
const PORT = 8080;
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
