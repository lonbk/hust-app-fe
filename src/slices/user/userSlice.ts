import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@auth0/auth0-react';

// Define a type for the slice state
interface UserState {
  accessToken: string;
  username?: string;
  auth0Info?: User;
}

// Define the initial state using that type
const initialState: UserState = {
  accessToken: ''
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      console.log('action', action);
      state.accessToken = action.payload;
    }
  },
  // extraReducers: {

  // }
})

export const { setAccessToken } = userSlice.actions



export default userSlice.reducer