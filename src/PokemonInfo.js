import React from "react";
import { useLocation, Link } from "react-router-dom";
import PokemonCard from "./PokemonCard";

function PokemonInfo() {
  const location = useLocation();
  const pokemon = location.state?.pokeInfo;
  return (
    <div>
      <div>{pokemon && <PokemonCard pokemon={pokemon} />}</div>
      <div>
        <Link to="/">Back to Home</Link>
      </div>
      <div>
        <Link to="/app">Back to Pokedex</Link>
      </div>
    </div>
  );
}

export default PokemonInfo;
