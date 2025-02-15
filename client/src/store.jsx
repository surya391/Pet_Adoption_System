import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/AuthSlice'
import profileReducer from './slices/ProfileSlice'
import petReducer from './slices/PetSlice'
import requestReducer from "./slices/RequestSlice"
import interestReducer from "./slices/IntersetSlice"
const store = configureStore({
    reducer:{
        auth:authReducer,
        profile: profileReducer,
        pet : petReducer,
        request : requestReducer,
        interest: interestReducer,
    }
})

export default store
