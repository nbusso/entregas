// Imports
import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./dirname.js";

const app = express();
const PORT = 8080;

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Listener
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
