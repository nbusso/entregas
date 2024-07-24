import { setProducts, saveProducts } from "../utils/prodUtils.js";
import { io } from "../app.js";

await setProducts();
let products = await setProducts();

export const postProduct = async (product) => {
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

export const deleteProduct = async (id) => {
  const productId = id;
  try {
    products = products.filter((product) => product.id !== productId);
    saveProducts(products);
    io.emit("productDeleted", id);
  } catch (error) {
    io.emit("productDeleteError", id, error);
  }
};

// export const deleteProduct = async (id) => {
//   const productId = parseInt(id);
//   try {
//     products = products.filter((product) => product.id !== productId);
//     saveProducts(products);
//     io.emit("productDeleted", id);
//   } catch (error) {
//     io.emit("productDeleteError", error);
//   }
// };

// router.delete("/:pid", (req, res) => {
//   const productId = parseInt(req.params.pid);
//   products = products.filter((product) => product.id !== productId);
//   saveProducts(products);
//   res.status(200).json({
//     message: `El producto (ID: ${productId}) se ha eliminado correctamente`,
//   });
// });
