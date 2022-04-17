/* Libs */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
/* Components */
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import Content from "../../layout/Content";
/* Redux */
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/userSelector';
import { getCategories } from '../../features/categories/categoriesThunk';
/* Hooks */
import { useAxiosInstance } from "../../utils/axiosInstance";
/* Types */
/* Styled components */

const Dashboard: React.FC = () => {
  /* Dispatch */
  const dispatch = useAppDispatch();
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();
  const location = useLocation();
  /* Selector */
  const { auth } = useAppSelector(selectUser);
  /* Local state */
  const [open, setOpen] = useState(true);
  /* Local methods */
  const handleDrawerOpen = () => {
    setOpen(true);
  }; 
  const handleDrawerClose = () => {
    setOpen(false);
  };
  /* Effects */
  useEffect(() => {
   if(axiosInstance) dispatch(getCategories({ axiosInstance }));
  }, []);

  useEffect(() => {
    console.log('Dashboard', auth.isAuthenticated)
    if (location.pathname === "/") auth.isAuthenticated ? navigate("/questions-list") : navigate('/verify');
  }, [location.pathname, auth.isAuthenticated]);

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
