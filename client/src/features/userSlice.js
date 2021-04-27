import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null
  },
  reducers: {
    login: (state, action) => {
      // console.log("WHAT IS THIS ", state.currentUser);
      // console.log("WHAT IS THIS2 ", action.payload);
      state.currentUser = action.payload
    },
    logout: (state, action) => {
      state.currentUser = null
    },
  }
})

export const selectStore = (state) => state
export const selectUser = (state) => state.user.currentUser;

export const { login, logout } = userSlice.actions

export default userSlice.reducer