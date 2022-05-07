import MuiDrawer from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import { Typography } from "@mui/material";

const openedMixin = (theme: Theme): CSSObject => ({
    width: '240px',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });
  
  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: '120px',
    [theme.breakpoints.up("sm")]: {
      width: `120px`,
    },
  });
  
  export const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    background: '0% 0% no-repeat padding-box',
    flexShrink: 0,
    borderRight: 'none',
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));
  
export const LogoTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop === "component"
})<{isOpen: boolean}>(({ theme, isOpen }) => ({
  display: isOpen ? 'block' : 'none',
  color: theme.palette.primary.main,
  marginLeft: '15p'
}))