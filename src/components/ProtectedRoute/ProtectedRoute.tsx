/* Libs */
import React from "react";
import { Navigate } from "react-router-dom";
/* Components */

/* Hooks */
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSelector";
/* Styles */

/* Configs */
/* Types */
type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({
  children,
}: Props) => {
  const { auth } = useAppSelector(selectUser);

  return (
    <>
      {auth.isAuthenticated ? children : <Navigate to="/login" replace /> }    
    </>
  );
};

export default ProtectedRoute;
