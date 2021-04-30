import {createSlice} from '@reduxjs/toolkit'

export const beerSlice = createSlice({
  name: 'beer',
  initialState: {
    beerList: [],
    currentBeer: {
      id: null,
      userId: null,
      name: "",
      brewery: "",
      style: "",
      memo: "",
      untapped: null,
      favorite: null
    },
    isModalOpen: false,
    isBlankModalOpen: false
  },
  reducers: {
    setBeerList: (state, action) => {
      state.beerList = action.payload
    },
    setCurrentBeer: (state, action) => {      
      state.currentBeer.id = action.payload.id
      state.currentBeer.userId = action.payload.userId
      state.currentBeer.name = action.payload.name
      state.currentBeer.brewery = action.payload.brewery
      state.currentBeer.style = action.payload.style
      state.currentBeer.memo = action.payload.memo
      state.currentBeer.untapped = action.payload.untapped
      state.currentBeer.favorite = action.payload.favorite
    },
    toggleIsModalOpen: (state, action) => {
      state.isModalOpen = !state.isModalOpen
    },
    toggleIsBlankModalOpen: (state, action) => {
      state.isBlankModalOpen = !state.isBlankModalOpen
    },
    setAndShowModal: (state, action) => {
      setCurrentBeer(state, action)
      toggleIsModalOpen(state, action)
      console.log("Hi This Is Me");
    },
    test: (state, action) => {
      console.log("TEST DISPATCH");
    }
  }
})

export const selectCurrentBeer = (state) => state.beer.currentBeer
export const selectBeerList = (state) => state.beer.beerList
export const selectIsModalOpen = (state) => state.beer.isModalOpen
export const selectIsBlankModalOpen = (state) => state.beer.isBlankModalOpen

export const {setBeerList, setCurrentBeer, toggleIsModalOpen, toggleIsBlankModalOpen, setAndShowModal, test} = beerSlice.actions

export default beerSlice.reducer