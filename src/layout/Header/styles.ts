import { Link } from 'react-router-dom';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  styled as muiStyled,
  Typography,
  Box
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
  
  export const FlexHeader = styled.div<{isOpen: boolean}>`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: ${props => props.isOpen ? '260px' : '120px'};
    transition: linear 0.2s;
  `
  
  export const AppBar = muiStyled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    backgroundColor: theme.palette.background.default + '!important',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

export const WelcomeBox = muiStyled(Box)(({ theme }) => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
}))