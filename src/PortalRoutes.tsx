/* Libs */
import React from 'react';
import { Route } from 'react-router-dom';
/* Components */
import Students from './pages/Students';
import StudentDetail from './pages/StudentDetail';
import Calendar from './pages/Calendar';
import { StudentsTable } from './pages/Students/views';
import { Information } from './pages/StudentDetail/views';
import { Stats } from './pages/StudentDetail/views';
/* Icons */
import studentIcon from './assets/menuIcons/student.svg';
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
    name: 'students',
    title: 'Sinh viên',
    path: 'students',
    element: <Students />,
    icon: studentIcon,
    hideInMenu: false,
    requireAdmin: false,
    requireLogin: true,
    subRoutes: [
      {
        name: 'studentTable',
        title: 'Student Table',
        path: '',
        element: <StudentsTable />,
        icon: studentIcon,
        hideInMenu: true,
        requireAdmin: false,
        requireLogin: true,
      },
      {
        name: 'studentDetail',
        title: 'Student Detail',
        path: 'student/:studentId',
        element: <StudentDetail />,
        icon: studentIcon,
        hideInMenu: true,
        requireAdmin: false,
        requireLogin: true,
        subRoutes: [
          {
            name: 'information',
            title: 'Information',
            path: 'information',
            element: <Information />,
            hideInMenu: true,
            requireAdmin: false,
            requireLogin: true,
          },
          {
            name: 'stats',
            title: 'Stats',
            path: 'stats',
            element: <Stats />,
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
    title: 'Thời khóa biểu',
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
