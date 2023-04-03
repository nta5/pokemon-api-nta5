import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./Navbar";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
    </Router>
  </React.StrictMode>
);
