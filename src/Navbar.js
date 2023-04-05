import React, { useState, useEffect } from "react";
import Login from "./Login";
import App from "./App";
import PokemonInfo from "./Pokedex/PokemonInfo";
import axios from "axios";
import { Routes, Route, Link } from "react-router-dom";
import Register from "./Account/Register";

function Navbar() {
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      if (sessionStorage.getItem("user")) {
        setUser(JSON.parse(sessionStorage.getItem("user")));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  const logout = () => {
    const start = async () => {
      try {
        const authToken = user.authToken;
        sessionStorage.removeItem("user");
        setUser({});
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
    start();
  };

  return (
    <div>
      <ul>
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
        <Route path="/*" element={<Login user={user} setUser={setUser} />}>
          <Route path="report/:id" element={<></>} />
        </Route>
      </Routes>
    </div>
  );
}

export default Navbar;
