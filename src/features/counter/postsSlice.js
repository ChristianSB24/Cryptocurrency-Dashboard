import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (endpoint) => {
  let response
  const {url} = endpoint
  response = await fetch(url + "/products")
  console.log(response)
  const data = await response.json();
  let filtered = data.filter(word => word.quote_currency === "USD");
  filtered = filtered.sort((a, b) => {
    if (a.base_currency < b.base_currency) {
      return -1;
      }
    if (a.base_currency > b.base_currency) {
      return 1;
      }
    return 0;
  });
  console.log(filtered)
  console.log(data)
  return filtered
})

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find(post => post.id === postId)
      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    },
    postAdded: {
        reducer(state, action) {
          state.posts.push(action.payload)
        },
        prepare(title, content, userId) {
          return {
            payload: {
              date: new Date().toISOString(),
              title,
              content,
              user: userId
            }
          }
        }
      },
      postUpdated(state, action) {
        const { id, title, content } = action.payload
        const existingPost = state.posts.find(post => post.id === id)
        if (existingPost) {
          existingPost.title = title
          existingPost.content = content
        }
      }
    },
    extraReducers: {
      [fetchPosts.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchPosts.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload)
      },
      [fetchPosts.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }
    },

})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPosts = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)