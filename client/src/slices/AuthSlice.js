import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosInstance'

export const verifyAccount = createAsyncThunk('put/verifyAccount', async({  userId, token, isVerified }, { rejectWithValue })=>{
    console.log(userId)
    console.log(token)
    console.log(isVerified)

    try {
        const response = await axiosInstance.put(`/auth/verify?userId=${userId}&token=${token}`,{ isVerified })
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})

const authSlice = createSlice({
    name:'auth',
    initialState:{
        serverError:null,
        isLoading:false,
        isLoggedIn:false,
        userInfo:null
    },
    reducers:{
        logOut:(state)=>{
            state.serverError = null
            state.isLoading = false
            state.isLoggedIn = false
            state.userInfo = null
        }
    },
    extraReducers:(builders)=>{
        builders.addCase(verifyAccount.pending, (state)=>{
            state.isLoading = true
        })
        builders.addCase(verifyAccount.fulfilled, (state)=>{
            state.isLoading = false;
            state.serverError = null; 
        })
        builders.addCase(verifyAccount.rejected, (state,action)=>{
            state.isLoading = false;
            state.serverError = action.payload; 
        })
    }
})

export const { logOut } = authSlice.actions; 
export default authSlice.reducer;