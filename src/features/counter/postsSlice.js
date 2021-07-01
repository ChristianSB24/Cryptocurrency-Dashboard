import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

let pairs =[]


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (endpoint) => {
  console.log(endpoint)
  let response = await fetch(endpoint + "/products")
  let data = await response.json();
  pairs = data
  let filtered = pairs.filter((pair) => {
    if (pair.quote_currency === "USD") {
      return pair;
    }
  });
  filtered = filtered.sort((a, b) => {
    if (a.base_currency < b.base_currency) {
      return -1;
      }
    if (a.base_currency > b.base_currency) {
      return 1;
      }
    return 0;
  });
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