import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'
import {selectAllPrices, fetchPrice} from './pricesSlice'
import Dashboard from "./Dashboard";
import Slider from "react-slick";
import "../../index.css";
import Logo from '../../logo.js'

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black" }}
        onClick={onClick}
      />
    );
  }

export const CryptoList = () => {
  const [pair, setpair] = useState('');
  const [price, setprice] = useState("0.00");
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(state => state.posts.status)
  const prices = useSelector(selectAllPrices)
  const settings = {
    className: "center",
    dots: true,
    focusOnSelect: true,
    centerMode: true,
    infinite: true,
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

  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
  }, [])

  if (postStatus === 'idle') {
    dispatch(fetchPosts(url))
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

    // let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);
    dispatch(fetchPrice(`${url}/products/${pair}/candles?granularity=86400`))
    // const fetchHistoricalData = async () => {
    //   let dataArr = [];
    //   await fetch(historicalDataURL)
    //     .then((res) => res.json())
    //     .then((data) => (dataArr = data));
      
    //   let formattedData = formatData(dataArr);
    //   setpastData(formattedData);
    // };

    // fetchHistoricalData();
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
  }, [pair, dispatch]);

  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub);
    setpair(e.target.value);
  };

  return (
    <div className='container'>
        <Slider {...settings} value={pair} onChange={handleSelect}>
        {posts.map((cur, idx) => {
            return (
                <div key={idx}>
                    <Logo pair={cur.base_currency}/>
                    <option className='card border-3 border-dark mx-3' value={cur.id} onClick={handleSelect}>
                        {cur.display_name}
                    </option>
                </div>
            );
        })}
        </Slider>
      <Dashboard price={price} data={prices}/>
      <div className='my-5 py-5'>
        <h5> Follow this link to set up email alerts for this cryptocurrency and others. </h5>
        <p> This service will provided in future developments of this application. </p>
        <a href="https://cryptocurrencyalerting.com/price-alert.html" class="btn btn-primary" role="button">Crypto Alerts</a>
      </div>
    </div>
  );
}
