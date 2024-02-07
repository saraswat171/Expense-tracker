
// store.js
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './registerSlice';
import authReducer from './authSlice'
export default configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
  },
});

