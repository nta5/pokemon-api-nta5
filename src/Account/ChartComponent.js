import { Bar, Line } from "react-chartjs-2";

function BarChart({ chartData, chartTitle }) {
  return (
    <Bar
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: chartTitle,
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
function LineChart({ chartData, chartTitle }) {
  return (
    <Line
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: chartTitle,
          },
          legend: {
            display: false,
          },
        },
      }}
    />
  );
}
export { BarChart, LineChart };
