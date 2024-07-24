import { setProducts, saveProducts } from "../utils/prodUtils.js";
import { io } from "../app.js";
await setProducts();
const products = await setProducts();

export const postProduct = (product) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = product;

  let maxId = products.reduce(
    (max, product) => (product.id > max ? product.id : max),
    0
  );

  if (title && description && code && price > 0 && stock > 0 && category) {
    const newProduct = {
      id: maxId + 1,
      title,
      description,
      code,
      price,
      status: status ?? true,
      stock,
      category,
      thumbnails: thumbnails ?? "",
    };

    products.push(newProduct);
    saveProducts(products);
    io.emit("productAdded", product);
  } else {
    console.log("error");
    io.emit("productLoadError");
  }
};
