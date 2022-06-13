import MuiDrawer from "@mui/material/Drawer";
import { styled as muiStyled, Theme, CSSObject } from "@mui/material/styles";
import { TypographyProps, ListItemButtonProps } from "@mui/material";
import { List, Box, ListItemButton, Typography, } from '@mui/material';

interface MenuListItemProps extends ListItemButtonProps {
  component?: React.ReactNode;
  to?: string;
  isActive: boolean;
  isOpen: boolean;
  defaultActiveStyle: boolean;
}
interface LogoTitleProps extends TypographyProps {
  isOpen: boolean;
  component?: React.ReactNode;
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

export const Drawer = muiStyled(MuiDrawer, {
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

export const LogoTitle = muiStyled(Typography)<LogoTitleProps>(({ theme, isOpen }) => ({
  display: isOpen ? 'block' : 'none',
  color: theme.palette.primary.main,
  marginLeft: '15px',
}))

export const SiderMenuList = muiStyled(List)(({ theme }) => ({
  paddingTop: '29px',
  position: 'relative',
}))

export const UserOuterBox = muiStyled(Box)<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  display: 'flex',
  padding: '30px 20px',
  justifyContent: isOpen ? 'flex-start' : 'center',
  alignItems: 'center',
  transition: 'linear 0.5s'
}))

export const UserInnerBox = muiStyled(Box)<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  display: isOpen ? 'flex' : 'none',
  flexDirection: 'column'
}))

export const MenuListItem = muiStyled(ListItemButton)<MenuListItemProps>(({ theme, isOpen, isActive }) => ({
  minHeight: 48,
  position: 'relative',
  paddingTop: '13px',
  paddingBottom: '13px',
  margin: '10px 30px 10px 30px',
  borderRadius: '12px',
  justifyContent: isOpen ? 'initial' : 'center',
  px: 2.5,
  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.secondary.light,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: '#FFFFFF',
  },
  '&:before': isActive ? {
    display: isOpen ? 'block' : 'none',
    content: '" "',
    position: 'absolute',
    top: 0,
    left: '-30px',
    backgroundColor: theme.palette.primary.main,
    width: '10px',
    height: '60px',
    borderRadius: '0px 16px 16px 0px',
  } : 'undefined'
}))
