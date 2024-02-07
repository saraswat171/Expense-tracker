import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
axios.defaults.withCredentials= true;
export const Tranctiondone = createAsyncThunk(
    'Tranction/Tranctiondone',
  async ({ title,amount,category,description,tranctionstype,date },{rejectWithValue}) => {
   try{
    const response = await axios.post('http://localhost:7080/payment', { title,amount,category,description,tranctionstype,date });
    console.log("data get" , response)
    return response.data;
    
   }
   catch(err){
    return rejectWithValue(err.message);
   }
  }
);

export const TranctionGet = createAsyncThunk(
    'Tranction/TranctionGet',
  async () => {
   try{
    const response = await axios.get('http://localhost:7080/userTranctions');
    return response;

   }
   catch(err){
    return (err.message);
   }
  }
);

export const tranctionSlice = createSlice({
    name: 'Tranction',
    initialState: {
      loading: false,
      error: null,
      success:false,
      tranctiondata:null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(Tranctiondone.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(Tranctiondone.fulfilled, (state) => {
          state.loading = false;
          state.success=true;
          console.log(' state' , state.success)
          
        })
        .addCase(Tranctiondone.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(TranctionGet.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(TranctionGet.fulfilled, (state,action) => {
            state.loading = false;
            state.success=true;
            state.tranctiondata =action.payload.data;
            console.log(' state-data' , state.tranctiondata)
            
          })
          .addCase(TranctionGet.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
        
    },
  });
  
  export default Tranctiondone.reducer;