import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/AuthSlice'
import profileReducer from './slices/ProfileSlice'
import petReducer from './slices/PetSlice'
import requestReducer from "./slices/RequestSlice"
import interestReducer from "./slices/IntersetSlice"
import reviewReducer from "./slices/ReviewSlice"
import paymentReducer from "./slices/PaymentSlice"
const store = configureStore({
    reducer:{
        auth:authReducer,
        profile: profileReducer,
        pet : petReducer,
        request : requestReducer,
        interest: interestReducer,
        review: reviewReducer,
        payment: paymentReducer
    }
})

export default store
