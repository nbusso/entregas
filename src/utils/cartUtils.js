import { existsSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import __dirname from "../dirname.js";

const cartsPath = join(__dirname, "./data/carts.json");

export const setCarts = () => {
  if (!existsSync(cartsPath)) {
    writeFileSync(cartsPath, JSON.stringify([]));
  }
  const data = readFileSync(cartsPath, "utf8");
  return JSON.parse(data);
};

export const saveCarts = (carts) => {
  const data = JSON.stringify(carts, null, 2);
  writeFileSync(cartsPath, data);
};
