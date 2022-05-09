/* Libs */
import React from "react";
import { Route } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CommentIcon from "@mui/icons-material/Comment";
/* Components */
import Dashboard from "./pages/Dashboard";
import QuestionsList from "./pages/QuestionsList";
import QuestionCreate from "./pages/QuestionCreate";
import AnswersList from "./pages/AnswersList";
import Profile from "./pages/Profile";
import Patients from "./pages/Patients";
import dashboardIcon from './assets/menuIcons/dashboard.svg';
import patientIcon from './assets/menuIcons/patient.svg';
import calendarIcon from './assets/menuIcons/calendar.svg';

interface BasicRouteType {
  name: string;
  title: string;
  path: string;
  element: React.ReactElement;
  icon?: string;
  hideInMenu: boolean;
  requireAdmin: boolean;
  requireLogin: boolean;
}

export interface RouteType extends BasicRouteType {
  subRoutes?: BasicRouteType[];
}

export const routes: RouteType[] = [
  {
    name: "dashboard",
    title: "Dashboard",
    path: "/dashboard",
    element: <Dashboard />,
    icon: dashboardIcon,
    hideInMenu: false,
    requireAdmin: false,
    requireLogin: true,
  },
  {
    name: "patients",
    title: "Patients",
    path: "/patients",
    element: <Patients />,
    icon: patientIcon,
    hideInMenu: false,
    requireAdmin: false,
    requireLogin: true,
  },
  {
    name: "calendar",
    title: "Calendar",
    path: "/calendar",
    element: <Patients />,
    icon: calendarIcon,
    hideInMenu: false,
    requireAdmin: false,
    requireLogin: true,
  },
  {
    name: "questionsList",
    title: "Questions List",
    path: "/questions-list",
    element: <QuestionsList />,
    // icon: <ListAltIcon />,
    hideInMenu: false,
    requireAdmin: false,
    requireLogin: true,
  },
  {
    name: "createQuestion",
    title: "Create question",
    path: "/questions-create",
    element: <QuestionCreate />,
    // icon: <CreateIcon />,
    hideInMenu: false,
    requireAdmin: true,
    requireLogin: true,
  },
  {
    name: "answersList",
    title: "Your answers",
    path: "/answers-list",
    element: <AnswersList />,
    // icon: <CommentIcon />,
    hideInMenu: false,
    requireAdmin: false,
    requireLogin: true,
  },
  {
    name: "profile",
    title: "Your profile",
    path: "/profile",
    element: <Profile />,
    hideInMenu: true,
    requireAdmin: true,
    requireLogin: true,
  },
];

export const getRoutes = (routes: RouteType[]) => {
  const portalRoutes = routes.map((route, index) => (
    <Route key={route.name} path={route.path} element={route.element} />
  ));

  return portalRoutes;
};
