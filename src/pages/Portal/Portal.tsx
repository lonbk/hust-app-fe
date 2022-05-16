/* Libs */
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Routes } from "react-router-dom";
import { Box } from "@mui/material";
/* Components */
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import Content from "../../layout/Content";
/* Redux */
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSelector";
import { getCategories } from "../../features/categories/categoriesThunk";
/* Utils */
import { useAxiosInstance } from "../../utils/axiosInstance";
import { getRoutes, routes } from "../../PortalRoutes";

const Portal: React.FC = () => {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { auth } = useAppSelector(selectUser);

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [open]);
  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  useEffect(() => {
    if (axiosInstance) dispatch(getCategories({ axiosInstance }));
  }, []);
  console.log('got here')

  // useEffect(() => {
  //     auth.isAuthenticated ? navigate("/dashboard") : navigate("/login");
  // }, [auth.isAuthenticated]);


  return (
    <Box sx={{ display: "flex" }}>
      <Header  isOpen={open} />
      <Sidebar isOpen={open} />
      <Content isOpen={open} onOpen={handleDrawerOpen} onClose={handleDrawerClose}>
        <Routes>
            {getRoutes(routes)}
            {console.log('rourtes', getRoutes(routes))}
        </Routes>
      </Content>
    </Box>
  );
};

export default Portal;
