import React, { useState, useEffect } from "react";
import axios from "axios";

function Search({ setSearchName, setTypesSelectedArray }) {
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

  const handleSearchChange = (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      setSearchName(e.target.value);
    } else {
      setSearchName("");
    }
  };

  return (
    <div className="search">
      <input
        className="search-bar"
        onChange={handleSearchChange}
        type="text"
        placeholder="Search"
      />

      <ul className="search-type-selector">
        {types.map((type) => (
          <li key={type.english}>
            <input
              type="checkbox"
              value={type.english}
              id={type.english}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={type.english}>{type.english}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
