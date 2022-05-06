/* Libs */
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
/* Configs */
import { routes } from "../../pages/Portal/PortalRoutes";
/* Redux */
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectUser } from "../../features/user/userSelector";
import { userLogout } from "../../features/user/userSlice";
/* Styles */
import {
  UsernameHeader,
  MenuChild,
  Linkstyles,
  FlexHeader,
  // AppBar,
  StyledAppBar
} from "./styles"
/* Types */
type Props = {
  isOpen: boolean
};

const Header: React.FC<Props> = ({ isOpen }: Props) => {
  /* Hooks */
  const dispatch = useAppDispatch();
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
  console.log(location.pathname)
  const handleLogout = () => {
    dispatch(userLogout());
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
      <StyledAppBar position="fixed" sx={{width: `calc(100% - ${isOpen ? '240px' : '120px'}`, bgcolor: 'background.default'}} elevation={0}>
        <Toolbar sx={{minHeight: '97px !important'}}>
          <FlexHeader isOpen={isOpen}>
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
      </StyledAppBar>

  );
};

export default Header;
