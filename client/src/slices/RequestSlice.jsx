import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const createRequestPet = createAsyncThunk("post/createRequestPet", async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/request/create`, formData, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
        });
        console.log(response.data);
        toast.success("Request pet added successfully")
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error);
    }
}
);
export const getRequestPets = createAsyncThunk('get/getRequestPets', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/request/my-requests`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})
export const getPendingRequest = createAsyncThunk('get/getPendingRequest', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/request/pendingRequest`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})
// search operation in the serviceProvider page
export const searchRequests = createAsyncThunk('get/searchRequests', async (formData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/request/search`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})

export const deleteRequestPet = createAsyncThunk("delete/deleteRequestPet", async (id, { rejectWithValue }) => {
    // console.log(id)
    try {
        const response = await axiosInstance.delete(`/request/deleteRequestPet?petId=${id}`, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})
export const updateRequestPet = createAsyncThunk("put/updateRequestPet", async ({  id ,formData }, { rejectWithValue }) => {
    // console.log(formData, id)
    try {
        const response = await axiosInstance.put(`/request/updateRequestPet?petId=${id}`, formData, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        // console.log("update Request slice", response.data)
        toast.success('Request updated successfully')
        return response.data
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error)
    }
})
export const myPetList   = createAsyncThunk('get/myPetList', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/pet/my-pets`, {
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
export const getRequestTypes = createAsyncThunk('get/getRequestTypes', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/request-types/myRequestTypes`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error)
    }
})
// singleRequestView

// export const singleRequestView   = createAsyncThunk('get/singleRequestView', async (_, { rejectWithValue }) => {
//     try {
//         const response = await axiosInstance.get(`/review/singleRequestView/:${_id}`, {
//             headers: {
//                 Authorization: localStorage.getItem("token")
//             }
//         })
//         console.log(response.data)
//         return response.data
//     } catch (error) {
//         return rejectWithValue(error?.response?.data?.error)
//     }
// })
export const singleRequestView = createAsyncThunk(
    'get/singleRequestView',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/request/singleRequestView/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);


const requestSlice = createSlice({
    name: "request",
    initialState: {
        serverError: null,
        isLoading: false,
        requestDetails: null,
        petId: [],
        requestTypes:[],
        requestPets:[],
        pendingRequestList: [],
        isEditing:false,
        requestId:"",
        requestView: [],
        search:[]

    },
    reducers:{
        setIsEditing : (state, action)=>{
            state.isEditing = action.payload;
        } ,
        setRequestId: (state, action)=>{
            state.requestId = action.payload
        }
    },
    extraReducers: (builders) => {
        builders.addCase(createRequestPet.pending, (state) => {
            state.serverError = null;
            state.isLoading = true;
        });
        builders.addCase(createRequestPet.fulfilled, (state, action) => {
            state.serverError = null;
            state.requestDetails = action.payload;
            state.isLoading = false;
        });
        builders.addCase(createRequestPet.rejected, (state, action) => {
            state.serverError = action.payload;
            state.requestDetails = null;
            state.isLoading = false;
        });
        builders.addCase(getRequestPets.pending, (state) => {
            state.serverError = null;
            state.isLoading = true;
        })
        builders.addCase(getRequestPets.fulfilled, (state, action) => {
            state.serverError = null;
            state.requestPets = action.payload;
            state.isLoading = false;
        })
        builders.addCase(getRequestPets.rejected, (state, action) => {
            state.serverError = action.payload;
            state.requestPets = [];
            state.isLoading = false;
        })

        builders.addCase(getPendingRequest.pending, (state) => {
            state.serverError = null;
            state.isLoading = true;
        })
        builders.addCase(getPendingRequest.fulfilled, (state, action) => {
            state.serverError = null;
            state.pendingRequestList = action.payload;
            state.isLoading = false;
        })
        builders.addCase(getPendingRequest.rejected, (state, action) => {
            state.serverError = action.payload;
            state.pendingRequestList = [];
            state.isLoading = false;
        })

// search operation in the serviceProvider page
builders.addCase(searchRequests.pending, (state) => {
    state.serverError = null;
    state.isLoading = true;
})
builders.addCase(searchRequests.fulfilled, (state, action) => {
    state.serverError = null;
    state.search = action.payload;
    state.isLoading = false;
})
builders.addCase(searchRequests.rejected, (state, action) => {
    state.serverError = action.payload;
    state.search = [];
    state.isLoading = false;
})
        builders.addCase(deleteRequestPet.pending, (state) => {
            state.serverError = null;
            // state.petDetails = null;
            state.isLoading = true;
        })
        builders.addCase(deleteRequestPet.fulfilled, (state, action) => {
            state.serverError = null;
            const index = state.requestPets.findIndex(ele => ele._id === action.payload._id)
            state.requestPets.splice(index, 1)
            state.isLoading = false;
        })
        builders.addCase(deleteRequestPet.rejected, (state, action) => {
            state.serverError = action.payload;
            state.isLoading = false;
        })
        builders.addCase(updateRequestPet.pending, (state) => {
            state.serverError = null;
            state.requestDetails = null;
            state.isLoading = true;
        })
        builders.addCase(updateRequestPet.fulfilled, (state, action) => {
            state.serverError = null;
            state.isEditing = false;
            state.requestId = "";
            state.isLoading = false;
        })
        builders.addCase(updateRequestPet.rejected, (state, action) => {
            state.serverError = action.payload;
            state.requestDetails = null;
            state.isLoading = false;
        })
        builders.addCase(myPetList.pending, (state) => {
            state.serverError = null;
            state.isLoading = true;
        })
        builders.addCase(myPetList.fulfilled, (state, action) => {
            state.serverError = null;
            state.petId = action.payload
            state.isLoading = false;
        })
        builders.addCase(myPetList.rejected, (state, action) => {
            state.serverError = action.payload;
            state.petId = [];
            state.isLoading = false;
        })
        builders.addCase(getRequestTypes.pending, (state) => {
            state.serverError = null;
            state.isLoading = true;
        })
        builders.addCase(getRequestTypes.fulfilled, (state, action) => {
            state.serverError = null;
            state.requestTypes = action.payload
            state.isLoading = false;
        })
        builders.addCase(getRequestTypes.rejected, (state, action) => {
            state.serverError = action.payload;
            state.requestTypes = [];
            state.isLoading = false;
        })


        builders.addCase(singleRequestView.pending, (state) => {
            state.serverError = null;
            state.isLoading = true;
        })
        builders.addCase(singleRequestView.fulfilled, (state, action) => {
            state.serverError = null;
            state.requestView = action.payload
            state.isLoading = false;
        })
        builders.addCase(singleRequestView.rejected, (state, action) => {
            state.serverError = action.payload;
            state.requestView = [];
            state.isLoading = false;
        })


    },
});
export const { setIsEditing, setRequestId } = requestSlice.actions
export default requestSlice.reducer;
