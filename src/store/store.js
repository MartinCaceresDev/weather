import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice'

const store = configureStore({
  reducer: {
    weatherStore: weatherReducer,
  }
});

export default store;