import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../api";


interface SignupData{
    first_name: string
    last_name: string
    email: string
    username: string
    password: string
    confirm_password: string
    profession: string
}

interface AuthState{
    user: SignupData | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
}

export const signupAPI = createAsyncThunk<SignupData, SignupData>(
    'signupThunk',
    async (user, thunkAPI)=>{
        try{
            const response = await axios.post(`${API_URL}auth/signup/`, user);
            return response.data;
        }
        catch(e: any){
            return thunkAPI.rejectWithValue(
                e.response.data
            )
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state){
            state.error = null;
        }
    },
    extraReducers: (builder)=>{
        builder
            .addCase(signupAPI.pending, (state)=>{
                state.loading = true
            })
            .addCase(signupAPI.fulfilled, (state, action)=>{
                state.loading = false
                state.user = action.payload
            })
            .addCase(signupAPI.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.error as string;
            })
    }
});

export default authSlice.reducer;
