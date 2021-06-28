import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (endpoint) => {
  let response
  const url = endpoint.url
  response = await fetch(url + "/products")
  let data = await response.json();
  endpoint.pairs = data
  // let filtered = data.filter(word => word.quote_currency === "USD");
  let filtered = endpoint.pairs.filter((pair) => {
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
  console.log(filtered)
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