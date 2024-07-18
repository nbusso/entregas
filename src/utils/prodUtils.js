import { existsSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import __dirname from "../dirname.js";

const productsPath = join(__dirname, "./data/products.json");

export const setProducts = () => {
  if (!existsSync(productsPath)) {
    writeFileSync(productsPath, JSON.stringify([]));
  }

  const data = readFileSync(productsPath, "utf8");

  return JSON.parse(data);
};

export const saveProducts = (products) => {
  const data = JSON.stringify(products, null, 2);
  writeFileSync(productsPath, data);
};
