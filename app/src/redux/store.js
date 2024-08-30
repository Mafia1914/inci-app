import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Actions/autheSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },

});
