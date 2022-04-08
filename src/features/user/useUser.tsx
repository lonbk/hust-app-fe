import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from "../../app/hooks";

import { decrement, increment } from './userSlice'

export const useUser = () => {
  // The `state` arg is correctly typed as `RootState` already
  const user = useAppSelector((state) => state.user.value)
  const dispatch = useAppDispatch()

  return [user, dispatch]
}
