import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const createOwnerSecret  = createAsyncThunk( "post/paymentOwnerId",  async( formData, { rejectWithValue }  ) => {
    try {
        const response = await axiosInstance.post( "/payment/create-payment-intent",  formData, {
            headers : {
                Authorization : localStorage.getItem( "token" )
            }
        })
        return response.data.clientSecret
    } catch (error) {
        console.log( error );
        return rejectWithValue( error?.response?.data?.error );
    }
})


const PaymentSlice = createSlice( { 
    name : "payment",
    initialState : {
        clientSecret: "",
        paymentPageOpen: false,
        isLoading :  false,
        serverError : null,
        paymentSuccessed : false
    },
    reducers : {
        setClientSecret : ( state, action ) => {
            state.clientSecret = action.payload ;
        }
    },
    extraReducers : ( builders ) => {
        builders.addCase( createOwnerSecret.pending , ( state ) => {
            state.isLoading = true 
        }) 
        builders.addCase( createOwnerSecret.fulfilled , ( state, action ) => {
            state.isLoading = false;
            state.serverError = null;
            state.clientSecret = action.payload; 
            state.paymentPageOpen = true;
        }) 
        builders.addCase( createOwnerSecret.rejected , ( state, action ) => {
            state.isLoading = false;
            state.serverError = action.payload;
            state.clientSecret =  ""; 
            state.paymentPageOpen = false;

        }) 
    }
} )

export default PaymentSlice.reducer;