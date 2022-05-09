/* Libs */
import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress } from '@mui/material';
/* Components */
import NotFound from "../NotFound/";
/* Redux */
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getUserAuth, getUserAuth0Info } from '../../features/user/userSlice';
import { getUserInfo } from '../../features/user/userThunk';
import { selectUser } from '../../features/user/userSelector';

/* Hooks */
import { useAxiosInstance } from "../../utils/axiosInstance";
import { StatusType } from "../../features/global";

const Verify: React.FC = () => {
    /* Redux */
    const dispatch = useAppDispatch();  
    const { status, error, userInfo, auth0Info } = useAppSelector(selectUser);
    /* Utils */
    const navigate = useNavigate();
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const axiosInstance = useAxiosInstance();
    

    /* Effects */
    useEffect(() => {
        const getUserAccess = async () => {
            const accessToken = await getAccessTokenSilently();
            if(accessToken && isAuthenticated) {
                dispatch(getUserAuth({ accessToken, isAuthenticated}));
            }
        }
        getUserAccess();
    }, [isAuthenticated, user, getAccessTokenSilently])

    useEffect(() => {
        if(user && axiosInstance) {
            dispatch(getUserAuth0Info(user));
            dispatch(getUserInfo({ axiosInstance }));
        }
    }, [user, axiosInstance])

    useEffect(() => {
        if(userInfo && auth0Info) navigate('/')
        
    }, [userInfo, auth0Info])

    console.log('error', error)
    console.log()

    if(error) {
        return <NotFound />
    }

    return (
        <>
            <CircularProgress disableShrink />
            <p>Verifying</p>
        </>
    )
}

export default Verify;