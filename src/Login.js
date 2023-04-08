import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashboard from "./Account/Dashboard";

function Login({ user, setUser, userRef }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  useEffect(() => {
    try {
      if (sessionStorage.getItem("user")) {
        var check = JSON.parse(sessionStorage.getItem("user")).authToken;
        if (check == null) {
          return;
        }
        userRef.current = JSON.parse(sessionStorage.getItem("user"));
      }
    } catch (err) {
      console.log(err);
    }
    setUser(userRef.current);
  }, []);

  useEffect(() => {
    if (user?.authToken) {
      var authorizationTokens = user.authToken;
      const bearerToken = authorizationTokens
        .split(";")[0]
        .replace("Bearer=", "");
      const refreshToken = authorizationTokens
        .split(";")[1]
        .replace("Refresh=", "");

      setAccessToken(bearerToken);
      setRefreshToken(refreshToken);
    }
  }, [user]);

  useEffect(() => {
    if (userRef.current)
      userRef.current.authToken = `Bearer=${accessToken};Refresh=${refreshToken}`;
  }, [accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HOSTED_SERVER}/login`,
        {
          username,
          password,
        }
      );

      const storedUser = {
        username: res.data.user.username,
        role: res.data.user.role,
        authToken: res.headers["authorization"],
      };

      sessionStorage.setItem("user", JSON.stringify(storedUser));
      setUser(storedUser);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="dashboard">
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
            placeholder=" Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
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
