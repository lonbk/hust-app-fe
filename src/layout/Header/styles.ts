import { Link } from 'react-router-dom';
import { drawerWidth } from "../DrawerHeader";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  styled as muiStyled,
  Typography,
} from "@mui/material";
import styled from 'styled-components';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
  }
  /* Styled components */
  export const UsernameHeader = muiStyled(Typography)`
    font-weight: bold;
    color: #2c3742;
    font-size: 14px;
  `;
  
  export const MenuChild = muiStyled(Typography)`
    display: flex;
    align-items: center;
    line-height: 30px;
  `;
  
  export const Linkstyles = muiStyled(Link)`
    text-decoration:none;
    color:black;
  `;
  
  export const FlexHeader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
  
  export const AppBar = muiStyled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));