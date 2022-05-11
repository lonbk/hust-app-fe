/* Libs */
import React from 'react';
import { Navigate } from 'react-router-dom';
/* Redux */
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/userSelector';

const ProtectedRoute: React.FC = ({ children }) => {
  const { auth } = useAppSelector(selectUser);

  return (
    <>{auth.isAuthenticated ? children : <Navigate to='/login' replace />}</>
  );
};

export default ProtectedRoute;
