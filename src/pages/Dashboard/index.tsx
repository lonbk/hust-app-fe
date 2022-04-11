/* Libs */
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Button, Grid, Box } from "@mui/material";
/* Components */
import Header from "../../layout/Header";
import Sidebar from "../../layout/Sidebar";
import Content from "../../layout/Content";
/* Hooks */
import { useAuth0 } from "@auth0/auth0-react";
/* Styles */
/* Types */
/* Styled components */

const Dashboard: React.FC = () => {
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
    if(location.pathname === '/') navigate("/Questions");
  })

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
