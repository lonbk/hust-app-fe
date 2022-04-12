import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import type { AxiosError } from 'axios';

interface BaseArgument {
    accessToken: string;
}

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
    async ({accessToken, category}: GetQuestionsArguments , ThunkAPI) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }    
            }
            const { data } = await axios.get(`https://questionare01.herokuapp.com/categories/search?title=${category}`, config);
            return data;
        }
        catch (error) {
            return error
        }
    }
)

export const createQuestionByCategory = createAsyncThunk(
    'questions/createQuestionByCategory',
    async ({accessToken, questionToUpload}: CreateQuestionArguments, ThunkAPI) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }    
            }
            const { data } = await axios.post("https://questionare01.herokuapp.com/questions/create", questionToUpload, config);
            return data
        }
        catch (error) {
            return error
        }
    }
)
