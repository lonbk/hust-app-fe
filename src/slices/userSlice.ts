import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../app/store';

import { useAuth0 } from '@auth0/auth0-react';
import type { User } from '@auth0/auth0-react';

// Define a type for the slice state
interface UserState {
  value: number;
  username?: string;
  accessToken?: string;
  auth0Info?: User;
}

// Define the initial state using that type
const initialState: UserState = {
  value: 0
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user.value

export default userSlice.reducer