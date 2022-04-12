import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async (accessToken: string, thunkAPI) => {
        const config = {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }    
        }
        const { data } = await axios.get("https://questionare01.herokuapp.com/categories", config);
        return data;
    }
)