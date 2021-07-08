import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


export const fetchProducts = createAsyncThunk('products/fetchProducts', async (endpoint) => {
  let response = await fetch(endpoint + "/products")
  let data = await response.json();
  let filtered = data.filter((pair) => {
    if (pair.quote_currency === "USD" & (pair.base_currency === "BTC" || pair.base_currency === "ETH" || pair.base_currency === "DOGE" 
    || pair.base_currency === "LTC" || pair.base_currency === "ADA" || pair.base_currency === "ATOM" || pair.base_currency === "DOT"
    || pair.base_currency === "UNI")){
      return pair;
    }
    else {
      return null
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
  products: [],
  status: 'idle',
  error: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    },
    extraReducers: {
      [fetchProducts.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchProducts.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.products = state.products.concat(action.payload)
      },
      [fetchProducts.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }
    },

})

export const {  productsAdded } = productsSlice.actions

export default productsSlice.reducer

export const selectAllProducts = state => state.products.products

export const selectProductById = (state, productId) =>
  state.products.products.find(product => product.id === productId)