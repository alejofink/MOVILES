import React from "react";
import PokemonList from "./components/PokemonList";

const App: React.FC = () => {
  return (
    <div className="App" style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>PokéAPI - Listado de Pokémon</h1>
      <PokemonList />
    </div>
  );
};

export default App;
