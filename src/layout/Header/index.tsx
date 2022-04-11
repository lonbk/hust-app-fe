/* Libs */
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  styled as muiStyled,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
// import PublicIcon from "@mui/icons-material/Public";
/* Components */
import { drawerWidth, DrawerHeader } from "../DrawerHeader";
/* Hooks */
import { useAuth0 } from '@auth0/auth0-react';
/* Styles */
import styled from 'styled-components';
/* Configs */
/* Types */
type Props = {
  isOpen: boolean;
  onDrawerOpen: () => void;
};
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
/* Styled components */
const UsernameHeader = muiStyled(Typography)`
  font-weight: bold;
  color: #2c3742;
  font-size: 14px;
`;

const MenuChild = muiStyled(Typography)`
  display: flex;
  align-items: center;
  line-height: 30px;
`;

const Linkstyles = muiStyled(Link)`
  text-decoration:none;
  color:black;
`;

const FlexHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AppBar = muiStyled(MuiAppBar, {
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

const Header = ({ isOpen, onDrawerOpen }: Props) => {
  const { logout } = useAuth0();

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElChild, setAnchorElChild] = useState(null);
  const open = Boolean(anchorEl);

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
    logout();
  }

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
            Mini variant drawer
          </Typography>
          <Button
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle
              style={{
                marginRight: "8px",
                fontSize: 40,
                color: "#7d7fff",
              }}
            />
            <UsernameHeader variant="h3">Your name</UsernameHeader>
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
                <Linkstyles to="/Profile">
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
