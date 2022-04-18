/* Libs */
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  styled as muiStyled,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
/* Configs */
import { routes } from "../../config/routeConfig";
/* Redux */
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSelector";
/* Styles */
import {
  UsernameHeader,
  MenuChild,
  Linkstyles,
  FlexHeader,
  AppBar,
} from "./styles";
/* Types */
type Props = {
  isOpen: boolean;
  onDrawerOpen: () => void;
};

type TitleContextType = {
  title: string;
  changeTitle: (title: string) => void;
};

const TitleContext = React.createContext<TitleContextType | null>(null);

const Header = ({ isOpen, onDrawerOpen }: Props) => {
  /* Hooks */
  const location = useLocation();
  const { logout } = useAuth0();
  const { auth0Info } = useAppSelector(selectUser);
  /* Local states */
  const [title, setTitle] = useState<string>('Dashboard');
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElChild, setAnchorElChild] = useState(null);
  const open = Boolean(anchorEl);
  /* Local methods */
  const changeTitle = (title: string) => {
    setTitle(title);
  }
  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  // const handleClick = (event: any) => {
  //   setAnchorElChild(event.currentTarget);
  // };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElChild(null);
  };

  // const handleCloseChild = () => {
  //   handleClose();
  //   setAnchorElChild(null);
  // };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };
  /* Effects */
  useEffect(() => {
    for(const route of routes) {
      if(location.pathname === route.path) {
        changeTitle(route.title)
      }
    }
  }, [location.pathname])

  return (
      <AppBar position="fixed" open={isOpen}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <FlexHeader>
            <Typography variant="h6" noWrap component="div">
              {title}
            </Typography>
            <Button
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {auth0Info?.picture ? (
                <Avatar src={auth0Info?.picture} />
              ) : (
                <AccountCircle
                  style={{
                    marginRight: "8px",
                    fontSize: 40,
                    color: "#7d7fff",
                  }}
                />
              )}
              <UsernameHeader variant="h3">{auth0Info?.name}</UsernameHeader>
              <ArrowDropDownIcon />
            </Button>
            <Menu
              style={{
                margin: "8px",
                boxShadow: "0 3px 3px 0 rgba(18, 37, 63, 0.03)",
              }}
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              elevation={0}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <MenuChild variant="h5">
                  <SettingsTwoToneIcon style={{ marginRight: "8px" }} />
                  <Linkstyles to="/profile">
                    <p>Profile</p>
                  </Linkstyles>
                </MenuChild>
              </MenuItem>

              {/* ---------------------------------------------------------------- */}
              {/* <MenuItem>
                <MenuChild variant="h5">
                  <PublicIcon style={{ marginRight: "8px" }} />
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <FormattedMessage id="language" />
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorElChild}
                    keepMounted
                    open={Boolean(anchorElChild)}
                    onClose={handleCloseChild}
                  >
                    <MenuItem onClick={() => switchLanguage("en")}>
                      <LanguageSwitchBtn
                        className={locale === "en" ? "active" : ""}
                      >
                        <img src={ENG} style={{ width: "100%" }} alt="en"></img>
                      </LanguageSwitchBtn>
                      ENG
                    </MenuItem>
                    <MenuItem onClick={() => switchLanguage("vi")}>
                      <LanguageSwitchBtn
                        className={locale === "vi" ? "active" : ""}
                      >
                        <img src={VN} style={{ width: "100%" }} alt="vi"></img>
                      </LanguageSwitchBtn>
                      VI
                    </MenuItem>
                  </Menu>
                </MenuChild>
              </MenuItem> */}
              {/* ---------------------------------------------------------------- */}
              <MenuItem onClick={handleLogout}>
                <MenuChild variant="h5">
                  <ExitToAppTwoToneIcon style={{ marginRight: "8px" }} />
                  <p>Log out</p>
                </MenuChild>
              </MenuItem>
            </Menu>
          </FlexHeader>
        </Toolbar>
      </AppBar>

  );
};

export default Header;
