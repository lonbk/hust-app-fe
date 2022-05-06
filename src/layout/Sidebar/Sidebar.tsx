/* Libs */
import React from 'react';
import {
  List,
  ListItemButton,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
/* Components */
import StyledNavLink from '../../components/StyledNavLink';
import { DrawerHeader } from '../Header/DrawerHeader';
import { MainLogo } from '../../styles';
import { Drawer } from './styles';
import logo from '../../assets/logo.svg';
/* Utils */
import { routes } from '../../pages/Portal/PortalRoutes';
/* Types */
interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<Props> = ({ isOpen, onOpen, onClose }: Props) => {
  const navigate = useNavigate();

  return (
    <Drawer variant='permanent' open={isOpen} elevation={0}>
      <DrawerHeader>
        <MainLogo className='app-logo' src={logo} />
        <Typography
          variant='h1'
          component='a'
          onClick={() => navigate('/dashboard')}
          sx={{ display: isOpen ? 'block' : 'none', color: 'primary.main', marginLeft: '15px'}}
        >
          Akahealth
        </Typography>
      </DrawerHeader>
      <List>
        {routes.map((route, index) =>
          route.hideInMenu ? null : (
            <ListItemButton
              key={index}
              sx={{
                minHeight: 48,
                justifyContent: isOpen ? 'initial' : 'center',
                px: 2.5,
              }}
              component={StyledNavLink}
              to={route.path}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isOpen ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {route.icon}
              </ListItemIcon>
              <ListItemText
                primary={route.title}
                sx={{ opacity: isOpen ? 1 : 0 }}
              />
            </ListItemButton>
          )
        )}
      </List>
      <IconButton
        color='inherit'
        aria-label='open drawer'
        onClick={isOpen ? onClose : onOpen}
        edge='start'
        sx={{
          marginRight: 5,
        }}
      >
        <MenuIcon />
      </IconButton>
    </Drawer>
  );
};

export default Sidebar;
