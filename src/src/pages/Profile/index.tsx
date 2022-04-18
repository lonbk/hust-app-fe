/* Libs */
import React, { useState, useEffect } from "react";
import { Grid, Avatar, FormControl, FormLabel, Input } from "@mui/material";
/* Components */
import Loading from "../../components/Loading";
import LoadingWithChild from "../../components/LoadingWithChild";
/* Redux */
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser } from "../../features/user/userSelector";
import { getUserInfo } from "../../features/user/userThunk";
import { StatusType } from '../../features/global';
/* Hooks */
import { useAxiosInstance } from "../../utils/axiosInstance";
/* Types */

const Profile: React.FC = () => {
    /* Dispatch */
    const dispatch = useAppDispatch();
    /* Selector */
    const { status, error, userInfo, auth0Info } = useAppSelector(selectUser);
    const axiosInstance = useAxiosInstance();

    /* Effects */

    if(!userInfo || !auth0Info) {
        return <Loading />
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={8} order={{xs: 2, sm: 2, md: 1, lg: 1}}>
                <FormControl fullWidth sx={{ marginBottom: "20px" }}>
                    <FormLabel>{auth0Info.name}</FormLabel>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} order={{xs: 1, sm: 1, md: 2, lg: 2}}>
                <Avatar />
            </Grid>
        </Grid>
    )
}

export default Profile;