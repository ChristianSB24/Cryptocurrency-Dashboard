import React, {useEffect, useState, useRef} from "react";
import {selectAllPastdata} from './pastdataSlice'
import { useSelector } from 'react-redux'
import { Line } from "react-chartjs-2";
import "../index.css";

function Dashboard({ price, data, segment}) {
  const [current, setcurrent] = useState([]);
  const past = useSelector(selectAllPastdata)
  let first = useRef(false);
  // let test = []
  console.log(past)
  let minuteSeg = false
  if (segment === 'minute') {
    minuteSeg = true
  }
  
  useEffect(() => {
    setcurrent(JSON.parse(JSON.stringify(data)))
  }, [data])

  useEffect(() => {
    if (!first.current) {
      first.current = true;
      return;
    }
    // if (current.datasets[0] === undefined) {
    //   return
    // }
    if (minuteSeg === true) {
      if (current.datasets[0].data.length > 300) {
        current.datasets[0].data.pop()
      }
      if (current.labels.length > 301) {
        current.labels.pop()
      }
      var now = new Date()
      let currTime = `${now.getHours()}:${now.getMinutes()}`
      let x = []
      x = currTime
      console.log(String(x))
      let z = current.labels.concat(String(x))
      current.labels = z
      console.log(current.labels)
      let a = []
      a = parseFloat(price)
      console.log(a)
      let b = current.datasets[0].data.concat(a)
      current.datasets[0].data = b
    }
  }, [price, current.datasets, minuteSeg, current])


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
        <Line data={current} options={opts} />
      </div>
      <p> Some currencies do not have sufficient data for the 10 month chart. </p>
    </div>
  );
}

export default Dashboard;