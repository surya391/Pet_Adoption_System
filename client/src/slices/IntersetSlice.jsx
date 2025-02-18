import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

// Async Thunk for creating interest
export const serviceProCreateInterest = createAsyncThunk(
    "post/serviceProCreateInterest",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/interest/create`, data, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

// serviceProvider all interest request
export const getServiceProviderInterests = createAsyncThunk(
    "get/getServiceProviderInterests",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/interest/getServiceProviderInterests`, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

//remove the interest by the service Provider
export const removeSPInterest = createAsyncThunk(
    "delete/removeSPInterest",
    async ( requestId , { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(`/interest/remove`, { requestId }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

export const allRequestInterest = createAsyncThunk(
    "get/allRequestInterest",
    async ( requestId , { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/interest/getOwnerInterests?requestId=${requestId}`,{
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error?.response?.data?.error);
        }
    }
);

// export const allRequestInterest = createAsyncThunk(
//     "get/allRequestInterest",
//     async (_, { rejectWithValue }) => {
//       try {
//         const token = localStorage.getItem("token");
  
//         if (!token) {
//           return rejectWithValue("No authentication token found.");
//         }
  
//         const response = await axiosInstance.get(`/interest/getOwnerInterests`, {
//           headers: {
//             Authorization: `Bearer ${token}`, 
//           },
//         });
  
//         console.log("Response Data:", response.data);
//         return response.data;
//       } catch (error) {
//         console.error("API Error:", error);
  
//         return rejectWithValue(
//           error?.response?.data?.error || "Failed to fetch interests"
//         );
//       }
//     }
//   );
  
const interestSlice = createSlice({
    name: "interest",
    initialState: {
        interest: null,
        getYourInterests: [],
        getOwnerInterests:[],
        serverError: null,
        interestLoading: false,
    },
    extraReducers: (builders) => {
        builders.addCase(serviceProCreateInterest.pending, (state) => {
            state.interestLoading = true;
            state.serverError = null;
        })
        builders.addCase(serviceProCreateInterest.fulfilled, (state, action) => {
            state.interestLoading = false;
            state.interest = action.payload;
            state.serverError = null;
        })
        builders.addCase(serviceProCreateInterest.rejected, (state, action) => {
            state.interestLoading = false;
            state.serverError = action.payload;
        });

        builders.addCase(getServiceProviderInterests.pending, (state) => {
            state.serverError = null;
            state.getYourInterests = null;
            state.interestLoading = true;
        })
        builders.addCase(getServiceProviderInterests.fulfilled, (state, action) => {
            state.serverError = null;
            state.getYourInterests = action.payload;
            state.interestLoading = false;
        })
        builders.addCase(getServiceProviderInterests.rejected, (state, action) => {
            state.serverError = action.payload;
            state.getYourInterests = [];
            state.interestLoading = false;
        })

        builders.addCase(removeSPInterest.pending, (state) => {
            state.serverError = null;
            state.interestLoading = true;
        })
        builders.addCase(removeSPInterest.fulfilled, (state, action) => {
            const index = state.getYourInterests.findIndex(ele => ele._id === action.payload._id);
            state.getYourInterests.splice(index, 1)
            state.serverError = null;
            state.interestLoading = false;
        });        
        builders.addCase(removeSPInterest.rejected, (state, action) => {
            state.serverError = action.payload;
            state.interestLoading = false;
        })

        builders.addCase(allRequestInterest.pending, (state) => {
            state.serverError = null;
            state.getOwnerInterests = null;
            state.interestLoading = true;
        })
        builders.addCase(allRequestInterest.fulfilled, (state, action) => {
            state.serverError = null;
            state.getOwnerInterests = action.payload;
            state.interestLoading = false;
        })
        builders.addCase(allRequestInterest.rejected, (state, action) => {
            state.serverError = action.payload;
            state.getOwnerInterests = [];
            state.interestLoading = false;
        })

    },
});

export default interestSlice.reducer;
