import Report from "./Report";

function Dashboard({ accessToken, setAccessToken, refreshToken }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <ul>
          <li>
            <h2>Report 1 - Unique API users over a period of time</h2>
            <Report
              id={1}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              refreshToken={refreshToken}
            />
          </li>
          <li>
            <h2>Report 2 - Top API users over period of time</h2>
            <Report
              id={2}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              refreshToken={refreshToken}
            />
          </li>
          <li>
            <h2>Report 3 - Top users for each Endpoint</h2>
            <Report
              id={3}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              refreshToken={refreshToken}
            />
          </li>
          <li>
            <h2>Report 4 - 4xx Errors By Endpoint</h2>
            <Report
              id={4}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              refreshToken={refreshToken}
            />
          </li>
          <li>
            <h2>Report 5 - Recent 4xx/5xx Errors</h2>
            <Report
              id={5}
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              refreshToken={refreshToken}
            />
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
