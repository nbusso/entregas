// Conectar al servidor de Socket.io
const socket = io();

// Escuchar eventos de conexión y desconexión
socket.on("connect", () => {
  console.log("Conectado al servidor");
});

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");
});

socket.on("test", (newProduct) => {
  console.log("Nuevo producto añadido:", newProduct);
});

document
  .getElementById("productForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Emitir los datos del formulario a través del socket
    console.log(data);
    socket.emit("addProduct", data);

    // Limpiar el formulario después de enviarlo
    event.target.reset();
  });
