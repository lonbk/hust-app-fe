/* Libs */
import React, { useState, useEffect } from "react";
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
import { getRoutes, routes } from "../Portal/PortalRoutes";

const Portal: React.FC = () => {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { auth } = useAppSelector(selectUser);

  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (axiosInstance) dispatch(getCategories({ axiosInstance }));
  }, []);
  console.log('got here')

  useEffect(() => {
      auth.isAuthenticated ? navigate("/dashboard") : navigate("/login");
  }, [auth.isAuthenticated]);


  return (
    <Box sx={{ display: "flex" }}>
      <Header  isOpen={open}/>
      <Sidebar isOpen={open} onOpen={handleDrawerOpen} onClose={handleDrawerClose} />
      <Content>
        <Routes>
            {getRoutes(routes)}
        </Routes>
      </Content>
    </Box>
  );
};

export default Portal;
