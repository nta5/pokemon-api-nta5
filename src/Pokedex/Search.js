import React, { useState, useEffect } from "react";
import axios from "axios";

function Search({ typesSelectedArray, setTypesSelectedArray }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    async function fetchTypes() {
      const response = await axios.get(
        "https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json"
      );
      setTypes(response.data);
    }
    fetchTypes();
  }, []);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setTypesSelectedArray((typesSelectedArray) => [
        ...typesSelectedArray,
        value,
      ]);
    } else {
      setTypesSelectedArray((typesSelectedArray) =>
        typesSelectedArray.filter((type) => type !== value)
      );
    }
  };

  return (
    <div>
      {types.map((type) => (
        <div key={type.english}>
          <input
            type="checkbox"
            value={type.english}
            id={type.english}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={type.english}>{type.english}</label>
        </div>
      ))}
    </div>
  );
}

export default Search;
