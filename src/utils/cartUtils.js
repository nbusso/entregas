import { promises as fs } from "fs";
import { join } from "path";
import __dirname from "../dirname.js";

const cartsPath = join(__dirname, "./data/carts.json");

export const setCarts = async () => {
  try {
    const fileExists = await fs
      .access(cartsPath) // el metodo access devuelve una promesa que se resuelve si el archivo existe y se rechaza si no
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      await fs.writeFile(cartsPath, JSON.stringify([]));
    }

    const data = await fs.readFile(cartsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Se produjo un error en la carga de carritos:", error);
    throw error;
  }
};

export const saveCarts = async (carts) => {
  try {
    const data = JSON.stringify(carts, null, 2);
    await fs.writeFile(cartsPath, data);
  } catch (error) {
    console.error("Error guardando el archivo del carrito:", error);
    throw error;
  }
};
