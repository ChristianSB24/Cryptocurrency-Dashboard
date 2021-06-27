import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPosts, fetchPosts } from './postsSlice'

export const PostsList = () => {
  const dispatch = useDispatch()
  const posts = useSelector(selectAllPosts)
  const postStatus = useSelector(state => state.posts.status)

  const ws = useRef(null);
  let first = useRef(false);
  const url = "https://api.pro.coinbase.com";
  useEffect(() => {
    ws.current = new WebSocket("wss://ws-feed.pro.coinbase.com");
    if (postStatus === 'idle') {
      dispatch(fetchPosts({url}))
    }
    first.current = true;
  }, [postStatus, dispatch])

  // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  console.log(posts)

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
