import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AuthProfile, Credentials } from "../../../types/Auth";
import { login as apiLogin, logout as apiLogout, getCurrentAuthProfile, getCurrentAuthToken } from "../../../services/AuthService";

type AuthState = {
    authProfile: AuthProfile | null,
    token: string | null
}

const initialState: AuthState = {
    authProfile: getCurrentAuthProfile(),
    token: getCurrentAuthToken()
}
