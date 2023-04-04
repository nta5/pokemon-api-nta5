import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function FilteredPokemon({
  pokemons,
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

  const pokemonPerPage = 10;
  const startIndex = (pageNumber - 1) * pokemonPerPage;
  const endIndex = startIndex + pokemonPerPage;
  pokemons = pokemons.filter(filterTypes);

  useEffect(() => {
    setPokemonCount(pokemons.length);
  }, [typesSelectedArray]);

  return (
    <div>
      <div className="pokemon-container">
        {pokemons
          .map((pokemon) => (
            <div key={pokemon.id}>
              <Link to="/pokeInfo" state={{ pokeInfo: pokemon }}>
                <img
                  className="pokemon-image"
                  src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
                    pokemon.id
                  ).padStart(3, "0")}.png`}
                  alt={pokemon.name.english}
                />
                <div>
                  {pokemon.name.english}, {pokemon.type}
                </div>
              </Link>
            </div>
          ))
          .slice(startIndex, endIndex)}
      </div>
    </div>
  );
}

export default FilteredPokemon;
