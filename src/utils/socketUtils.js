import { setProducts, saveProducts } from "../utils/prodUtils.js";

await setProducts();
const products = await setProducts();

export const postProduct = (newProduct) => {
  const product = newProduct;

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
      thumbnails,
    };

    products.push(newProduct);
    saveProducts(products);
    res.status(200).json(newProduct);
  } else {
    res.status(400).json({ message: "Te faltan datos de producto." });
  }
};
