/* Libs */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
/* Reducers */
import userReducer from '../features/user/userSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import quesionsReducer from '../features/questions/questionsSlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    user: userReducer,
    questions: quesionsReducer
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
