import React, { useState, useEffect } from "react";
import Search from "./Search";
import FilteredPokemon from "./FilteredPokemon";
import Pagination from "./Pagination";
import axios from "axios";
import "./App.css";

function App() {
  const [typesSelectedArray, setTypesSelectedArray] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [pokemonCount, setPokemonCount] = useState([]);
  const [pageNumber, setPageNumber] = useState([1]);

  useEffect(() => {
    async function getPokemons() {
      const res = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
      );

      setPokemons(res.data);
    }
    getPokemons();
  }, []);

  return (
    <>
      <Search
        typesSelectedArray={typesSelectedArray}
        setTypesSelectedArray={setTypesSelectedArray}
      />
      <FilteredPokemon
        pokemons={pokemons}
        typesSelectedArray={typesSelectedArray}
        setPokemonCount={setPokemonCount}
        pageNumber={pageNumber}
      />
      <Pagination
        pokemonCount={pokemonCount}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
}

export default App;
