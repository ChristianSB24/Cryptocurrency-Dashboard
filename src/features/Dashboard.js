import React from "react";
import { Line } from "react-chartjs-2";
import "../index.css";

function Dashboard({ price, data }) {
  let pastData = JSON.parse(JSON.stringify(data))
  console.log(pastData)

  const opts = {
    tooltips: {
      intersect: false,
      mode: "index"
    },
    responsive: true,
    maintainAspectRatio: false
  };
  if (price === "0.00") {
    return <h3>Please select a currency pair</h3>;
  }
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>

      <div className="chart-container">
        <Line data={pastData} options={opts} />
      </div>
    </div>
  );
}

export default Dashboard;