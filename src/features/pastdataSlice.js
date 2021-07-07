import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { formatData } from "../utils";

export const fetchPastdata = createAsyncThunk('pastdata/fetchPastdata', async (endpoint) => {
  console.log(endpoint)
  let response = await fetch(endpoint)
  const data = await response.json();
  let formattedData = formatData(data);
  return formattedData
})

const initialState = {
  pastdata: {},
  status: 'idle',
  error: null
}

const pastdataSlice = createSlice({
  name: 'pastdata',
  initialState,
  reducers: {
    },
    extraReducers: {
      [fetchPastdata.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchPastdata.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        state.pastdata = action.payload
      },
      [fetchPastdata.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      }
    },

})

export const { pastdataAdded } = pastdataSlice.actions

export default pastdataSlice.reducer

export const selectAllPastdata = state => state.pastdata.pastdata

export const selectPastdataById = (state, pastdataId) =>
  state.pastdata.pastdata.find(pastdata => pastdata.id === pastdataId)