import { createAsyncThunk } from "@reduxjs/toolkit";
import type { User } from '@auth0/auth0-react';

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async (user: User, ThunkAPI) => {
        try {
            const 
        }
        catch (err) {
            return error
        }
    }
)