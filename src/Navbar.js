import React from "react";
import Login from "./Login";
import App from "./App";
import PokemonInfo from "./PokemonInfo";
import { Routes, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/app">App</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/pokeInfo" element={<PokemonInfo />} />
        <Route path="/*" element={<Login />}>
          <Route path="report/:id" element={<></>} />
        </Route>
      </Routes>
    </div>
  );
}

export default Navbar;
