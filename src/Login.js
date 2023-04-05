import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./Account/Dashboard";

function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/login", {
        username,
        password,
      });

      const storedUser = {
        username: res.data.user.username,
        role: res.data.user.role,
        authToken: res.headers["authorization"],
      };

      sessionStorage.setItem("user", JSON.stringify(storedUser));
      setUser(storedUser);

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
        user?.role == "admin" ? (
          <>
            <h1>Welcome {user.username}</h1>
            <Dashboard
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              refreshToken={refreshToken}
            />
          </>
        ) : (
          <>
            <h1>Welcome {user.username}</h1>
          </>
        )
      ) : (
        <form onSubmit={handleSubmit}>
          <span> Login </span>
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
    </div>
  );
}

export default Login;
