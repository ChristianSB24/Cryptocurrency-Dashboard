import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Slider from "react-slick";
import "./index.css";
import { selectAllPosts, fetchPosts } from './features/postsSlice'
import {selectAllPrices, fetchPrice} from './features/pricesSlice'
import Dashboard from "./features/Dashboard";
import {SampleNextArrow, SamplePrevArrow} from "./features/Arrows"
import Logo from './Logos/logo.js'

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

    let jsonMsg = JSON.stringify(msg);
    ws.current.send(jsonMsg);

    dispatch(fetchPrice(`${url}/products/${pair}/candles?granularity=86400`))
    
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
        <Slider {...settings} value={pair}>
        {posts.map((cur, idx) => {
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
      <Dashboard price={price} data={prices}/>
      <div className='my-5 py-5'>
        <h5> Follow this link to set up alerts for this cryptocurrency and others. </h5>
        <p> This service will be provided in future developments of this application. </p>
        <a href="https://cryptocurrencyalerting.com/price-alert.html" className="btn btn-outline-success" role="button">Crypto Alerts</a>
      </div>
    </div>
  );
}

export default CryptoList;
