import {createSlice} from '@reduxjs/toolkit'
import { userSlice } from './userSlice'

export const beerSlice = createSlice({
  name: 'beer',
  initialState: {
    beerList: [],
    currentBeer: {
      name: "",
      brewery: "",
      style: "",
      memo: "",
      intapped: null
    }
  },
  reducers: {
    setBeerList: (state, action) => {
      state.beerList = action.payload
    },
    setCurrentBeer: (state, action) => {
      state.currentBeer.name = action.payload.name
      state.currentBeer.brewery = action.payload.brewery
      state.currentBeer.style = action.payload.style
      state.currentBeer.memo = action.payload.memo
      state.currentBeer.untapped = action.payload.untapped
    }
  }
})

export const selectCurrentBeer = (state) => state.beer.currentBeer
export const selectBeerList = (state) => state.beer.beerList

export const {setBeerList, setCurrentBeer} = beerSlice.actions

export default beerSlice.reducer