const express = require("express");
const router = express.Router();
const { setProducts, saveProducts } = require("../utils/prodUtils");

setProducts();

let products = setProducts();

// get
router.get("/", (req, res) => {
  const limit = req.query.limit;

  if (limit) {
    res.status(200).json(products.slice(0, limit));
  } else {
    res.status(200).json(products);
  }
});

router.get("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = products.find((product) => product.id === productId);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(400).json({ message: "Producto no encontrado" });
  }
});

// post
router.post("/", (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

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
});

// put
router.put("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  const product = products.find((product) => {
    return product.id === productId;
  });

  if (product) {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;

    product.title = title ?? product.title;
    product.description = description ?? product.description;
    product.code = code ?? product.code;
    product.price = price ?? product.price;
    product.status = status ?? product.status;
    product.stock = stock ?? product.stock;
    product.category = category ?? product.category;
    product.thumbnails = thumbnails ?? product.thumbnails;

    saveProducts(products);
    res.json(product);
  } else {
    res.status(400).json({
      message: "Producto no encontrado",
    });
    console.log(product);
  }
});

// DELETE
router.delete("/:pid", (req, res) => {
  const productId = parseInt(req.params.pid);
  products = products.filter((product) => product.id !== productId);
  res.status(200).json({
    message: `El producto (ID: ${productId}) se ha eliminado correctamente`,
  });
});

module.exports = router;
