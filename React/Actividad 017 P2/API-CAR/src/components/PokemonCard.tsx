import React from "react";
import type { Pokemon } from "../types/Pokemon";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "8px",
      padding: "12px",
      margin: "10px auto",
      maxWidth: "320px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h2>{pokemon.name} (#{pokemon.id})</h2>
      <p><strong>Altura:</strong> {pokemon.height}</p>
      <p><strong>Peso:</strong> {pokemon.weight}</p>
      <p><strong>Tipos:</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
    </div>
  );
};

export default PokemonCard;
