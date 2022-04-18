import { createAsyncThunk } from "@reduxjs/toolkit";
import { StatusType } from '../global';
import type { BaseArgument } from  '../../utils/axiosInstance';

export const getUserInfo = createAsyncThunk(
    'user/getUserInfo',
    async ( { axiosInstance }: BaseArgument, ThunkAPI) => {
        try {
            const { data } = await axiosInstance.instance.get(
                "/user/me",
                axiosInstance.config
            )
            console.log(data)
            return {
                status: StatusType.STATUS_SUCCESS,
                info: data
            }
        }
        catch (error) {
            return error
        }
    }
)