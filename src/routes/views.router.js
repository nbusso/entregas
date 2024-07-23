import { Router } from "express";
import { setProducts, saveProducts } from "../utils/prodUtils.js";
import { io } from "../app.js";

const router = Router();

await setProducts();
let products = await setProducts();

router.get("/", (req, res) => {
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  let testObj = {
    test: "test",
    number: 56,
  };

  io.emit("test", testObj);

  res.render("realTimeProducts", products);
});

export default router;
