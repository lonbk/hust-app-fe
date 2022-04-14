import { createAsyncThunk } from "@reduxjs/toolkit";
import { validateAnswers } from './answersSlice';
import { StatusType } from "../global";
import { AnswersState } from './answersSlice';
import type { BaseArgument } from  '../../utils/axiosInstance';
import type { AnswerType } from './answersSlice';
interface GetAnswerArgument extends BaseArgument {
    categoryId: string;
}

interface CreateAnswersArgument extends BaseArgument {
    userAnswers: AnswerType[];
    categoryId: string;
}


export const createAnswers = createAsyncThunk(
    'answers/createAnswers',
    async ({ axiosInstance, userAnswers, categoryId }: CreateAnswersArgument, { dispatch, getState }) => {
        try {
            dispatch(validateAnswers(userAnswers))
            const { answers } = getState() as { answers: AnswersState} ;
            const status = answers.createAnswersState.status;
            if(status !== StatusType.STATUS_FAILED) {
                const { data } = await axiosInstance.instance.post(
                    `/answers/categories/${categoryId}`, 
                    { answers: userAnswers },
                    axiosInstance.config);
                return {
                    status: StatusType.STATUS_SUCCESS,
                };
            }
            return {
                status: StatusType.STATUS_FAILED
            }
        }
        catch(error: any) {
            return {
                status: StatusType.STATUS_FAILED,
                error: error.message
            }
        }
    }
)

export const getUserAnswers = createAsyncThunk(
    'answers/getUserAnswers',
    async ({ axiosInstance, categoryId }: GetAnswerArgument, ThunkAPI) => {
        try {
            const { data } = await axiosInstance.instance.get(
                `/answers/categories/${categoryId}`,
                axiosInstance.config
            )
            return {
                status: StatusType.STATUS_SUCCESS,
                userAnswers: data.userQuestionAnswers
            }
        }
        catch (error: any) {
            return {
                status: StatusType.STATUS_FAILED,
                error: error.message
            }
        }
    }
)