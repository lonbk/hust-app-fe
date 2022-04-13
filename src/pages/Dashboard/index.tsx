/* Libs */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
/* Components */
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import Content from "../../layout/Content";
/* Hooks */
import { useAppDispatch } from '../../app/hooks';
import { getUserAuth } from '../../features/user/userSlice';
/* Types */
/* Styled components */

const Dashboard: React.FC = () => {
  /* Dispatch */
  const dispatch = useAppDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  /* Local state */
  const [open, setOpen] = useState(true);
  /* Local methods */
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getUserAccessToken = async () => {
      const accessToken = await getAccessTokenSilently();
      if(accessToken) dispatch(getUserAuth({ accessToken, isAuthenticated }));
    }
    getUserAccessToken();
  }, [isAuthenticated])

  useEffect(() => {
    if (location.pathname === "/") navigate("/questions-list");
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Header isOpen={open} onDrawerOpen={handleDrawerOpen} />
      <Sidebar isOpen={open} onDrawerClose={handleDrawerClose} />
      <Content>
        <Outlet />
      </Content>
    </Box>
  );
};

export default Dashboard;
