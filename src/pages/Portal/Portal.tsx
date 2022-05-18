/* Libs */
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Routes } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
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

export const TitleContext = React.createContext<any>(null);

const Portal: React.FC = () => {
  const axiosInstance = useAxiosInstance();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { auth } = useAppSelector(selectUser);

  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState<string>('');

  const handleChangeTitle = (title: string) => {
    setTitle(title);
  }

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [open]);
  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [open]);

  useEffect(() => {
    if (axiosInstance) dispatch(getCategories({ axiosInstance }));
  }, []);

  // useEffect(() => {
  //     auth.isAuthenticated ? navigate("/dashboard") : navigate("/login");
  // }, [auth.isAuthenticated]);


  return (
    <Box sx={{ display: "flex" }}>
      <Header  isOpen={open} />
      <Sidebar isOpen={open} />
      <Content isOpen={open} onOpen={handleDrawerOpen} onClose={handleDrawerClose}>
        <Grid container spacing={4} sx={{ px: 2, py: 2 }}>
          <Grid item xs={12} md={12}>
            <Typography variant="h1" component="div">{title}</Typography>
          </Grid>
        </Grid>
        <TitleContext.Provider value={[handleChangeTitle]}>
          <Routes>
              {getRoutes(routes)}
          </Routes>
        </TitleContext.Provider>
      </Content>
    </Box>
  );
};

export default Portal;
