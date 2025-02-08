import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosInstance'
import { toast } from 'react-toastify'

export const userRegister = createAsyncThunk('post/userRegister',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/auth/signUp`,formData)
        toast.success("User registered successfully. Verification email sent.")
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})
export const verifyAccount = createAsyncThunk('put/verifyAccount', async({  userId, token, isVerified }, { rejectWithValue })=>{
    try {
        const response = await axiosInstance.put(`/auth/verify?userId=${userId}&token=${token}`,{ isVerified })
        toast.success('User verifyed successfully')
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})
export const userLogin = createAsyncThunk('post/userLogin',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/auth/signIn`,formData)
        toast.success('User Login successfully')
        localStorage.setItem('token',response.data.token)
        console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const sendEmailOtp = createAsyncThunk('post/sendEmailOtp',async(formData, {rejectWithValue})=>{
try {
    const response = await axiosInstance.post(`/auth/sendEmail/otp`,formData)
    toast.success("OTP sent successfully!")
    console.log('sendEmail', response.data)
    return response.data
} catch (error) {
    console.log(error)
    return rejectWithValue (error?.response?.data?.error)
}
})

export const verifyEmail = createAsyncThunk('post/verifyEmail',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post("auth/EmailVerify",formData)
        localStorage.setItem("token", response.data.token)
        toast.success("User Login Successfully")
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const getUser = createAsyncThunk(`get/getUser`,async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/auth/account`,{headers:{Authorization:localStorage.getItem('token')}})
        return response.data
    } catch (error) {
        // console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})


const authSlice = createSlice({
    name:'auth',
    initialState:{
        serverError:[],
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
        builders.addCase(userRegister.pending, (state)=>{
            state.isLoading = true
        })
        builders.addCase(userRegister.fulfilled, (state)=>{
            state.isLoading = false;
            state.serverError = null; 
        })
        builders.addCase(userRegister.rejected, (state,action)=>{
            state.isLoading = false;
            state.serverError = action.payload; 
        })

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

        builders.addCase(userLogin.pending,(state)=>{
            state.isLoading = true
        })
        builders.addCase(userLogin.fulfilled,(state)=>{
            state.isLoading = false;
            state.isLoggedIn = false
            state.serverError = null;
        })
        builders.addCase(userLogin.rejected,(state,action)=>{
            state.isLoading = false;
            state.serverError = action.payload;
        })

        builders.addCase(sendEmailOtp.pending,(state)=>{
            state.isLoading = true
        })
        builders.addCase(sendEmailOtp.fulfilled,(state)=>{
            state.isLoading = false;
            state.otpSent = true;
            state.serverError = null
        })
        builders.addCase(sendEmailOtp.rejected,(state,action)=>{
            state.isLoading = false
            state.serverError = action.payload
        })

        builders.addCase(verifyEmail.pending,(state)=>{
            state.isLoading = true
        })
        builders.addCase(verifyEmail.fulfilled,(state)=>{
            state.isLoading = false;
            state.otpSent = false;
            state.serverError = null
        })
        builders.addCase(verifyEmail.rejected, (state,action)=>{
            state.isLoading = false;
            state.serverError = action.payload;
        })
        builders.addCase(getUser.pending,(state)=>{
            state.isLoading = true
            state.serverError = null
            state.userInfo = null
            state.isLoggedIn = true
        })
        builders.addCase(getUser.fulfilled,(state, action)=>{
            state.isLoading = false
            state.serverError = null
            state.userInfo = action.payload
            state.isLoggedIn = true
        })
        builders.addCase(getUser.rejected,(state,action)=>{
            state.isLoading = false
            state.serverError = action.payload
            state.userInfo = null
            state.isLoggedIn = false
        })
    }
})

export const { logOut } = authSlice.actions; 
export default authSlice.reducer;