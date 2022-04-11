/* Libs */
import React from "react";
import { Route, Navigate } from "react-router-dom";
/* Components */

/* Hooks */
// import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useAuth0 } from '@auth0/auth0-react';
/* Styles */

/* Configs */
/* Types */
type Props = {
  isPrivate: boolean;
  // isRequireAdmin: boolean;
  children: React.ReactNode;
};

const ProtectedRoute = ({
  isPrivate,
  // isRequireAdmin,
  children,
}: Props) => {
  //   const user = useAppSelector((state) => state.user.value);
  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated)

  return (
    <>
      {isPrivate && isAuthenticated ? children : <Navigate to="/login" replace/>}
    </>
  );
};

export default ProtectedRoute;
