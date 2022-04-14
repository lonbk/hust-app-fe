import { createSlice } from '@reduxjs/toolkit';
import { getQuestionsByCategory, createQuestionByCategory } from './questionsThunk';
import { StatusType } from '../global';
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
    getQuestionsState: {
        questionsList: QuestionsList | undefined;
        status: StatusType;
        error: any;
    },
    createQuestionsState: {
        status: StatusType;
        error: any;
    }
}

// Define the initial state using that type
const initialState: QuestionsState = {
    getQuestionsState: {
        questionsList: undefined,
        status: StatusType.STATUS_IDLE,
        error: undefined,
    },
    createQuestionsState: {
        status: StatusType.STATUS_IDLE,
        error: undefined,
    }
}

export const questionsSlice = createSlice({
    name: 'questions',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
    },
    // extraReducers: {
    extraReducers: (builder) => {
        builder
            .addCase(getQuestionsByCategory.pending, (state, action) => {
                state.getQuestionsState.status = StatusType.STATUS_PENDING;
            })
            .addCase(createQuestionByCategory.pending, (state, action) => {
                state.createQuestionsState.status = StatusType.STATUS_PENDING;
            })   
            .addCase(getQuestionsByCategory.fulfilled, (state, action) => {
                state.getQuestionsState.questionsList = action.payload.questionsList;
                state.getQuestionsState.status = action.payload.status;
            })
            .addCase(createQuestionByCategory.fulfilled, (state, action) => {
                state.createQuestionsState.status = action.payload.status;
            })
            .addCase(getQuestionsByCategory.rejected, (state, action: any) => {
                state.getQuestionsState.error = action.payload.error;
                state.getQuestionsState.status = StatusType.STATUS_FAILED;
             })
            .addCase(createQuestionByCategory.rejected, (state, action: any) => {
                state.createQuestionsState.error = action.payload.error;
                state.createQuestionsState.status = StatusType.STATUS_FAILED;
             })
    },
    // }
})

// export const { setStatus } = questionsSlice.actions

export default questionsSlice.reducer