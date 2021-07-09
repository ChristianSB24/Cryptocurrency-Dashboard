import React from "react";
import { Line } from "react-chartjs-2";
import "../index.css";

function Dashboard({ price, data }) {
  let pastData = JSON.parse(JSON.stringify(data))
  const opts = {
    tooltips: {
      intersect: false,
      mode: "index",
      backgroundcolor: 'rgba(10, 0, 0, 0.8)'
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  if (price === "0.00") {
    return <h3>Please select a currency pair</h3>;
  }
  console.log('here')
  return (
    <div className="dashboard">
      <h2>{`$${price}`}</h2>

      <div className="chart-container">
        <Line data={pastData} options={opts} />
      </div>
      <p> Some currencies do not have sufficient data for the 10 month chart. </p>
    </div>
  );
}

export default Dashboard;