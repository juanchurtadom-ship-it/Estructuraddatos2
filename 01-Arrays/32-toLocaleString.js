const precios = [1234.5, 6789.1];

console.log(precios.toLocaleString("es-CO", { style: "currency", currency: "COP" }));
