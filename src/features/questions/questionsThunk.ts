import { createAsyncThunk } from "@reduxjs/toolkit";
import type { BaseArgument } from '../../utils/axiosInstance';
import { setStatusSuccess } from './questionsSlice';

interface GetQuestionsArguments extends BaseArgument {
    category: string;
}
interface CreateQuestionArguments  extends BaseArgument {
    questionToUpload: {
        question: string;
        category: string;
        answers: {
            description: string;
            isTrue: boolean;
        }[]
    }
}

export const getQuestionsByCategory = createAsyncThunk(
    'questions/getQuestionsByCategory',
    async ({axiosInstance, category}: GetQuestionsArguments , ThunkAPI) => {
        try {
            const { data } = await axiosInstance.instance.get(
                `/categories/search?title=${category}`, 
                axiosInstance.config);
            ThunkAPI.dispatch(setStatusSuccess);
            return data;
        }
        catch (error) {
            return error
        }
    }
)

export const createQuestionByCategory = createAsyncThunk(
    'questions/createQuestionByCategory',
    async ({axiosInstance, questionToUpload}: CreateQuestionArguments, ThunkAPI) => {
        try {
            const { data } = await axiosInstance.instance.post(
                "https://questionare01.herokuapp.com/questions/create", 
                questionToUpload, 
                axiosInstance.config);
            return data
        }
        catch (error) {
            return error
        }
    }
)
