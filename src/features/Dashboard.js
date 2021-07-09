import React, {useEffect, useState, useRef} from "react";
import { Line } from "react-chartjs-2";
import "../index.css";

function Dashboard({ price, data, segment}) {
  const [current, setcurrent] = useState([]);
  let first = useRef(false);
  let timer = useRef()
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
      var x = new Date()
      timer.current = x.getMinutes()
      return;
    }
    if (minuteSeg === true) {
      if (current.datasets[0].data.length > 300) {
        current.datasets[0].data.pop()
      }
      if (current.labels.length > 301) {
        current.labels.pop()
      }
      var now = new Date()
      let minute 
      if (now.getMinutes() < 10) {
        minute = '0' + now.getMinutes()
      }
      else {
        minute = now.getMinutes();
      }
      let hour = now.getHours();
      let final;
      if (now.getHours() > 12) {
        hour = (now.getHours() - 12)
        final = `${hour}:${minute}PM`
      }
      else if (now.getHours() === 12) {
        hour = 12
        final = `${hour}:${minute}PM`
      }
      else if (now.getHours() === 0) {
        hour = 12
        final = `${hour}:${minute}AM`
      }
      else {
        final = `${hour}:${minute}AM`
      }
      console.log(now.getMinutes())
      if (timer.current !== now.getMinutes()) {
        current.labels.push(final)
        current.labels.shift()
        timer.current = now.getMinutes()
      }
      current.labels.push(final)
      let a = []
      a = parseFloat(price)
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