import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'
import beerReducer from '../features/beerSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    beer: beerReducer
  },
});
