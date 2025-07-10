"use strict";
// === INTERFACES ===
// === PRODUCTOS DISPONIBLES ===
// Array que representa el catálogo de productos disponibles para comprar
const productosDisponibles = [
    { id: 1, nombre: "Notebook Lenovo", precio: 450000, stock: 5, categoria: "tecnologia" },
    { id: 2, nombre: "Mouse Inalámbrico", precio: 15000, stock: 20, categoria: "tecnologia" },
    { id: 3, nombre: "Zapatillas Nike", precio: 80000, stock: 10, categoria: "deportes" },
    { id: 4, nombre: "Remera Algodón", precio: 12000, stock: 0, categoria: "ropa" } // producto sin stock
];
// === CARRITO DE COMPRAS ===
// Array que contiene los productos que el usuario va agregando al carrito
let carrito = [];
// === FUNCIONES ===
// Función para agregar un producto al carrito
function agregarProducto(id, cantidad) {
    const producto = productosDisponibles.find(p => p.id === id); // Busca el producto por ID
    if (!producto) {
        console.log("❌ PRODUCTO NO ENCONTRADO"); // Si no existe, muestra error
        return;
    }
    if (producto.stock === 0) {
        console.log("❌ PRODUCTO SIN STOCK. El producto no tiene stock disponible"); // Si no hay stock, error
        return;
    }
    if (cantidad <= 0) {
        console.log("❌ CANTIDAD INVÁLIDA. Debe ser mayor a 0"); // Validación cantidad positiva
        return;
    }
    // Calcula la cantidad total reservada en el carrito para este producto
    const cantidadEnCarrito = carrito
        .filter(item => item.productoId === id) // Filtra items que sean del mismo producto
        .reduce((acc, item) => acc + item.cantidad, 0); // Suma las cantidades de esos items
    if (cantidad + cantidadEnCarrito > producto.stock) {
        // Si la cantidad nueva más la ya reservada supera el stock disponible, error
        console.log(`❌ STOCK MÁXIMO EN RESERVA.`);
        return;
    }
    // Busca si el producto ya está en el carrito
    const existente = carrito.find(item => item.productoId === id);
    if (existente) {
        // Si ya está, suma la cantidad nueva a la existente
        const nuevaCantidad = existente.cantidad + cantidad;
        existente.cantidad = nuevaCantidad; // Actualiza cantidad
        existente.subtotal = existente.precio * nuevaCantidad; // Actualiza subtotal
    }
    else {
        // Si no está en el carrito, agrega nuevo item
        carrito.push({
            productoId: producto.id, // ID del producto
            nombre: producto.nombre, // Nombre del producto
            precio: producto.precio, // Precio unitario
            cantidad, // Cantidad que se agrega
            subtotal: producto.precio * cantidad // subtotal calculado
        });
    }
    console.log(`✅ PRODUCTO AGREGADO\n${producto.nombre} x${cantidad} agregado al carrito`); // Mensaje de éxito
}
// Función para quitar un producto completamente del carrito
function quitarProducto(id) {
    const index = carrito.findIndex(item => item.productoId === id); // Busca el índice en el array
    if (index === -1) {
        // Si no está en el carrito, muestra error
        console.log("❌ PRODUCTO NO ESTÁ EN EL CARRITO");
        return;
    }
    carrito.splice(index, 1); // Elimina el producto del array
    console.log("🗑 PRODUCTO QUITADO DEL CARRITO");
}
// Función para modificar la cantidad de un producto ya agregado
function modificarCantidad(id, nuevaCantidad) {
    const producto = productosDisponibles.find(p => p.id === id); // Busca en catálogo
    const item = carrito.find(i => i.productoId === id); // Busca en carrito
    if (!producto || !item) {
        // Si no se encuentra en ambos lugares, muestra error
        console.log("❌ PRODUCTO NO ENCONTRADO EN CARRITO");
        return;
    }
    if (nuevaCantidad <= 0) {
        // Si la cantidad es inválida
        console.log("❌ CANTIDAD INVÁLIDA");
        return;
    }
    if (producto.stock < nuevaCantidad) {
        // Si excede el stock
        console.log(`❌ ERROR DE STOCK. Disponible: ${producto.stock}`);
        return;
    }
    // Actualiza cantidad y subtotal
    item.cantidad = nuevaCantidad;
    item.subtotal = item.precio * nuevaCantidad;
    console.log("🔁 CANTIDAD MODIFICADA CORRECTAMENTE");
}
// Función para mostrar el estado del carrito y calcular totales
function mostrarCarrito() {
    if (carrito.length === 0) {
        console.log("🛒 Carrito vacío");
        return;
    }
    console.log("🛒 CARRITO ACTUAL");
    let subtotalGeneral = 0;
    let descuentoMayorAplicable = 0;
    // Muestra los productos y calcula subtotal general
    carrito.forEach(item => {
        console.log(`- ${item.nombre} x${item.cantidad} = $${item.subtotal}`);
        subtotalGeneral += item.subtotal;
        // Aplica descuento por cantidad (10% si hay 3 o más unidades)
        if (item.cantidad >= 3) {
            const descuentoPorCantidad = item.subtotal * 0.10;
            if (descuentoPorCantidad > descuentoMayorAplicable) {
                descuentoMayorAplicable = descuentoPorCantidad;
            }
        }
    });
    // Aplica descuento por monto total (5% o 8%)
    if (subtotalGeneral > 500000) {
        descuentoMayorAplicable = Math.max(descuentoMayorAplicable, subtotalGeneral * 0.08);
    }
    else if (subtotalGeneral > 100000) {
        descuentoMayorAplicable = Math.max(descuentoMayorAplicable, subtotalGeneral * 0.05);
    }
    // Cálculo final
    const subtotalConDescuento = subtotalGeneral - descuentoMayorAplicable;
    const iva = subtotalConDescuento * 0.21;
    const totalFinal = subtotalConDescuento + iva;
    // Muestra desglose financiero
    console.log(`\nSubtotal: $${subtotalGeneral}`);
    console.log(`Descuento: -$${descuentoMayorAplicable.toFixed(2)}`);
    console.log(`IVA (21%): $${iva.toFixed(2)}`);
    console.log(`TOTAL A PAGAR: $${totalFinal.toFixed(2)}\n`);
}
// === CASOS DE PRUEBA ===
// Caso 1: Agregar productos normalmente
console.log("\n✅ CASO 1: Operación Exitosa");
agregarProducto(1, 5); // Notebook
agregarProducto(2, 2); // Mouse
mostrarCarrito(); // Muestra resumen
// Caso 2: Stock insuficiente
console.log("\n❌ CASO 2: Error de Stock Insuficiente");
agregarProducto(1, 10); // Más que el stock
// Caso 3: Producto sin stock
console.log("\n❌ CASO 3: Producto Sin Stock");
agregarProducto(4, 1); // Remera con stock 0
// Caso 4: Producto inexistente
console.log("\n❌ CASO 4: Producto Inexistente");
agregarProducto(999, 1); // No existe
// Caso 5: Descuento por monto
console.log("\n✅ CASO 5: Descuento por Monto Total");
agregarProducto(3, 7); // Zapatillas x7
mostrarCarrito();
// Caso 6: Modificar cantidad
console.log("\n🔁 CASO 6: Modificar Cantidad");
modificarCantidad(2, 3); // Mouse x3
mostrarCarrito();
// Caso 7: Quitar producto del carrito
console.log("\n🗑 CASO 7: Quitar Producto");
quitarProducto(2); // Elimina Mouse
mostrarCarrito();
// Caso 8: Intento de agregar producto con stock ya totalmente reservado en carrito
console.log("\nCASO 8: Stock máximo reservado en carrito");
agregarProducto(1, 1); // Intenta agregar 1 Notebook Lenovo, pero ya hay 5 en carrito (todo el stock)
