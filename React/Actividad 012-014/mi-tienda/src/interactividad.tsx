import React, { useState } from "react";

export interface ProductoProps {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  imagen: string;
}

interface InteractiveProductProps {
  producto: ProductoProps;
}

export const InteractiveProduct: React.FC<InteractiveProductProps> = ({ producto }) => {
  const [cantidad, setCantidad] = useState(0);

  const incrementar = () => {
    if (cantidad < producto.stock) setCantidad(cantidad + 1);
  };
  const decrementar = () => {
    if (cantidad > 0) setCantidad(cantidad - 1);
  };
  const resetear = () => setCantidad(0);

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "220px", margin: "10px", textAlign: "center", borderRadius: "8px" }}>
      <img src={producto.imagen} alt={producto.nombre} style={{ width: "100%", height: "auto" }} />
      <h2>{producto.nombre}</h2>
      <p>Precio: ${producto.precio}</p>
      <p>Stock: {producto.stock}</p>
      <p>Cantidad: {cantidad}</p>
      <div style={{ display: "flex", justifyContent: "space-around", marginTop: "10px" }}>
        <button onClick={incrementar}>+</button>
        <button onClick={decrementar}>-</button>
        <button onClick={resetear}>Reset</button>
      </div>
    </div>
  );
};
