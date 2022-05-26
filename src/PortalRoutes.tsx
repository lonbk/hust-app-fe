/* Libs */
import React from 'react';
import { Route } from 'react-router-dom';
/* Components */
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import Calendar from './pages/Calendar';
import { PatientsTable } from './pages/Patients/views';
import { Information } from './pages/PatientDetail/views';
import { Appointments } from './pages/PatientDetail/views';
import { Stats } from './pages/PatientDetail/views';
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
  subRoutes?: RouteType[];
}

export const routes: RouteType[] = [
  {
    name: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    element: <Dashboard />,
    icon: dashboardIcon,
    hideInMenu: false,
    requireAdmin: false,
    requireLogin: true,
  },
  {
    name: 'patients',
    title: 'Patients',
    path: 'patients',
    element: <Patients />,
    icon: patientIcon,
    hideInMenu: false,
    requireAdmin: false,
    requireLogin: true,
    subRoutes: [
      {
        name: 'patientTable',
        title: 'Patient Table',
        path: '',
        element: <PatientsTable />,
        icon: patientIcon,
        hideInMenu: true,
        requireAdmin: false,
        requireLogin: true,
      },
      {
        name: 'patientDetail',
        title: 'Patient Detail',
        path: 'patient/:patientId',
        element: <PatientDetail />,
        icon: patientIcon,
        hideInMenu: true,
        requireAdmin: false,
        requireLogin: true,
        subRoutes: [
          {
            name: 'information',
            title: 'Information',
            path: 'information',
            element: <Information />,
            icon: dashboardIcon,
            hideInMenu: true,
            requireAdmin: false,
            requireLogin: true,
          },
          {
            name: 'appointments',
            title: 'Appointments',
            path: 'appointments',
            element: <Appointments />,
            icon: dashboardIcon,
            hideInMenu: true,
            requireAdmin: false,
            requireLogin: true,
          },
          {
            name: 'stats',
            title: 'Stats',
            path: 'stats',
            element: <Stats />,
            icon: dashboardIcon,
            hideInMenu: true,
            requireAdmin: false,
            requireLogin: true,
          },
        ],
      },
    ],
  },
  {
    name: 'calendar',
    title: 'Calendar',
    path: '/calendar',
    element: <Calendar />,
    icon: calendarIcon,
    hideInMenu: false,
    requireAdmin: false,
    requireLogin: true,
  },
];

export const getRoutes = (routes: RouteType[]) => {
  const portalRoutes = routes.map((route, index) => (
    <React.Fragment key={route.name}>
      <Route path={route.path} element={route.element}>
        {route.subRoutes &&
          route.subRoutes.length > 0 &&
          getRoutes(route.subRoutes)}
      </Route>
    </React.Fragment>
  ));

  return portalRoutes;
};
