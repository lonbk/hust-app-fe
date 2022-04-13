import { createSlice } from '@reduxjs/toolkit';
import { getQuestionsByCategory, createQuestionByCategory } from './questionsThunk';
// Define a type for the slice state
export interface AnswerType {
    id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    questionId: string; 
}
export interface QuestionType {
    id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    questionCategoryId: string;
    answers: AnswerType[];
}
export interface QuestionsList {
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
        setStatusSuccess: (state) =>{
            console.log('got here bro')
            state.status = 'success';
        }
    },
    // extraReducers: {
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionsByCategory.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(createQuestionByCategory.pending, (state, action) => {
                state.status = 'pending';
            })   
            .addCase(getQuestionsByCategory.fulfilled, (state, action) => {
                state.questionsList = action.payload
                state.status = 'idle';
            })
            .addCase(createQuestionByCategory.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(getQuestionsByCategory.rejected, (state, action) => {
                state.error = action.payload
                state.status = 'failed';
             })
            .addCase(createQuestionByCategory.rejected, (state, action) => {
                state.error = action.payload
                state.status = 'failed';
             })
    },
    // }
})

export const { setStatusSuccess } = questionsSlice.actions



export default questionsSlice.reducer