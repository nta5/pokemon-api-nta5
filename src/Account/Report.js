import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { BarChart, LineChart } from "./ChartComponent";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

function Report({ id, accessToken, setAccessToken, refreshToken }) {
  const [reportTable, setReportTable] = useState("");

  useEffect(() => {
    const updateTable = (data) => {
      switch (id) {
        case 1:
          var title = "Unique API users over the last 7 days";
          var trackingDates = data.map((item) => item.tracking_date);
          var userCount = data.map((item) => item.count);
          var config = {
            labels: trackingDates,
            datasets: [
              {
                label: "Unique users",
                data: userCount,
                borderWidth: 1,
              },
            ],
          };
          return <LineChart chartData={config} chartTitle={title} />;
        case 2:
          var title = "Top API users over the last 7 days";
          var trackingDates = data.map((item) => item.user);
          var userCount = data.map((item) => item.count);
          var config = {
            labels: trackingDates,
            datasets: [
              {
                label: "API calls",
                data: userCount,
                borderWidth: 1,
              },
            ],
          };
          return <BarChart chartData={config} chartTitle={title} />;
        case 3:
          return JSON.stringify(data);
        case 4:
          return JSON.stringify(data);
        case 5:
          return JSON.stringify(data);
        default:
          return "No chart available";
      }
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
        console.log(res.data);
        const reportTable = updateTable(res.data);
        setReportTable(reportTable);
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
