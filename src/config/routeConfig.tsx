/* Libs */
import React from "react";
import { Route } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import ListAltIcon from '@mui/icons-material/ListAlt';
import CommentIcon from '@mui/icons-material/Comment';
/* Components */
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import QuestionsList from '../pages/QuestionsList';
import QuestionCreate from "../pages/QuestionCreate";
import AnswersList from "../pages/AnswersList";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Verify from "../pages/Verify";

interface BasicRouteType {
    name: string;
    title: string;
    path: string;
    component: React.ReactElement;
    icon?: React.ReactElement;
    hideInMenu: boolean;
    requireAdmin: boolean;
    requireLogin: boolean; 
}

export interface RouteType extends BasicRouteType {
    subRoutes?: BasicRouteType[];
}

export const routes: RouteType[] = [
    {
        name: 'questionsList',
        title: 'Questions List',
        path: '/questions-list',
        component: <QuestionsList />,
        icon: <ListAltIcon />,
        hideInMenu: false,
        requireAdmin: false,
        requireLogin: true,
    },
    {
        name: 'createQuestion',
        title: 'Create question',
        path: '/questions-create',
        component: <QuestionCreate />,
        icon: <CreateIcon />,
        hideInMenu: false,
        requireAdmin: true,
        requireLogin: true,
    },
    {
        name: 'answersList',
        title: 'Your answers',
        path: '/answers-list',
        component: <AnswersList />,
        icon: <CommentIcon />,
        hideInMenu: false,
        requireAdmin: false,
        requireLogin: true,
    },
    {
        name: 'profile',
        title: 'Your profile',
        path: '/profile',
        component: <Profile />,
        hideInMenu: true,
        requireAdmin: true,
        requireLogin: true,
    },
    // {
    //     title: 'Dashboard',
    //     path: '/',
    //     component: <Dashboard />,
    //     hideInMenu: true,
    //     requireAdmin: true,
    //     requireLogin: true,
    // },
    {
        name: 'login',
        title: 'Login',
        path: '/login',
        component: <Login />,
        hideInMenu: true,
        requireAdmin: false,
        requireLogin: false,
    },
    {
        name: 'verify',
        title: 'Verify',
        path: '/verify',
        component: <Verify />,
        hideInMenu: true,
        requireAdmin: false,
        requireLogin: true,
    },
    {
        name: 'notFound',
        title: 'Not Found',
        path: '/404',
        component: <NotFound />,
        hideInMenu: true,
        requireAdmin: false,
        requireLogin: false,
    }
]

export const useRecursiveRoutes = (routes: RouteType[] ) => {

    const configuredRoutes = routes.map((route, index) => (
        <Route>
            
        </Route>
    ))

    return (
        <>

        </>
    )
}