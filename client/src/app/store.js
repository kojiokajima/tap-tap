import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/userSlice'
import beerReducer from '../features/beerSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    beer: beerReducer
  },
});
