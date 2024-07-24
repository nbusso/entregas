const socket = io();

socket.on("connect", () => {
  console.log("Conectado al servidor");
  socket.emit("requestInitialData");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

socket.on("initialData", (products) => {
  console.log("Productos Iniciales:", products);
  updateProductList(products);
});

socket.on("productAdded", (product) => {
  console.log("Nuevo producto ingresado:", product);
  addProductToList(product);
});

socket.on("productLoadError", () => {
  console.log("Error cargando el producto, revisa los datos ingresados.");
});

socket.on("productDeleted", (id, error) => {
  console.log(`Articulo ID: ${id} eliminado correctamente`);
});

socket.on("productDeleteError", (id, error) => {
  console.log(`Sucedió un error al querer eliminar ID: ${id}`, error);
});

document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    console.log("Enviando nuevo producto:", data);
    socket.emit("addProduct", data);

    event.target.reset();
  });

function updateProductList(products) {
  const productsList = document.getElementById("products");
  productsList.innerHTML = ""; // Limpiar lista existente

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
      <button class="delete-btn" data-id="${product.id}">Eliminar</button>
    `;

  const deleteBtn = listItem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", () => {
    // Emitir el ID del producto al servidor
    socket.emit("deleteProduct", product.id);
    console.log("click");
    // Eliminar el elemento de la lista en el DOM
    listItem.remove();
  });

  productsList.appendChild(listItem);
}
