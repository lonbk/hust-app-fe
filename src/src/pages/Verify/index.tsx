/* Libs */
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
/* Components */
import NotFound from "../NotFound";
/* Redux */
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { getUserAuth, getUserAuth0Info } from '../../features/user/userSlice';
import { getUserInfo } from '../../features/user/userThunk';
import { selectUser } from '../../features/user/userSelector';
import { StatusType } from '../../features/global';
/* Hooks */
import { useAxiosInstance } from "../../utils/axiosInstance";

const Verify: React.FC = () => {
    /* Dispatch */
    const dispatch = useAppDispatch();  
    /* Selector */
    const { status, error, userInfo, auth0Info } = useAppSelector(selectUser);
    /* Hooks */
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

    if(error) {
        return <NotFound />
    }

    return (
        <>
            <p>Verifying</p>
        </>
    )
}

export default Verify;