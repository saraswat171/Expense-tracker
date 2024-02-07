
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const loginUser = createAsyncThunk(
  'auth/loginUser',
async ({ name, email, password }) => {
  const response = await axios.post('http://localhost:7080/logininfo', { name, email, password });
  return response.data;
}
);
const initialState = {
  user: null,
  error: null,
  loading: false,
  logged:false,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: { },
    
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
          state.loading = false;
          state.user = action.payload;
         state.logged=true;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
      state.error = action.payload;
        });
    
  
  },
});


export default authSlice.reducer;
