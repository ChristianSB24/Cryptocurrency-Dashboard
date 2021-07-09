import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Slider from "react-slick";
import "./index.css";
import { selectAllProducts, fetchProducts } from './features/productsSlice'
import {selectAllPastdata, fetchPastdata} from './features/pastdataSlice'
// import Dashboard from "./features/Dashboard";
import Dashboard from "./features/Dashboard2";
import {SampleNextArrow, SamplePrevArrow} from "./features/Arrows"
import Logo from './Logos/logo.js'

export const CryptoList = () => {
  const [pair, setpair] = useState('');
  const [price, setprice] = useState("0.00");
  const [timesegment, settimesegment] = useState('')
  const dispatch = useDispatch()
  const products = useSelector(selectAllProducts)
  const productStatus = useSelector(state => state.products.status)
  const pastdata = useSelector(selectAllPastdata)

  const settings = {
    className: "center",
    dots: true,
    focusOnSelect: true,
    centerMode: true,
    infinite: true,
    lazyLoad: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };


  const ws = useRef(null);
  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";
  const isDetail = pair === ''

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    console.log('x')
  }, [])

  if (productStatus === 'idle') {
    dispatch(fetchProducts(url))
  }

  useEffect(() => {
    //prevents this hook from running on initial render
    if (!first.current) {
      first.current = true;
      return;
    }


    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };

    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);
    // Create if statements here that will fetch either the day, hour, or minute time segments based on the timesegment variable. 
    // Will need to create seperate fetch functions for these. Will also need to create seperate format functions in utils.js
    if (timesegment === 'day') {
      let historicalurl = `${url}/products/${pair}/candles?granularity=86400`;
      dispatch(fetchPastdata({historicalurl, timesegment}))
    }
    if (timesegment === 'hour') {
      let historicalurl = `${url}/products/${pair}/candles?granularity=3600`;
      dispatch(fetchPastdata({historicalurl, timesegment}))
    }
    if (timesegment === 'fifteen') {
      let historicalurl = `${url}/products/${pair}/candles?granularity=900`;
      dispatch(fetchPastdata({historicalurl, timesegment}))
    }
    if (timesegment === 'minute') {
      let historicalurl = `${url}/products/${pair}/candles?granularity=60`;
      dispatch(fetchPastdata({historicalurl, timesegment}))
    }

    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }
      if (data.product_id === pair) {
        setprice(data.price);
      }
    };

  //dependency array is passed pair state, will run on any pair state change
  }, [pair, dispatch, timesegment]);

  const handleSelect = (e) => {
    console.log(e.target.value)
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub);
    setpair(e.target.value);
    settimesegment('day')
  };

  const handleMinute = (event) => {
    event.preventDefault()
    settimesegment('minute')
  }
  const handleFifteen = (event) => {
    event.preventDefault()
    settimesegment('fifteen')
  }
  const handleHour = (event) => {
    event.preventDefault()
    settimesegment('hour')
  }
  const handleDay = (event) => {
    event.preventDefault()
    settimesegment('day')
  }
  return (
    <div className='container'>
        <Slider {...settings} value={pair}>
        {products.map((cur, idx) => {
            return (
                <div key={idx}>
                    <Logo pair={cur.base_currency}/>
                    <option className='btn btn-outline-dark mx-5 m-3' role="button" value={cur.id} onClick={handleSelect}>
                        {cur.display_name}
                    </option>
                </div>
            );
        })}
        </Slider>
      <Dashboard price={price} data={pastdata} segment={timesegment}/>
      {isDetail === true ? null : <button className='btn btn-outline-dark' onClick={handleMinute}> 5H </button>}
      {isDetail === true ? null : <button className='btn btn-outline-dark' onClick={handleFifteen}> 3D </button>}
      {isDetail === true ? null : <button className='btn btn-outline-dark' onClick={handleHour}> 2W </button>}
      {isDetail === true ? null : <button className='btn btn-outline-dark' onClick={handleDay}> 10M </button>}
      <div className='my-5 py-5'>
        <h5> Follow this link to set up alerts for this cryptocurrency and others. </h5>
        <p> This service will be provided in future developments of this application. </p>
        <a href="https://cryptocurrencyalerting.com/price-alert.html" className="btn btn-outline-success" role="button">Crypto Alerts</a>
      </div>
    </div>
  );
}

export default CryptoList;
