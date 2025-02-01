import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/AuthSlice'
import profileReducer from './slices/ProfileSlice'
import petReducer from './slices/PetSlice'
const store = configureStore({
    reducer:{
        auth:authReducer,
        profile: profileReducer,
        pet : petReducer
    }
})

export default store
