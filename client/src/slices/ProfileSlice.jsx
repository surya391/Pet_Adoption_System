import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from "../utils/axiosInstance"


export const getProfile = createAsyncThunk('get/getProfile', async(_,{rejectWithValue})=>{
    try {
        const response = await axiosInstance.get('/profile/user',{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
        return response.data
    } catch (error) {
        // console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const createProfile = createAsyncThunk("post/createProfile",async(formData,{rejectWithValue})=>{
    try {
        // console.log("formdata",formData)
        const response = await axiosInstance.post(`/profile/user`, formData,{
            headers:{
                Authorization: localStorage.getItem('token')
            }
        })
        // console.log(response.data)
        return response.data
    } catch (error) {
        // console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const updateProfile = createAsyncThunk("put/updateProfile",async(formData,{rejectWithValue})=>{
try {
    // console.log(formData)
    const response = await axiosInstance.put(`/profile/user`,formData,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
    })
    return response.data
} catch (error) {
    console.log(error)
    return rejectWithValue(error?.response?.data?.error)
}
})

/* export const deleteProfile = createAsyncThunk("delete/deleteProfile", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/profileDelete/${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error?.response?.data?.error);
    }
}); */


const profileSlice = createSlice({
    name:"profile",
    initialState:{
        serverError: null,
        userDetails: null,
        isLoading: false,
    },
    extraReducers:(builders)=>{
        builders.addCase( getProfile.pending, (state)=>{
            state.serverError = null;
            state.userDetails = null;
            state.isLoading = true;
        })
        builders.addCase( getProfile.fulfilled, (state , action)=>{
            state.serverError = null;
            state.userDetails = action.payload;
            state.isLoading = false;
        })
        builders.addCase(getProfile.rejected,(state,action)=>{
            state.serverError  = action.payload;
            state.userDetails = null;
            state.isLoading = false;
        })

        builders.addCase(createProfile.pending, (state)=>{
            state.serverError = null;
            state.userDetails = null;
            state.isLoading = true
        })
        builders.addCase(createProfile.fulfilled, (state,action)=>{
            state.serverError = null;
            // state.editId = null;
            state.userDetails = action.payload;
            state.isLoading = false
        })
        builders.addCase(createProfile.rejected,(state,action)=>{
            state.serverError = action.payload;
            // state.editId = null;
            state.userDetails = null;
            state.isLoading = false;
        })

        builders.addCase(updateProfile.pending, (state)=>{
            state.serverError = null;
            // state.editId = null;
            state.userDetails = null;
            state.isLoading = true;
        })
        builders.addCase(updateProfile.fulfilled,(state, action)=>{
            state.serverError = null;
            // state.editId = null;
            // state.userDetails = action.payload;
            state.isLoading = false;
        })
        builders.addCase(updateProfile.rejected, (state,action)=>{
            state.serverError = action.payload;
            // state.editId = null;
            state.isLoading = false;
        })

    /*     builders.addCase(deleteProfile.pending, (state) => {
            state.serverError = null;
            state.isLoading = true;
        });
        builders.addCase(deleteProfile.fulfilled, (state) => {
            state.serverError = null;
            state.userDetails = null; 
            state.isLoading = false;
        });
        builders.addCase(deleteProfile.rejected, (state, action) => {
            state.serverError = action.payload;
            state.isLoading = false;
        }); */
    }
})
export const { setEditing } = profileSlice.actions
export default profileSlice.reducer





// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axiosInstance from "../utils/axiosInstance";

// // Thunks for API calls
// export const getProfile = createAsyncThunk('get/getProfile', async (_, { rejectWithValue }) => {
//     try {
//         const response = await axiosInstance.get('/profile/user', {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         return rejectWithValue(error?.response?.data?.error);
//     }
// });

// export const createProfile = createAsyncThunk("post/createProfile", async (formData, { rejectWithValue }) => {
//     try {
//         const response = await axiosInstance.post('/profileCreate', formData, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         return rejectWithValue(error?.response?.data?.error);
//     }
// });

// export const updateProfile = createAsyncThunk("put/updateProfile", async (formData, { rejectWithValue }) => {
//     try {
//         const response = await axiosInstance.put(`/profileUpdate/${formData.id}`, formData, {
//             headers: {
//                 Authorization: localStorage.getItem('token')
//             }
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         return rejectWithValue(error?.response?.data?.error);
//     }
// });


// const profileSlice = createSlice({
//     name: "profile",
//     initialState: {
//         serverError: null,
//         userDetails: null,
//         isEditing: false,
//         isLoading: false,
//         editId: null
//     },
//     reducers: {
//         setEditing: (state) => {
//             state.serverError = null;
//             state.isEditing = true;
//             state.userDetails = null; 
//             state.isLoading = false;
//         },
//         setEditId: (state, action) => {
//             state.editId = action.payload; 
//         },
//         resetProfile: (state) => {
//             state.userDetails = null;
//             state.isEditing = false;
//         }
//     },
//     extraReducers: (builders) => {
//         builders.addCase(getProfile.pending, (state) => {
//             state.serverError = null;
//             state.userDetails = null;
//             state.isLoading = true;
//         });
//         builders.addCase(getProfile.fulfilled, (state, action) => {
//             state.serverError = null;
//             state.userDetails = action.payload;
//             state.isLoading = false;
//         });
//         builders.addCase(getProfile.rejected, (state, action) => {
//             state.serverError = action.payload;
//             state.isLoading = false;
//         });

//         builders.addCase(createProfile.pending, (state) => {
//             state.serverError = null;
//             state.userDetails = null;
//             state.isLoading = true;
//         });
//         builders.addCase(createProfile.fulfilled, (state, action) => {
//             state.serverError = null;
//             state.userDetails = action.payload;
//             state.isLoading = false;
//         });
//         builders.addCase(createProfile.rejected, (state, action) => {
//             state.serverError = action.payload;
//             state.isLoading = false;
//         });

//         builders.addCase(updateProfile.pending, (state) => {
//             state.serverError = null;
//             state.isLoading = true;
//         });
//         builders.addCase(updateProfile.fulfilled, (state, action) => {
//             state.serverError = null;
//             state.userDetails = action.payload;
//             state.isLoading = false;
//         });
//         builders.addCase(updateProfile.rejected, (state, action) => {
//             state.serverError = action.payload;
//             state.isLoading = false;
//         });
//     }
// });

// export const { setEditing, setEditId, resetProfile } = profileSlice.actions;
// export default profileSlice.reducer;
