import React, { useEffect, useState } from "react";
import type { Pokemon } from "../types/Pokemon";
import PokemonCard from "./PokemonCard";

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");

  // Estados para paginación
  const [paginaActual, setPaginaActual] = useState<number>(1);
  const pokemonsPorPagina = 5;

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setError(null);

      // Trae los primeros 100 pokémon
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");
      if (!response.ok) {
        throw new Error("Error al obtener pokemons");
      }

      const data = await response.json();
      const results: { name: string; url: string }[] = data.results;

      // Cargar detalles de cada pokémon
      const promises = results.map((r) => fetch(r.url).then((res) => res.json()));
      const fullData = await Promise.all(promises);

      const pokemonsParsed: Pokemon[] = fullData.map((p: any) => ({
        id: p.id,
        name: p.name,
        height: p.height,
        weight: p.weight,
        types: p.types,
      }));

      setPokemons(pokemonsParsed);
      setFilteredPokemons(pokemonsParsed);
      setPaginaActual(1);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrado por nombre
  useEffect(() => {
    const filtrados = pokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPokemons(filtrados);
    setPaginaActual(1);
  }, [search, pokemons]);

  // Calcular pokemons visibles por página
  const indiceUltimo = paginaActual * pokemonsPorPagina;
  const indicePrimero = indiceUltimo - pokemonsPorPagina;
  const pokemonsPagina = filteredPokemons.slice(indicePrimero, indiceUltimo);

  // Cambiar de página
  const siguientePagina = () => {
    if (paginaActual < Math.ceil(filteredPokemons.length / pokemonsPorPagina)) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const anteriorPagina = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  // Renderizado condicional
  if (loading)
    return <p style={{ textAlign: "center" }}>Cargando pokemons...</p>;
  if (error)
    return (
      <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>
    );

  return (
    <div style={{ textAlign: "center" }}>
      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          margin: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      {/* Botón Recargar */}
      <button
        onClick={fetchPokemons}
        style={{
          marginLeft: "5px",
          padding: "8px 12px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Recargar
      </button>

      {/* Lista de pokémon */}
      <div>
        {pokemonsPagina.map((p) => (
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>

      {/* Paginación */}
      <div style={{ marginTop: "15px" }}>
        <button
          onClick={anteriorPagina}
          disabled={paginaActual === 1}
          style={{
            margin: "0 5px",
            padding: "8px 12px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: paginaActual === 1 ? "#ccc" : "#007bff",
            color: "white",
            cursor: paginaActual === 1 ? "not-allowed" : "pointer",
          }}
        >
          Anterior
        </button>

        <span style={{ margin: "0 10px" }}>
          Página {paginaActual} de{" "}
          {Math.ceil(filteredPokemons.length / pokemonsPorPagina)}
        </span>

        <button
          onClick={siguientePagina}
          disabled={
            paginaActual ===
            Math.ceil(filteredPokemons.length / pokemonsPorPagina)
          }
          style={{
            margin: "0 5px",
            padding: "8px 12px",
            borderRadius: "5px",
            border: "none",
            backgroundColor:
              paginaActual ===
              Math.ceil(filteredPokemons.length / pokemonsPorPagina)
                ? "#ccc"
                : "#007bff",
            color: "white",
            cursor:
              paginaActual ===
              Math.ceil(filteredPokemons.length / pokemonsPorPagina)
                ? "not-allowed"
                : "pointer",
          }}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
