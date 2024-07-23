import { setProducts, saveProducts } from "./prodUtils";

const io = req.app.get("io");
const products = await setProducts();

io.on("addProduct", (product) => {
  products.push(product);
  saveProducts(products);
  io.emit("productAdded", product);
});
