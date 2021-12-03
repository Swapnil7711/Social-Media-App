import { configureStore } from '@reduxjs/toolkit'
import registerSlice from './reducers/authReducer'


const token = localStorage.getItem("tokens") ? (JSON.parse(localStorage.getItem("tokens"))) : {};


const initialState = { token }
export default configureStore({

    reducer: {
        token: registerSlice
    },
    preloadedState: initialState,
})