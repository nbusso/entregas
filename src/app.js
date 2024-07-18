// Imports
import express, { json, urlencoded } from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
const PORT = 8080;
// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
