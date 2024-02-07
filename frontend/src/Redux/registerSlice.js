
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'register/registerUser',
  async ({ name, email, password },{rejectWithValue}) => {
   try{
    const response = await axios.post('http://localhost:7080/usersinfo', { name, email, password });
    return response.data;
   }
   catch(err){
    return rejectWithValue(err.message);
   }
  }
);

export const registerSlice = createSlice({
  name: 'register',
  initialState: {
    loading: false,
    error: null,
    success:false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success=true;
        console.log(' state' , state.success)
        
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;
