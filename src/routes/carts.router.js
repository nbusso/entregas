const express = require("express");
const router = express.Router();
const { setCarts, saveCarts } = require("../utils/cartUtils.js");

setCarts();

let carts = setCarts();

//get
router.get("/", (req, res) => {
  const limit = req.query.limit;

  if (limit) {
    res.status(200).json(carts.slice(0, limit));
  } else {
    res.status(200).json(carts);
  }
});

router.get("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const cart = carts.find((cart) => cart.id === cartId);

  if (cart) {
    res.status(200).json(cart);
  } else {
    res.status(400).json({
      message: "El carrito solicitado no encontrado",
    });
  }
});

// post
router.post("/", (req, res) => {
  const { products } = req.body;
  let maxId = 0;
  if (carts.length > 0) {
    maxId = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
  }
  const newCart = {
    id: maxId + 1,
    products: products || [],
  };

  carts.push(newCart);
  saveCarts(carts);
  res.status(200).json(newCart);
});

// delete
router.delete("/:cid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  carts = carts.filter((cart) => cart.id !== cartId);
  saveCarts(carts);
  res.status(200).json({
    message: `Carrito con id: ${cartId}, se ha eliminado correctamente!`,
  });
});

router.delete("/:cid/product/:pid", (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const cart = carts.find((cart) => cart.id === cartId);
  const prod = cart.products.find((product) => product.id === productId);

  //validacion de carrito
  if (!cart) {
    return res
      .status(404)
      .json({ message: `!!! Carrito (ID: ${cartId}) no encontrado` });
  } else if (!prod) {
    //validacion de producto dentro del carrito
    return res.status(404).json({
      message: `!!! Producto (ID: ${productId}) no se encuentra en el carrito (ID: ${cartId})`,
    });
  }

  // buscamos el index del carrito
  let indexCart = carts.findIndex((i) => i.id === cartId);
  // filtramos el carro sin el producto a eliminar
  let filteredCart = cart.products.filter(
    (product) => product.id !== productId
  );

  //cambiamos el valor del products de dicho index
  carts[indexCart].products = filteredCart;

  // guardamos el cart nuevo
  saveCarts(carts);

  //mensaje de exito
  res.status(200).json({
    message: `Producto (ID:${productId}) eliminado del carrito (ID: ${cartId}) correctamente!`,
  });
});

module.exports = router;
