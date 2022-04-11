/* Libs */
import React from "react";
import { Route } from "react-router-dom";
/* Components */
import ProtectedRoute from "../components/ProtectedRoute";
import QuestionsList from '../pages/QuestionsList';
import QuestionsCreate from "../pages/QuestionsList/QuestionsCreate";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";

interface BasicRouteType {
    title: string;
    path: string;
    component: React.ReactElement;
    hideInMenu: boolean;
    requireAdmin: boolean;
    requireLogin: boolean; 
}

export interface RouteType extends BasicRouteType {
    subRoutes?: BasicRouteType[];
}

export const routes: RouteType[] = [
    {
        title: 'Questions',
        path: '/questions/',
        component: <QuestionsList />,
        hideInMenu: false,
        requireAdmin: false,
        requireLogin: true,
        subRoutes: [
            {
                title: 'Create question',
                path: 'create',
                component: <QuestionsCreate />,
                hideInMenu: false,
                requireAdmin: true,
                requireLogin: true,
            }
        ],
    },
    {
        title: 'Login',
        path: '/login',
        component: <Login />,
        hideInMenu: true,
        requireAdmin: true,
        requireLogin: true,
    },
    {
        title: 'Not Found',
        path: '404',
        component: <NotFound />,
        hideInMenu: true,
        requireAdmin: true,
        requireLogin: true,
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