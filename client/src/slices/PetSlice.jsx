import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../utils/axiosInstance'
import { toast } from "react-toastify"

export const petTypes = createAsyncThunk('get/petTypes',async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get(`/pet-types/get`,{
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        // console.log(response.data)
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})

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
        const response = await axiosInstance.post(`/pet/addPet`,formData,{
            headers:{
                Authorization : localStorage.getItem('token')
            }
        })
        // console.log("profilepet",response.data)
        toast.success("pet added successfully")
        return response.data
    } catch (error) {
        // console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const updatePet = createAsyncThunk("put/updatePet",async({id,formData},{rejectWithValue})=>{
    // console.log(formData, id)
    try {
        const response = await axiosInstance.put(`/pet/updatePet?petId=${id}`,formData,{
            headers:{
                Authorization : localStorage.getItem("token")
            }
        })
        toast.success('Pet updated successfully')
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const deletePet = createAsyncThunk("delete/deletePet",async(id,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.delete(`/pet/deletePet?petId=${id}`,{
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
        petTypes: [],
        yoursPets:[],
        isEditing:false,
        petId:"",
        isLoading: false,
    },
    reducers:{
        setIsEditing : (state,action)=>{
            state.isEditing = action.payload;
        } ,
        setPetId: (state, action)=>{
            state.petId = action.payload
        }
    },
    extraReducers : (builders)=>{
        builders.addCase( petTypes.pending, (state)=>{
            state.serverError = null;
            state.isLoading = true;
        })
        builders.addCase( petTypes.fulfilled, (state, action)=>{
            state.serverError = null;
            state.petTypes = action.payload
            state.isLoading = false;
        })
        builders.addCase( petTypes.rejected,(state, action)=>{
            state.serverError = action.payload;
            state.petTypes = [];
            state.isLoading = false;
        })
        
        builders.addCase( getPet.pending, (state)=>{
            state.serverError = null;
            state.yoursPets = null;
            state.isLoading = true;
        })
        builders.addCase( getPet.fulfilled, (state, action)=>{
            state.serverError = null;
            state.yoursPets = action.payload;
            state.isLoading = false;
        })
        builders.addCase( getPet.rejected,(state, action)=>{
            state.serverError = action.payload;
            state.yoursPets = [];
            state.isLoading = false;
        })

        builders.addCase( singlePet.pending, (state)=>{
            state.serverError = null;
            state.petDetails = null;
            state.isLoading = true;
        })
        builders.addCase( singlePet.fulfilled, (state, action)=>{
            state.serverError = null;
            state.petDetails = action.payload;
            state.isLoading = false;
        })
        builders.addCase( singlePet.rejected,(state, action)=>{
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
            // state.petDetails = action.payload;
            state.isLoading = false;
        })
        builders.addCase(profilePet.rejected,(state,action)=>{
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
            // const index = state.yoursPets.findIndex(ele=>ele._id === action.payload._id)
            // state.yoursPets.splice(index, 1, action.payload)
            state.isEditing = false;
            state.petId = "";
            state.isLoading = false;
        })
        builders.addCase(updatePet.rejected,(state,action)=>{
            state.serverError = action.payload;
            state.petDetails = null;
            state.isLoading = false;
        })

        builders.addCase(deletePet.pending,(state)=>{
            state.serverError = null;
            // state.petDetails = null;
            state.isLoading = true;
        })
        builders.addCase(deletePet.fulfilled,(state,action)=>{
            state.serverError = null;
            const index = state.yoursPets.findIndex(ele=>ele._id===action.payload._id)
            state.yoursPets.splice(index, 1)
            state.isLoading = false;
        })
        builders.addCase(deletePet.rejected,(state,action)=>{
            state.serverError = action.payload;
            // state.petDetails = null;
            state.isLoading = false;
        })
    }
})

export const { setIsEditing, setPetId } = petSlice.actions
export default petSlice.reducer