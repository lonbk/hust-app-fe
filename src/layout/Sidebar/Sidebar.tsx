/* Libs */
import React, { useState, useRef, useEffect, memo } from 'react';
import {
  ListItemButton,
  Typography,
  ListItemIcon,
  ListItemText,
  IconButton,
  MenuList,
  MenuItem,
  Avatar,
  Box,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { TypographyProps } from '@mui/material/Typography';
import { useAuth0 } from '@auth0/auth0-react';
/* Components */
import MenuIcon from '../../components/MenuIcon';
import StyledNavLink from '../../components/StyledNavLink';
import { DrawerHeader } from '../Header/DrawerHeader';
import logo from '../../assets/logo.svg';
/* Redux */
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectUser } from '../../features/user/userSelector';
import { userLogout } from '../../features/user/userSlice';
/* Utils */
import { routes } from '../../PortalRoutes';
/* Styles */
import { MainLogo } from '../../styles';
import { Drawer,
  LogoTitle,
  SiderMenuList,
  UserOuterBox,
  UserInnerBox,
  MenuListItem } from './styles';
import './Sidebar.scss';
/* Types */
interface Props {
  isOpen: boolean;
}

const Sidebar: React.FC<Props> = ({ isOpen }) => {
  /* Utils */
  const navigate = useNavigate();
  const location = useLocation();
  /* States */
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const prevOpen = useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const userMenu = (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom-start' ? 'left top' : 'left bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="composition-button"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem onClick={() => navigate('/profile')}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Drawer variant="permanent" open={isOpen} elevation={0}>
      <DrawerHeader onClick={() => navigate('/dashboard')}>
        <MainLogo className="app-logo" src={logo} />
        <LogoTitle isOpen={isOpen} variant="h2" component="a">
          Akahealth
        </LogoTitle>
      </DrawerHeader>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <SiderMenuList>
          {routes.map((route, index) => {
            const isActive = location.pathname.includes(route.path)
              ? true
              : false;

            return route.hideInMenu ? null : (
              <MenuListItem
                className="list-item-btn"
                key={index}
                component={StyledNavLink}
                to={route.path}
                defaultActiveStyle={true}
                isActive={isActive}
                isOpen={isOpen}
              >
                {route.icon && (
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isOpen ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <MenuIcon src={route.icon} isActive={isActive} />
                  </ListItemIcon>
                )}
                <ListItemText
                  className="list-item-text"
                  primary={
                    <Typography variant="h6" component="span">
                      {route.title}
                    </Typography>
                  }
                  sx={{
                    opacity: isOpen ? 1 : 0,
                    color: isActive ? '#FFFFFF' : 'text.secondary',
                  }}
                />
              </MenuListItem>
            );
          })}
        </SiderMenuList>
        <UserOuterBox isOpen={isOpen}>
          <IconButton
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Avatar
              src={logo}
              alt="ava"
              sx={{ width: '40px', height: '40px' }}
            />
          </IconButton>
          {userMenu}
          <UserInnerBox isOpen={isOpen}>
            <Typography variant="h6" component="div">
              USERNAME
            </Typography>
            <Typography variant="subtitle2" component="div">
              User
            </Typography>
          </UserInnerBox>
        </UserOuterBox>
      </Box>
    </Drawer>
  );
};

export default memo(Sidebar);
