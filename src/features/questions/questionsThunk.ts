import { createAsyncThunk } from "@reduxjs/toolkit";
import type { BaseArgument } from '../../utils/axiosInstance';
import { StatusType } from '../global';

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
    async ({axiosInstance, category}: GetQuestionsArguments , { dispatch }) => {
        try {
            const { data } = await axiosInstance.instance.get(
                `/categories/search?title=${category}`, 
                axiosInstance.config);
            localStorage.setItem('questionsList', JSON.stringify(data));
            return {
                status: StatusType.STATUS_SUCCESS,
                questionsList: data
            };
        }
        catch (error: any) {
            return {
                status: StatusType.STATUS_FAILED,
                error: error?.message
            }
        }
    }
)


export const createQuestionByCategory = createAsyncThunk(
    'questions/createQuestionByCategory',
    async ({axiosInstance, questionToUpload}: CreateQuestionArguments, { dispatch }) => {
        try {
            const { data } = await axiosInstance.instance.post(
                "https://questionare01.herokuapp.com/questions/create", 
                questionToUpload, 
                axiosInstance.config);
            return { status: StatusType.STATUS_SUCCESS};
        }
        catch (error: any) {
            return {
                status: StatusType.STATUS_FAILED,
                error: error?.message
            }
        }
    }
)
