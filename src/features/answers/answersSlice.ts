import { createSlice } from '@reduxjs/toolkit';
import { createAnswers, getUserAnswers } from './answersThunk';
import { StatusType } from '../global';
// Define a type for the slice state
export interface AnswerType {
  questionId: string;
  answerId: string; 
}

export interface AnswersState {
  getAnswersState: {
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
    status: StatusType;
    error: any;
  },
  createAnswersState: {
    status: StatusType;
    error: any;
  }
}

const userAnswersFromStorage = localStorage.getItem('userAnswers') ? 
  JSON.parse(localStorage.getItem('userAnswers') || '[]') :
  []

// Define the initial state using that type
const initialState: AnswersState = {
  getAnswersState: {
    userAnswers: userAnswersFromStorage,
    total: 0,
    status: StatusType.STATUS_IDLE,
    error: undefined,
  },
  createAnswersState: {
    status: StatusType.STATUS_IDLE,
    error: undefined
  }
}

export const answersSlice = createSlice({
  name: 'answers',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    validateAnswers: (state, action) => {
      const answers  = action.payload
      if(answers.length < 1) {
        state.createAnswersState.status = StatusType.STATUS_FAILED;
        state.createAnswersState.error = "Please select your answers";
      }
    }

  },
  // extraReducers: {
  extraReducers: (builder) => {
    builder
      .addCase(createAnswers.pending, (state, action) => {
        state.createAnswersState.status = StatusType.STATUS_PENDING;
      })
      .addCase(getUserAnswers.pending, (state, action) => {
        state.getAnswersState.status = StatusType.STATUS_PENDING;
      })
      .addCase(createAnswers.fulfilled, (state, action) => {
        state.createAnswersState.status = action.payload.status;
      })
      .addCase(getUserAnswers.fulfilled, (state, action) => {
        state.getAnswersState.status = action.payload.status;
        state.getAnswersState.userAnswers = action.payload.userAnswers;
      })
      .addCase(createAnswers.rejected, (state, action: any) => {
        state.createAnswersState.status = action.payload.status;
        state.createAnswersState.error = action.payload.error;
      })
      .addCase(getUserAnswers.rejected, (state, action: any) => {
        state.getAnswersState.status = action.payload.status;
        state.getAnswersState.error = action.payload.error;
      })
  }, 
  // }
})

export const { validateAnswers } = answersSlice.actions



export default answersSlice.reducer