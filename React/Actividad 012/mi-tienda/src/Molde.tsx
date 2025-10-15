// Molde.tsx
import React from "react";
import { productos } from "./productos";
import "./Molde.css";

// Exporta la interfaz para que otros archivos la puedan usar
export interface ProductoProps {
  id: number;
  nombre: string;
  precio: number;
  stock: number;
  imagen: string;
}

const Molde: React.FC = () => {
  return (
    <div className="contenedor-tarjetas">
      {productos.map((prod: ProductoProps) => (
        <div key={prod.id} className="tarjeta">
          <img src={prod.imagen} alt={prod.nombre} className="imagen-tarjeta" />
          <h2>{prod.nombre}</h2>
          <p>Precio: ${prod.precio}</p>
          {prod.stock > 0 ? (
            <button className="boton-comprar">Comprar</button>
          ) : (
            <button className="boton-sin-stock" disabled>Sin stock</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Molde;
