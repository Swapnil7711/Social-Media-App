import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const registerUser = createAsyncThunk(
    'user/register',
    async (formData, thunkAPI) => {
        console.log(formData)
        const config = { headers: { 'Content-Type': 'application/json' } };
        const response = await axios.post("http://localhost:8000/api/register", formData, config)
        return response.data
    }
)
export const registerSlice = createSlice({
    name: 'tokens',
    initialState: {
        tokens: null,
        status: null
    },
    extraReducers: {
        [registerUser.pending]: (state, action) => {
            state.status = "loading";
        },
        [registerUser.fulfilled]: (state, action) => {
            state.status = "success";
            state.tokens = action.payload;
            console.log(action.payload)
            localStorage.setItem("tokens", JSON.stringify(state.tokens));
        },
        [registerUser.rejected]: (state, action) => {
            console.log(state.status)
            state.status = "failed"
        }
    }

})

export default registerSlice.reducer;
