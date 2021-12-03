import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const registerUser = createAsyncThunk(
    'user/register',
    async (formData, { rejectWithValue }) => {

        const config = { headers: { 'Content-Type': 'application/json' } };
        try {
            const response = await axios.post("http://localhost:8000/api/register", formData, config)
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

// login reducer function


export const loginUser = createAsyncThunk(
    'user/login',
    async (formData, { rejectWithValue }) => {

        const config = { headers: { 'Content-Type': 'application/json' } };
        try {
            const response = await axios.post("http://localhost:8000/api/login", formData, config)
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)


export const registerSlice = createSlice({
    name: 'tokens',
    initialState: {
        tokens: null,
        status: null,
        error: null,
        isLoggedIn: false
    },
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [registerUser.fulfilled]: (state, action) => {
            state.status = "success";
            state.tokens = action.payload;
            state.isLoggedIn = true;
            console.log(action.payload)
            localStorage.setItem("tokens", JSON.stringify(state.tokens));
        },
        [registerUser.rejected]: (state, action) => {
            state.status = "failed"
            state.isLoggedIn = false;
            console.log(action.payload?.message)
            state.error = action.payload?.message
        },

        [loginUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [loginUser.fulfilled]: (state, action) => {
            state.status = "success";
            state.error = null
            state.tokens = action.payload;
            state.isLoggedIn = true;
            console.log(action.payload)
            localStorage.setItem("tokens", JSON.stringify(state.tokens));
        },
        [loginUser.rejected]: (state, action) => {
            state.status = "failed"
            state.isLoggedIn = false;
            console.log(action.payload?.message)
            state.error = action.payload?.message
        }
    }

})

export default registerSlice.reducer;
