import React from "react";

function PokemonCard({ pokemon }) {
  return (
    <div>
      <img
        className="pokemon-image"
        src={`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${String(
          pokemon.id
        ).padStart(3, "0")}.png`}
        alt={pokemon.name.english}
      />
      <div>
        <b>Name:</b> {pokemon.name.english}
      </div>
      <div>
        <b>Alias:</b> {pokemon.name.japanese}, {pokemon.name.chinese},{" "}
        {pokemon.name.french}
      </div>
      <div>
        <b>Type:</b>
        <ul>
          {pokemon.type.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
      </div>
      <div>
        <b>Stat:</b>
        <ul>
          <li>Hp: {pokemon.base.HP}</li>
          <li>Attack: {pokemon.base.Attack}</li>
          <li>Defense: {pokemon.base.Defense}</li>
          <li>Special Attack: {pokemon.base["Sp. Attack"]}</li>
          <li>Special Defense: {pokemon.base["Sp. Defense"]}</li>
        </ul>
      </div>
    </div>
  );
}

export default PokemonCard;
