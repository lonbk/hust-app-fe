import { createAsyncThunk } from "@reduxjs/toolkit";
import type { BaseArgument } from  '../../utils/axiosInstance';

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async ({ axiosInstance }: BaseArgument, thunkAPI) => {
        const { data } = await axiosInstance.instance.get(
            "https://questionare01.herokuapp.com/categories", 
            axiosInstance.config);
        localStorage.setItem('categories', JSON.stringify(data));
        return data;
    }
)