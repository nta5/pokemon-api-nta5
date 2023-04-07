import React, { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

function FilteredPokemon({
  pokemons,
  searchName,
  typesSelectedArray,
  setPokemonCount,
  pageNumber,
}) {
  const filterTypes = (pokemon) => {
    if (typesSelectedArray.length == 0) {
      return true;
    } else {
      return typesSelectedArray.every((type) => pokemon.type.includes(type));
    }
  };

  const filterName = (pokemon) => {
    if (searchName == "") {
      return true;
    } else {
      searchName = searchName.toLowerCase();
      return pokemon.name.english.toLowerCase().includes(searchName);
    }
  };

  const pokemonPerPage = 10;
  const startIndex = (pageNumber - 1) * pokemonPerPage;
  const endIndex = startIndex + pokemonPerPage;
  pokemons = pokemons.filter(filterName);
  pokemons = pokemons.filter(filterTypes);

  const [popupId, setPopupId] = useState(null);
  const onClickHandler = (id) => {
    if (id == popupId) {
      setPopupId(null);
    } else {
      setPopupId(id);
    }
  };

  useEffect(() => {
    setPokemonCount(pokemons.length);
  }, [typesSelectedArray, searchName]);

  return (
    <div>
      <div className="pokemons">
        {pokemons
          .map((pokemon) => (
            <div key={pokemon.id}>
              <div
                className="pokemon-container"
                key={pokemon.id}
                onClick={() => onClickHandler(pokemon.id)}
              >
                <img
                  className="pokemon-image"
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
                    pokemon.id
                  ).padStart(3, "0")}.png`}
                  alt={pokemon.name.english}
                />
                <div>{pokemon.name.english}</div>
                <div>{pokemon.type.map((type) => type + " ")}</div>
              </div>
              <div
                className="pokemon-popup"
                style={{ display: popupId == pokemon.id ? "" : "none" }}
              >
                <PokemonCard pokemon={pokemon}></PokemonCard>
              </div>
            </div>
          ))
          .slice(startIndex, endIndex)}
      </div>
    </div>
  );
}

export default FilteredPokemon;
