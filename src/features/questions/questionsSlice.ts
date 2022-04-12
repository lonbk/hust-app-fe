import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getQuestionsByCategory, createQuestionByCategory } from './questionsThunk';

// Define a type for the slice state
interface QuestionType {
    id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    questionCategoryId: string;
}
interface QuestionsList {
    id: string;
    createdAt: string;
    updatedAt: string;
    questions: QuestionType[];
}
interface QuestionsState {
    questionsList: QuestionsList | undefined;
    status: 'idle' | 'pending' | 'success' | 'failed';
    error: unknown
}

// Define the initial state using that type
const initialState: QuestionsState = {
    questionsList: undefined,
    status: 'idle',
    error: undefined,
}

export const questionsSlice = createSlice({
    name: 'questions',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        resetQuestionsList: (state) => {
            state.questionsList = undefined;
            state.status = 'idle';
        }
    },
    // extraReducers: {
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionsByCategory.pending || createQuestionByCategory.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(getQuestionsByCategory.fulfilled, (state, action) => {
                state.questionsList = action.payload
                state.status = 'success';
            })
            .addCase(getQuestionsByCategory.rejected || createQuestionByCategory.rejected, (state, action) => {
                state.error = action.payload
                state.status = 'failed';
             })
            .addCase(createQuestionByCategory.fulfilled, (state, action) => {
                state.status = 'success';
            })
    },
    // }
})

export const { resetQuestionsList } = questionsSlice.actions



export default questionsSlice.reducer