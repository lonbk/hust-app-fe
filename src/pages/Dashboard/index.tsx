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
import { setAccessToken } from '../../features/user/userSlice';
/* Types */
/* Styled components */

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getUserAccessToken = async () => {
      const accessToken = await getAccessTokenSilently();
      if(accessToken) dispatch(setAccessToken(accessToken));
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
