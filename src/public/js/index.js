const socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor");
  socket.emit("requestInitialData");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

socket.on("initialData", (products) => {
  console.log("Initial products:", products);
  // Update your UI with the initial products
  updateProductList(products);
});

socket.on("productAdded", (product) => {
  console.log("New product added:", product);
  // Update your UI with the new product
  addProductToList(product);
});

document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Emitir los datos del formulario a través del socket
    console.log("Sending new product:", data);
    socket.emit("addProduct", data);

    // Limpiar el formulario después de enviarlo
    event.target.reset();
  });

function updateProductList(products) {
  const productsList = document.getElementById("products");
  productsList.innerHTML = ""; // Clear existing list

  products.forEach((product) => {
    addProductToList(product);
  });
}

function addProductToList(product) {
  const productsList = document.getElementById("products");
  const listItem = document.createElement("li");
  listItem.innerHTML = `
      <strong>${product.title}</strong> - $${product.price}
      <p>${product.description}</p>
    `;
  productsList.appendChild(listItem);
}
