import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null
  },
  reducers: {
    login: (state, action) => {
      state.user.currentUser = action.payload
    },
    logout: (state, action) => {
      state.user.currentUser = null
    },
  }
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer