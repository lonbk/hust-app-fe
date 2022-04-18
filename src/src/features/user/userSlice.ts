import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from './userThunk';
import { StatusType } from '../global';
import type { User } from '@auth0/auth0-react';

// Define a type for the slice state
interface UserState {
  auth: {
    accessToken: string;
    isAuthenticated: boolean;
  },
  auth0Info?: User,
  userInfo: {
    userId: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    role: string;
    lastActivity: string;
    authzUserId: string;
  } | undefined,
  status: StatusType;
  error: any;
}

// Define the initial state using that type
const initialState: UserState = {
  auth: {
    accessToken: '',
    isAuthenticated: false,
  },
  auth0Info: undefined,
  userInfo: undefined,
  status: StatusType.STATUS_IDLE,
  error: undefined
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUserAuth: (state, action) => {
      state.auth.accessToken = action.payload.accessToken;
      state.auth.isAuthenticated = action.payload.isAuthenticated;
    },
    getUserAuth0Info: (state, action) => {
      state.auth0Info = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state, action) => {
        state.status = StatusType.STATUS_PENDING;
      })
      .addCase(getUserInfo.fulfilled, (state, action: any) => {
        state.status = action.payload.status;
        state.userInfo = action.payload.info;
      })
      .addCase(getUserInfo.rejected, (state, action: any) => {
        state.status = action.payload.status;
        state.error = action.payload.error;
      })
  }
})

export const { getUserAuth, getUserAuth0Info } = userSlice.actions



export default userSlice.reducer