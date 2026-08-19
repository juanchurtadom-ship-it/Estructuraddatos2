const productos = [
  { nombre: "Cuaderno", precio: 8 },
  { nombre: "Mochila", precio: 35 },
  { nombre: "Regla", precio: 3 },
];

console.log(productos.find((producto) => producto.precio > 10));
