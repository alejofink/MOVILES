"use strict";
// facturador.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Importamos el módulo 'fs' para poder escribir archivos en el sistema
const fs = require("fs");
// Función que recibe un array de productos y calcula el total aplicando descuentos si existen
function facturarProductos(productos) {
    let total = 0;
    for (const producto of productos) {
        let precioUnitario = producto.precio;
        if (producto.descuento) {
            precioUnitario *= 1 - producto.descuento / 100;
        }
        total += precioUnitario * producto.cantidad;
    }
    return total;
}
// Array con los productos a facturar
const productosAFacturar = [
    { nombre: "Laptop Gaming", precio: 1200, cantidad: 1, descuento: 10 },
    { nombre: "Mouse Inalámbrico", precio: 25, cantidad: 2 },
    { nombre: 'Monitor 24"', precio: 300, cantidad: 1, descuento: 5 },
    { nombre: "Teclado Mecánico", precio: 80, cantidad: 1, descuento: 15 },
];
// Calculamos el total de la factura
const totalFactura = facturarProductos(productosAFacturar);
// Imprimir factura en consola
console.log("=".repeat(50));
console.log(" FACTURA DE PRODUCTOS");
console.log("=".repeat(50));
console.log("\nDetalle de productos:");
console.log("-".repeat(50));
productosAFacturar.forEach((producto, index) => {
    const precioConDesc = producto.descuento
        ? producto.precio * (1 - producto.descuento / 100)
        : producto.precio;
    const subtotal = precioConDesc * producto.cantidad;
    console.log(`${index + 1}. ${producto.nombre}`);
    console.log(` Precio unitario: $${producto.precio.toFixed(2)}`);
    if (producto.descuento) {
        console.log(` Descuento: ${producto.descuento}%`);
        console.log(` Precio con descuento: $${precioConDesc.toFixed(2)}`);
    }
    console.log(` Cantidad: ${producto.cantidad}`);
    console.log(` Subtotal: $${subtotal.toFixed(2)}\n`);
});
console.log("-".repeat(50));
console.log(`TOTAL A PAGAR: $${totalFactura.toFixed(2)}`);
console.log("=".repeat(50));
// Construimos el contenido completo de la factura para guardar en un archivo
let contenidoFactura = "";
contenidoFactura += "=".repeat(50) + "\n";
contenidoFactura += " FACTURA DE PRODUCTOS\n";
contenidoFactura += "=".repeat(50) + "\n\n";
contenidoFactura += "Detalle de productos:\n";
contenidoFactura += "-".repeat(50) + "\n";
productosAFacturar.forEach((producto, index) => {
    const precioConDesc = producto.descuento
        ? producto.precio * (1 - producto.descuento / 100)
        : producto.precio;
    const subtotal = precioConDesc * producto.cantidad;
    contenidoFactura += `${index + 1}. ${producto.nombre}\n`;
    contenidoFactura += ` Precio unitario: $${producto.precio.toFixed(2)}\n`;
    if (producto.descuento) {
        contenidoFactura += ` Descuento: ${producto.descuento}%\n`;
        contenidoFactura += ` Precio con descuento: $${precioConDesc.toFixed(2)}\n`;
    }
    contenidoFactura += ` Cantidad: ${producto.cantidad}\n`;
    contenidoFactura += ` Subtotal: $${subtotal.toFixed(2)}\n\n`;
});
contenidoFactura += "-".repeat(50) + "\n";
contenidoFactura += `TOTAL A PAGAR: $${totalFactura.toFixed(2)}\n`;
contenidoFactura += "=".repeat(50) + "\n";
// Función para guardar la factura en un archivo .txt
function guardarFactura(contenido, numeroFactura) {
    fs.writeFileSync(`factura_${numeroFactura}.txt`, contenido);
    console.log(`Factura guardada como: factura_${numeroFactura}.txt`);
}
// Guardamos la factura con un número fijo "0001"
guardarFactura(contenidoFactura, "0001");
