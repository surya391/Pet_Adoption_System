import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const allServiceReviews = createAsyncThunk("get/allServiceReviews", async (ownerId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/review/list?ownerId=${ownerId}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error);
    }
})
export const createReview = createAsyncThunk("post/create", async (formData, { rejectWithValue }) => {
    console.log(formData)
    try {
        const response = await axiosInstance.post(`/review/create`, formData, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        toast.success("review created successfully")
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error);
    }
})
export const deleteReview = createAsyncThunk("delete/deleteReview", async (id, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/review/delete?reviewId=${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        toast.success("review deleted successfully")
        return response.data;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error?.response?.data?.error);
    }
})
export const getMyReviews = createAsyncThunk("get/getMyReviews", async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get("/review/my-reviews", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error);
    }
})
export const editMyReview = createAsyncThunk("put/editMyReview", async ( formData , { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/review/update?reviewId=${formData.reviewId}`, formData, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        toast.success( "Review Updated sucessfully" );
        return response.data;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.error);
    }
})

const reviewSlice = createSlice({
    name: "review",
    initialState: {
        isLoading: false,
        serverError: null,
        serviceProviderReviews: [],
        myReviews: [],
    },
    extraReducers: (builders) => {
        builders.addCase(allServiceReviews.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(allServiceReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serverError = null;
            state.serviceProviderReviews = action.payload;
        })
        builders.addCase(allServiceReviews.rejected, (state, action) => {
            state.isLoading = false;
            state.serverError = action.payload;
            state.serviceProviderReviews = [];
        })

        builders.addCase(createReview.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(createReview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serverError = null;
            state.myReviews.unshift(action.payload);
        })
        builders.addCase(createReview.rejected, (state, action) => {
            state.isLoading = false;
            state.serverError = action.payload;
        })

        builders.addCase(getMyReviews.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(getMyReviews.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serverError = null;
            state.myReviews = action.payload;
        })
        builders.addCase(getMyReviews.rejected, (state, action) => {
            state.isLoading = false;
            state.serverError = action.payload;
        })

        builders.addCase(deleteReview.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(deleteReview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serverError = null;
            const index = state.myReviews.findIndex((ele) => ele._id === action.payload._id)
            state.myReviews.splice(index, 1);
        })
        builders.addCase(deleteReview.rejected, (state, action) => {
            state.isLoading = false;
            state.serverError = action.payload;
        })

        builders.addCase(editMyReview.pending, (state) => {
            state.isLoading = true;
        })
        builders.addCase(editMyReview.fulfilled, (state, action) => {
            state.isLoading = false;
            state.serverError = null;
            const index = state.myReviews.findIndex((ele) => ele._id === action.payload._id)
            state.myReviews.splice(index, 1, action.payload);
        })
        builders.addCase(editMyReview.rejected, (state, action) => {
            state.isLoading = false;
            state.serverError = action.payload;
        })
    }
})
export default reviewSlice.reducer;