
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials= true;
export const loginUser = createAsyncThunk(
  'auth/loginUser',
async ({ email, password },{rejectWithValue}) => {
  console.log('email, password: ', email, password);
  try{
    const response = await axios.post('http://localhost:7080/logininfo', {  email, password });
    
  console.log('response redux' , response.data)
  
  return response.data;
  }
  catch(err){
    console.log('error',err)
    return rejectWithValue(err.message);
  }
}
);
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
  try{
    console.log('logout')
   const response= await axios.post('http://localhost:7080/logout');
    return response.data;
  }
  catch(err){
    return (err.message);
  }
  }
);
const initialState = {
  user: null,
  error: null,
  loading: false,
  logged:false,
  token:null,
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
          state.logged=false;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
          state.loading = false;
          state.user = action.payload.user;
         state.logged=true;
         console.log('state', state.logged)
      
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
      state.error = action.payload;
      console.log('error payload' , action.payload)
      state.logged = false;
        })
        .addCase(logoutUser.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.logged = true;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.loading = false;
          state.user = null;
          state.logged = false;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          console.log('error logout' , state.error)
          state.logged = true;
        });
  
  },
});


export default authSlice.reducer;
