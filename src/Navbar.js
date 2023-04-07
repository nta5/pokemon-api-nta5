import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./Login";
import App from "./App";
import PokemonInfo from "./Pokedex/PokemonInfo";
import Register from "./Account/Register";

import "./Navbar.css";

function Navbar() {
  const userRef = useRef(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("user")) {
        var check = JSON.parse(sessionStorage.getItem("user")).authToken;
        if (check == null) {
          return;
        }
        userRef.current = JSON.parse(sessionStorage.getItem("user"));
        setUser(userRef.current);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = async () => {
    try {
      const authToken = user.authToken;
      sessionStorage.removeItem("user");
      setUser({});
      userRef.current = null;
      await axios.post(
        "http://localhost:3001/logout",
        {},
        {
          headers: {
            authorization: authToken,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="nav-container">
      <ul className="nav-bar">
        <li>
            <h1>Pokedex</h1>
        </li>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/app">App</Link>
        </li>
        {!user?.username && (
          <li>
            <Link to="/register">Register</Link>
          </li>
        )}
        {user?.username && (
          <li>
            <Link to="/logout" onClick={logout}>
              Logout
            </Link>
          </li>
        )}
      </ul>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/pokeInfo" element={<PokemonInfo />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<>Logged out</>} />
        <Route
          path="/*"
          element={<Login user={user} setUser={setUser} userRef={userRef} />}
        />
      </Routes>
    </div>
  );
}

export default Navbar;
