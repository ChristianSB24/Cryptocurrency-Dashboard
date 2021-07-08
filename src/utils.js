export const formatDay = (data) => {
    let finalData = {
      labels: [],
      datasets: [
        {
          label: "Price",
          data: [],
          backgroundColor: "rgb(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 0.2)",
          fill: false
        }
      ]
    };
  
    let dates = data.map((val) => {
      const ts = val[0];
      let date = new Date(ts * 1000);
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
  
      let final = `${month}/${day}/${year}`;
      return final;
    });
  
    let priceArr = data.map((val) => {
      return val[4];
    });
  
    priceArr.reverse();
    dates.reverse();
    finalData.labels = dates;
    finalData.datasets[0].data = priceArr;
    return finalData;
  };

export const formatHour = (data) => {
  let finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        fill: false
      }
    ]
  };

  let dates = data.map((val) => {
    const ts = val[0];
    let date = new Date(ts * 1000);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let final;
    if (date.getHours() > 12) {
      hour = (date.getHours() - 12)
      final = `${hour}PM ${month}/${day}`
    }
    else if (date.getHours() === 12) {
      hour = 12
      final = `${hour}PM ${month}/${day}`
    }
    else if (date.getHours() === 0) {
      hour = 12
      final = `${hour}AM ${month}/${day}`
    }
    else {
      final = `${hour}AM ${month}/${day}`
    }
    return final;
  });

  let priceArr = data.map((val) => {
    return val[4];
  });

  priceArr.reverse();
  dates.reverse();
  finalData.labels = dates;
  finalData.datasets[0].data = priceArr;
  return finalData;
};

export const formatFifteen = (data) => {
  let finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        fill: false
      }
    ]
  };

  let dates = data.map((val) => {
    const ts = val[0];
    let date = new Date(ts * 1000);
    let month = date.getMonth();
    let day = date.getDate();
    let hour = date.getHours();
    let final;
    if (date.getHours() > 12) {
      hour = (date.getHours() - 12)
      final = `${hour}PM ${month}/${day}`
    }
    else if (date.getHours() === 12) {
      hour = 12
      final = `${hour}PM ${month}/${day}`
    }
    else if (date.getHours() === 0) {
      hour = 12
      final = `${hour}AM ${month}/${day}`
    }
    else {
      final = `${hour}AM ${month}/${day}`
    }
    return final;
  });

  let priceArr = data.map((val) => {
    return val[4];
  });

  priceArr.reverse();
  dates.reverse();
  finalData.labels = dates;
  finalData.datasets[0].data = priceArr;
  return finalData;
};

export const formatMinute = (data) => {
  let finalData = {
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        backgroundColor: "rgb(255, 99, 132, 0.8)",
        borderColor: "rgba(255, 99, 132, 0.2)",
        fill: false
      }
    ]
  };

  let dates = data.map((val) => {
    const ts = val[0];
    let date = new Date(ts * 1000);
    let minute = date.getMinutes();
    let hour = date.getHours();
    let final;
    if (date.getHours() > 12) {
      hour = (date.getHours() - 12)
      final = `${hour}:${minute}PM`
    }
    else if (date.getHours() === 12) {
      hour = 12
      final = `${hour}:${minute}PM`
    }
    else if (date.getHours() === 0) {
      hour = 12
      final = `${hour}:${minute}AM`
    }
    else {
      final = `${hour}:${minute}AM`
    }
    return final;

    // let final = `${hour}:${minute}`;
    // return final;
  });

  let priceArr = data.map((val) => {
    return val[4];
  });

  priceArr.reverse();
  dates.reverse();
  finalData.labels = dates;
  finalData.datasets[0].data = priceArr;
  return finalData;
};