import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'
import {selectAllPrices, fetchPrice} from './pricesSlice'

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(state => state.posts.status)
  const prices = useSelector(selectAllPrices)
  const pricesStatus = useSelector(state => state.prices.status)


  const ws = useRef(null);
  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";
  let pairs = [];
  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    if (postStatus === 'idle') {
      dispatch(fetchPosts({url, pairs}))
    }
    first.current = true;
  }, [postStatus, dispatch])

  useEffect(() => {
    console.log()
    //prevents this hook from running on initial render
    if (!first.current) {
      return;
    }

    let msg = {
      type: "subscribe",
      product_ids: [],
      channels: ["ticker"]
    };
    console.log()
  
    let jsonMsg = JSON.stringify(msg);
    // ws.current.send(jsonMsg);

    let historicalDataURL = `${url}/products/${posts}/candles?granularity=86400`;
    if (pricesStatus === 'idle') {
      dispatch(fetchPrice({historicalDataURL}))
    }
    ws.current.onmessage = (e) => {
      let data = JSON.parse(e.data);
      if (data.type !== "ticker") {
        return;
      }
    };
  //dependency array is passed pair state, will run on any pair state change
  }, [pricesStatus, dispatch]);

  const renderedPosts = posts.map(post => {
    return (
      <article className="post-excerpt" key={post.id}>
        <h3 className="post-content" >{post.base_currency}</h3>
      </article>
    )
  })
  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  )
}
