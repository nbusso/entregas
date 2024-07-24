// Imports
import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";

const app = express();
const PORT = 8080;

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Config socket.io
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Usuario conectado.");

  let products = await setProducts();

  socket.on("requestInitialData", () => {
    socket.emit("initialData", products);
  });

  socket.on("addProduct", async (product) => {
    // products.push(product);
    // await saveProducts(products);
    io.emit("productAdded", product);
  });
});
