document.addEventListener('DOMContentLoaded', function () {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  const botones = document.querySelectorAll('button.agregar');
  const vaciarBtn = document.getElementById('vaciar-carrito');
  const whatsappBtn = document.getElementById("enviar-whatsapp");

  // Agregar al carrito
  botones.forEach((boton, index) => {
    boton.addEventListener('click', () => {
      const producto = {
        nombre: document.querySelectorAll('h2')[index].innerText,
        precio: document.querySelectorAll('p')[index].innerText
      };

      carrito.push(producto);
      guardarCarrito();
      mostrarCarrito();
    });
  });

  // Vaciar carrito
  vaciarBtn.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
  });

  // Enviar por WhatsApp
  whatsappBtn.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    let mensaje = "Hola, quiero comprar:\n";
    let total = 0;

    carrito.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.nombre} - ${item.precio}\n`;
      const precio = parseFloat(item.precio.replace("S/", "").trim());
      total += precio;
    });

    mensaje += `\nTotal: S/ ${total.toFixed(2)}`;

    const numero = "51918079367"; // Tu número de WhatsApp
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  });

  // Mostrar el carrito en pantalla
  function mostrarCarrito() {
    const lista = document.getElementById('lista-carrito');
    const totalSpan = document.getElementById('total-compra');
    const cantidadSpan = document.getElementById('cantidad-productos');

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.nombre} - ${item.precio} `;

      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.style.marginLeft = "10px";
      eliminarBtn.style.backgroundColor = "#dc3545";
      eliminarBtn.style.color = "white";
      eliminarBtn.style.border = "none";
      eliminarBtn.style.borderRadius = "4px";
      eliminarBtn.style.cursor = "pointer";

      eliminarBtn.addEventListener('click', () => {
        carrito.splice(index, 1);
        guardarCarrito();
        mostrarCarrito();
      });

      li.appendChild(eliminarBtn);
      lista.appendChild(li);

      const precio = parseFloat(item.precio.replace("S/", "").trim());
      total += precio;
    });

    totalSpan.textContent = `S/ ${total.toFixed(2)}`;
    cantidadSpan.textContent = carrito.length;
  }

  // Guardar en localStorage
  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Mostrar carrito al cargar la página
  mostrarCarrito();
});

