import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@auth0/auth0-react';

import { getUserInfo } from './userThunk';

// Define a type for the slice state
interface UserState {
  auth: {
    accessToken: string;
    isAuthenticated: boolean;
  },
  auth0Info?: User,
  info: {
    userId: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    role: string;
    lastActivity: string;
    authzUserId: string;
  },
  status: 'idle' | 'pending' | 'success' | 'failed',
  error: unknown
}

// Define the initial state using that type
const initialState: UserState = {
  auth: {
    accessToken: '',
    isAuthenticated: false,
  },
  auth0Info: undefined,
  info: {
    userId: '',
    createdAt: '',
    updatedAt: '',
    email: '',
    role: '',
    lastActivity: '',
    authzUserId: ''
  },
  status: 'idle',
  error: undefined
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUserAuth: (state, action) => {
      state.auth = action.payload;
    },
    getUserAuth0Info: (state, action) => {
      state.auth0Info = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = 'pending';
      })
      // .addCase(getUserInfo.fulfilled, (state, action) => {
      //   state.status = 'success';
      //   state.info = action.payload;
      // })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
})

export const { getUserAuth, getUserAuth0Info } = userSlice.actions



export default userSlice.reducer