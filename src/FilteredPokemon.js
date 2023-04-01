import React from "react";

function FilteredPokemon({
  pokemons,
  typesSelectedArray,
  setPokemonCount,
  pageNumber,
}) {
  const pokemonPerPage = 10;
  const startIndex = (pageNumber - 1) * pokemonPerPage;
  const endIndex = startIndex + pokemonPerPage;

  const filterTypes = (pokemon) => {
    if (typesSelectedArray.length == 0) {
      return true;
    } else {
      return typesSelectedArray.every((type) => pokemon.type.includes(type));
    }
  };

  pokemons = pokemons.filter(filterTypes);
  setPokemonCount(pokemons.length);
  pokemons = pokemons.slice(startIndex, endIndex);

  return (
    <div class="pokemon-container">
      {pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <img
            class="pokemon-image"
            src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
              pokemon.id
            ).padStart(3, "0")}.png`}
            alt={pokemon.name.english}
          />
          <div>
            {pokemon.name.english}, {pokemon.type}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FilteredPokemon;
