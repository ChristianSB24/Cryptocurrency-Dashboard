import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { formatDay, formatHour, formatFifteen, formatMinute } from "../utils";

export const fetchPastdata = createAsyncThunk('pastdata/fetchPastdata', async (endpoint) => {
  console.log(endpoint)
  let response = await fetch(endpoint.historicalurl)
  const data = await response.json();
  console.log(data)
  let formattedData
  if (endpoint.timesegment === `day`) {
    formattedData = formatDay(data)
  }
  if (endpoint.timesegment === `hour`) {
    formattedData = formatHour(data)
  }
  if (endpoint.timesegment === `fifteen`) {
    formattedData = formatFifteen(data)
  }
  if (endpoint.timesegment === `minute`) {
    formattedData = formatMinute(data)
  }
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