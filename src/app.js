import express, { json, urlencoded } from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import __dirname from "./utils.js";
import { setProducts, saveProducts } from "./utils/prodUtils.js";
import { postProduct, deleteProduct } from "./utils/socketUtils.js";

const app = express();
const PORT = 8080;

// Middlewares
app.use(json());
app.use(urlencoded({ extended: true }));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));

// Config socket.io
const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("Usuario conectado.");

  let products = await setProducts();

  socket.on("requestInitialData", () => {
    socket.emit("initialData", products);
  });

  socket.on("addProduct", (product) => {
    postProduct(product);
    // io.emit("productAdded", product);
  });

  socket.on("deleteProduct", (id) => {
    console.log("Peticion de delete", id);
    deleteProduct(id);
  });
});

// Make io accessible to routes
app.set("io", io);

// Routes
app.use("/api/carts", cartsRouter);
app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

export { io };
