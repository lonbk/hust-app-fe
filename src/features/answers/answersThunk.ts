import { createAsyncThunk } from "@reduxjs/toolkit";
import type { BaseArgument } from  '../../utils/axiosInstance';
import type { AnswerType } from './answersSlice';

interface CreateAnswersArgument extends BaseArgument {
    answers: AnswerType[];
    categoryId: string;
}

export const createAnswers = createAsyncThunk(
    'answers/createAnswers',
    async ({ axiosInstance, answers, categoryId }: CreateAnswersArgument, thunkAPI) => {
        try {
            const { data } = await axiosInstance.instance.post(
                `/answers/categories/${categoryId}`, 
                { answers },
                axiosInstance.config);
            return data;
        }
        catch(error) {
            return error;
        }
    }
)