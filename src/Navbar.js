import React from "react";
import Login from "./Login";
import App from "./App";
import { Routes, Route, Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/">App</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Navbar;
