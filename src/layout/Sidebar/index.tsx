/* Libs */
import { List, ListItemButton, Divider, IconButton, ListItemIcon, ListItemText } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
/* Components */
import StyledNavLink from "../../components/StyledNavLink";
import { drawerWidth, DrawerHeader } from "../DrawerHeader";
import { MainLogo } from "../../styles";
/* Hooks */
/* Configs */
import { routes } from "../../config/routeConfig";
/* Types */
type Props = {
  isOpen: boolean;
  onDrawerClose: () => void;
};

/* Styled components */
const logo = process.env.PUBLIC_URL + "/logo.png";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
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
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
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

const Sidebar = ({ isOpen, onDrawerClose }: Props) => {
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={isOpen}>
      <DrawerHeader>
        <MainLogo className="app-logo" src={logo} />
        <IconButton onClick={onDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routes.map((route, index) => (
          route.hideInMenu ? null : (
          <ListItemButton
            key={index}
            sx={{
              minHeight: 48,
              justifyContent: isOpen ? "initial" : "center",
              px: 2.5,
            }}
            component={StyledNavLink}
            to={route.path}
          >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText
                primary={route.title}
                sx={{ opacity: isOpen ? 1 : 0 }}
              />
          </ListItemButton>
          )
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
