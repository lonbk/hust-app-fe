import { createSlice } from '@reduxjs/toolkit';
import { createAnswers } from './answersThunk';
// Define a type for the slice state
export interface AnswerType {
  questionId: string;
  answerId: string; 
}

interface AnswersState {
  userAnswers: {
    id: string;
    createdAt: string;
    updatedAt: string;
    question: {
      id: string;
      createdAt: string;
      updatedAt: string;
      description: string;
      questionCategoryId: string;
      questionCategory: {
        id: string;
        createdAt: string;
        updatedAt: string;
        title: string;
      }
    },
    answer: {
      id: string;
      createdAt: string;
      updatedAt: string;
      description: string;
      isTrue: boolean;
      questionId: string;
    }
  }[];
  total: number;
  loading: boolean;
  error: unknown;
}
// Define the initial state using that type
const initialState: AnswersState = {
  userAnswers: [],
  total: 0,
  loading: false,
  error: undefined,
}

export const answersSlice = createSlice({
  name: 'answers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
  // extraReducers: {
  extraReducers: (builder) => {
    builder
      .addCase(createAnswers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createAnswers.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createAnswers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
  }, 
  // }
})

// export const { getCategories } = categoriesSlice.actions



export default answersSlice.reducer