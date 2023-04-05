import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

function Report({ id, accessToken, setAccessToken, refreshToken }) {
  const [reportTable, setReportTable] = useState("");

  useEffect(() => {
    const updateTable = (data) => {
      var chart = "Chart goes here";
      switch (id) {
        case 1:
          chart = data;
          break;
        case 2:
          chart = data;
          break;
        case 3:
          chart = data;
          break;
        case 4:
          chart = data;
          break;
        case 5:
          chart = data;
          break;
        default:
          chart = "No chart available";
      }
      setReportTable(chart);
    };
    const start = async () => {
      try {
        const res = await axiosJWT.get(
          `http://localhost:3001/report?id=${id}`,
          {
            headers: {
              authorization:
                "Bearer=" + accessToken + ";Refresh=" + refreshToken,
            },
          }
        );
        updateTable(JSON.stringify(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    start();
  }, [id]);

  const refreshAccessToken = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3001/requestNewAccessToken",
        {},
        {
          headers: {
            authorization: "Bearer=" + accessToken + ";Refresh=" + refreshToken,
          },
        }
      );
      return res.headers.authorization;
    } catch (err) {
      console.log(err);
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const newToken = await refreshAccessToken();
        var newUserObj = JSON.parse(sessionStorage.getItem("user"));
        newUserObj.authToken = newToken;
        sessionStorage.setItem("user", JSON.stringify(newUserObj));
        config.headers["authorization"] = newToken;
        const newAccessToken = newToken.split(";")[0].replace("Bearer=", "");
        setAccessToken(newAccessToken);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
      <div>Report {id && id}</div>
      <div> {reportTable && reportTable}</div>
    </>
  );
}

export default Report;
