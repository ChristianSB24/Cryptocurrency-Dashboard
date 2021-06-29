import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'
import {selectAllPrices, fetchPrice} from './pricesSlice'
import Dashboard from "./Dashboard";
import { formatData } from "../../utils";

export const PostsList = () => {
  const [pair, setpair] = useState('');
  const [price, setprice] = useState("0.00");
  const [pastData, setpastData] = useState({});
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(state => state.posts.status)
  const prices = useSelector(selectAllPrices)
  const priceStatus = useSelector(state => state.prices.status)


  const ws = useRef(null);
  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";
  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    if (postStatus === 'idle') {
      dispatch(fetchPosts(url))
      // first.current = true;
    }
  }, [postStatus, dispatch])
  console.log(first)
  
  console.log(ws.current)
  useEffect(() => {
    //prevents this hook from running on initial render
    if (!first.current) {
      return;
    }
    console.log(ws.current)

    let msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    console.log(pair)
  
    let jsonMsg = JSON.stringify(msg);
    // ws.current.onopen = () => ws.current.send(jsonMsg);
    ws.current.send(jsonMsg);
    console.log(priceStatus)
    let historicalDataURL = `${url}/products/${pair}/candles?granularity=86400`;
    console.log(historicalDataURL)
    if (priceStatus === 'idle') {
      console.log(pair)
      dispatch(fetchPrice({historicalDataURL}))
    }
    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }
      if (data.product_id === pair) {
        setprice(data.price)
      }
    };
    setpastData(prices)
  //dependency array is passed pair state, will run on any pair state change
  }, [prices, pair, priceStatus, dispatch]);

  const handleSelect = (e) => {
    let unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"]
    };
    let unsub = JSON.stringify(unsubMsg);

    ws.current.send(unsub);
    console.log(e.target.value)
    setpair(e.target.value);
  };
  console.log(prices)
  return (
    <div className="container">
      {
        <select name="currency" value={pair} onChange={handleSelect}>
          {posts.map((cur, idx) => {
            return (
              <option key={idx} value={cur.id}>
                {cur.display_name}
              </option>
            );
          })}
        </select>
      }
      <Dashboard price={price} data={pastData}/>
    </div>
  );
}

  // const renderedPosts = posts.map(post => {
  //   return (
  //     <article className="post-excerpt" key={post.id}>
  //       <h3 className="post-content" >{post.base_currency}</h3>
  //     </article>
  //   )
  // })
  // return (
  //   <section className="posts-list">
  //     <h2>Posts</h2>
  //     {renderedPosts}
  //   </section>
  // )
