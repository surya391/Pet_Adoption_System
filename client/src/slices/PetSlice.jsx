import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosInstance'


export const getPet = createAsyncThunk('get/getPet', async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/pet/my-pets`,{
            headers:{
                Authorization : localStorage.getItem('token') 
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const singlePet = createAsyncThunk('get/singlePet', async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/pet/singlePet`,{
            headers:{
                Authorization : localStorage.getItem('token') 
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const profilePet = createAsyncThunk('post/profilePet',async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.post(`/pet/create`,formData,{
            headers:{
                Authorization : localStorage.getItem('token')
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const updatePet = createAsyncThunk("put/updatePet",async(formData,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.put(`/pet/updatePet`,formData,{
            headers:{
                Authorization : localStorage.getItem("token")
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const deletePet = createAsyncThunk(async(id,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.delete(`/pet/deletePet`,{
            headers: {
                Authorization : localStorage.getItem('token')
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})


const petSlice = createSlice({
    name:"pet",
    initialState:{
        serverError: null,
        petDetails: null,
        isLoading: false,
    },
    extraReducers : (builders)=>{
        builders.addCase( getPet.pending, (state)=>{
            state.serverError = null;
            state.petDetails = null;
            state.isLoading = true;
        })
        builders.addCase( getPet.fulfilled, (state, action)=>{
            state.serverError = null;
            state.petDetails = action.payload;
            state.isLoading = false;
        })
        builders.addCase( getPet.rejected,(state, action)=>{
            state.serverError = action.payload;
            state.petDetails = null;
            state.isLoading = false;
        })
        builders.addCase(profilePet.pending,(state)=>{
            state.serverError = null;
            state.petDetails = null;
            state.isLoading = true;
        })
        builders.addCase(profilePet.fulfilled,(state,action)=>{
            state.serverError = null;
            state.petDetails = action.payload;
            state.isLoading = false;
        })
        builders.addCase(profilePet.rejected,(state)=>{
            state.serverError = action.payload;
            state.petDetails = null;
            state.isLoading = false;
        })
        builders.addCase(updatePet.pending,(state)=>{
            state.serverError = null;
            state.petDetails = null;
            state.isLoading = true;
        })
        builders.addCase(updatePet.fulfilled,(state,action)=>{
            state.serverError = null;
            state.petDetails = action.payload;
            state.isLoading = false;
        })
        builders.addCase(updatePet.rejected,(state,action)=>{
            state.serverError = action.payload;
            state.petDetails = null;
            state.isLoading = false;
        })
        builders.addCase(deletePet.pending,(state)=>{
            state.serverError = null;
            state.petDetails = null;
            state.isLoading = true;
        })
        builders.addCase(deletePet.fulfilled,(state,action)=>{
            state.serverError = null;
            state.petDetails = action.payload;
            state.isLoading = false;
        })
        builders.addCase(deletePet.rejected,(state,action)=>{
            state.serverError = action.payload;
            state.petDetails = null;
            state.isLoading = false;
        })
    }
})


export default petSlice.reducer