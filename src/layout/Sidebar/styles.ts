import MuiDrawer from "@mui/material/Drawer";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { List, Box, Avatar } from '@mui/material';

interface LogoTitleProps extends TypographyProps {
  isOpen: boolean;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: '260px',
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
  position: 'relative',
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

export const LogoTitle = styled(Typography)<LogoTitleProps>(({ theme, isOpen }) => ({
  display: isOpen ? 'block' : 'none',
  color: theme.palette.primary.main,
  marginLeft: '15px'
}))

export const SiderMenuList = styled(List)(({ theme }) => ({
  paddingTop: '29px',
  position: 'relative',
}))

export const UserOuterBox = styled(Box)(({ theme }) => ({
  display: 'flex', 
  padding: '30px 20px', 
  justifyContent: 'center', 
  alignItems: 'center'
}))

export const UserInnerBox = styled(Box)<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  display: isOpen ? 'flex' : 'none', 
  flexDirection: 'column'
}))