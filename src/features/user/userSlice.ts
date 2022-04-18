import { createSlice } from '@reduxjs/toolkit';
import { getUserInfo } from './userThunk';
import { StatusType } from '../global';
import type { User } from '@auth0/auth0-react';

const defaultUser = {
  auth: {
    accessToken: '',
    isAuthenticated: false,
  },
  auth0Info: undefined,
  userInfo: undefined,
  status: StatusType.STATUS_IDLE,
  error: undefined
}

const authFromStorage = localStorage.getItem('auth') ? 
  JSON.parse(localStorage.getItem('auth') || `${defaultUser.auth}`) :
  defaultUser.auth;

const auth0InfoFromStorage = localStorage.getItem('auth0Info') ?
  JSON.parse(localStorage.getItem('auth0Info') || `${defaultUser.auth0Info}`) :
  defaultUser.auth0Info;
const userInfoFromStorage =  localStorage.getItem('userInfo') ? 
  JSON.parse(localStorage.getItem('userInfo') || `${defaultUser.userInfo}`) :
  defaultUser.userInfo;

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
  ...defaultUser,
  auth: authFromStorage,
  userInfo: userInfoFromStorage,
  auth0Info: auth0InfoFromStorage
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getUserAuth: (state, action) => {
      state.auth.accessToken = action.payload.accessToken;
      state.auth.isAuthenticated = action.payload.isAuthenticated;
      localStorage.setItem('auth', JSON.stringify(action.payload));
    },
    getUserAuth0Info: (state, action) => {
      state.auth0Info = action.payload;
      localStorage.setItem('auth0Info', JSON.stringify(action.payload))
    },
    logout: (state, action) => {
      localStorage.clear();
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