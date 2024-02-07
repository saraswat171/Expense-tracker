

import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './registerSlice';
import authReducer from './authSlice'
import TranctionReducer from './tranctionSlice'


export default configureStore({
  reducer: {
    register: registerReducer,
    auth: authReducer,
    Tranction: TranctionReducer,
  },
});

