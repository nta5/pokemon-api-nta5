import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import { Outlet } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });
      setUser(res.data.user);

      var authorizationTokens = res.headers["authorization"];
      const bearerToken = authorizationTokens
        .split(";")[0]
        .replace("Bearer=", "");
      const refreshToken = authorizationTokens
        .split(";")[1]
        .replace("Refresh=", "");

      setAccessToken(bearerToken);
      setRefreshToken(refreshToken);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {user?.username ? (
        <>
          <h1>Welcome {user.username}</h1>
          <Dashboard
            accessToken={accessToken}
            setAccessToken={setAccessToken}
            refreshToken={refreshToken}
          />
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <span> Admin Login </span>
          <br />
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
      )}
      <Outlet />
    </div>
  );
}

export default Login;
