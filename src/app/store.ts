/* Libs */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
/* Reducers */
import userReducer from '../slices/user/userSlice';

export const store = configureStore({
  reducer: {
    // posts: postsReducer,
    // comments: commentsReducer,
    user: userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
