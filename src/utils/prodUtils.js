import { promises as fs } from "fs";
import { join } from "path";
import __dirname from "../utils.js";
import { socketServer } from "../app.js";

const productsPath = join(__dirname, "./data/products.json");

export const setProducts = async () => {
  try {
    const fileExists = await fs
      .access(productsPath) // el metodo access devuelve una promesa que se resuelve si el archivo existe y se rechaza si no
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      await fs.writeFile(productsPath, JSON.stringify([]));
    }

    const data = await fs.readFile(productsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Se produjo un error en la carga de productos", error);
    throw error;
  }
};

export const saveProducts = async (products) => {
  try {
    const data = JSON.stringify(products, null, 2);
    await writeFile(productsPath, data);
  } catch (error) {
    console.error("Error guardando el archivo del producto", error);
    throw error;
  }
};
