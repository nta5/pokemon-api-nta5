import React, { useState, useEffect } from "react";
import Search from "./Pokedex/Search";
import FilteredPokemon from "./Pokedex/FilteredPokemon";
import Pagination from "./Pokedex/Pagination";
import axios from "axios";
import "./App.css";

function App() {
  const [searchName, setSearchName] = useState("");
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
      setPokemonCount(res.data.length);
    }
    getPokemons();
  }, []);

  useEffect(() => {
    setPageNumber(1);
  }, [typesSelectedArray]);

  return (
    <>
      <Search
        setSearchName={setSearchName}
        setTypesSelectedArray={setTypesSelectedArray}
      />

      <h2>Page number {pageNumber}</h2>

      <FilteredPokemon
        pokemons={pokemons}
        searchName={searchName}
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
