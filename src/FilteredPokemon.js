import React, { useState, useEffect } from "react";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

function FilteredPokemon({ typesSelectedArray }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    async function fetchPokemon() {
      const response = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json"
      );
      setPokemons(response.data);
    }
    fetchPokemon();
  }, []);

  const filterTypes = (pokemonType) => {
    if (typesSelectedArray.length == 0) {
      return true;
    } else {
      return typesSelectedArray.every((type) => pokemonType.includes(type));
    }
  };
  return (
    <div>
      {pokemons.map(
        (pokemon) =>
          filterTypes(pokemon.type) && (
            <div key={pokemon.id}>
              {pokemon.name.english}, {pokemon.type}
            </div>
          )
      )}
    </div>
  );
}

export default FilteredPokemon;
