import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { formatData } from "../../utils";

export const fetchPrice = createAsyncThunk('prices/fetchPrices', async (endpoint) => {
  let response
  console.log(endpoint.historicalDataURL)
  response = await fetch(endpoint.historicalDataURL)
  console.log(response)
  const data = await response.json();
  console.log(data)
  let formattedData = formatData(data);
  return formattedData
})

const initialState = {
  prices: [],
  status: 'idle',
  error: null
}

const postsSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    reactionAdded(state, action) {
      const { priceId, reaction } = action.payload
      const existingPrice = state.prices.find(price => price.id === priceId)
      if (existingPrice) {
        existingPrice.reactions[reaction]++
      }
    },
    priceAdded: {
        reducer(state, action) {
          state.prices.push(action.payload)
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
      [fetchPrice.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchPrice.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts = state.prices.concat(action.payload)
      },
      [fetchPrice.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }
    },

})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer

export const selectAllPrices = state => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)