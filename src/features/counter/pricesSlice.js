import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { formatData } from "../../utils";

export const fetchPrice = createAsyncThunk('prices/fetchPrices', async (endpoint) => {
  let response = await fetch(endpoint)
  const data = await response.json();
  let formattedData = formatData(data);
  return formattedData
})

const initialState = {
  prices: {},
  status: 'idle',
  error: null
}

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    },
    extraReducers: {
      [fetchPrice.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchPrice.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        // state.prices = state.prices.concat(action.payload)
        state.prices = action.payload
      },
      [fetchPrice.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }
    },

})

export const { priceAdded, reactionAdded } = pricesSlice.actions

export default pricesSlice.reducer

export const selectAllPrices = state => state.prices.prices

export const selectPostById = (state, postId) =>
  state.posts.posts.find(post => post.id === postId)