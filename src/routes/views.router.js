import { Router } from "express";
import { setProducts } from "../utils/prodUtils.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await setProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts");
});

export default router;
