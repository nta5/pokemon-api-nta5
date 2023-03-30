import React, { useState, useEffect } from "react";
import Search from "./Search";
import FilteredPokemon from "./FilteredPokemon";

function App() {
  const [typesSelectedArray, setTypesSelectedArray] = useState([]);
  return (
    <>
      <Search
        typesSelectedArray={typesSelectedArray}
        setTypesSelectedArray={setTypesSelectedArray}
      />
      <FilteredPokemon typesSelectedArray={typesSelectedArray} />
    </>
  );
}

export default App;
