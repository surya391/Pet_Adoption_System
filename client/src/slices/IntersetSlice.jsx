import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Async Thunk for creating interest
export const serviceProCreateInterest = createAsyncThunk(
  "interest/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/interest/create`, data,{
        headers:{
            Authorization : localStorage.getItem('token') 
        }
    });
      console.log("AAA",response.data)
      return response.data;
    } catch (error) {
        console.log(error)
      return rejectWithValue(error?.response?.data?.error);
    }
  }
);

const interestSlice = createSlice({
  name: "interest",
  initialState: {
    interest: null,
    serverError: null,
    interestLoading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(serviceProCreateInterest.pending, (state) => {
        state.interestLoading = true;
        state.serverError = null;
      })
      .addCase(serviceProCreateInterest.fulfilled, (state, action) => {
        state.interestLoading = false;
        state.interest = action.payload;
        state.serverError = null;
      })
      .addCase(serviceProCreateInterest.rejected, (state, action) => {
        state.interestLoading = false;
        state.serverError = action.payload;
      });
  },
});

export default interestSlice.reducer;
