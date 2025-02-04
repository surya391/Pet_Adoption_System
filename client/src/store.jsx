import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/AuthSlice'
import profileReducer from './slices/ProfileSlice'
import petReducer from './slices/PetSlice'
import requestReducer from "./slices/RequestSlice"
const store = configureStore({
    reducer:{
        auth:authReducer,
        profile: profileReducer,
        pet : petReducer,
        request : requestReducer
    }
})

export default store
