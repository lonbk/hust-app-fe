/* Libs */
import React, { memo } from 'react';
import {
  Toolbar,
  Typography,
  Badge,
  IconButton,
} from '@mui/material';
/* Components */
import SearchBox from '../../components/SearchBox';
import notificationIcon from '../../assets/notification.svg';
/* Redux */
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/user/userSelector';
/* Styles */
import {
  FlexHeader,
  AppBar,
  WelcomeBox
} from './styles';
/* Types */
type Props = {
  isOpen: boolean;
};

const Header: React.FC<Props> = ({ isOpen }: Props) => {
  /* Redux */
  const { auth0Info } = useAppSelector(selectUser);
  /* Utils */
  /* Local states */
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [anchorElChild, setAnchorElChild] = useState(null);
  // const open = Boolean(anchorEl);
  /* Local methods */
  // const handleMenu = (event: any) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClick = (event: any) => {
  //   setAnchorElChild(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  //   setAnchorElChild(null);
  // };

  // const handleCloseChild = () => {
  //   handleClose();
  //   setAnchorElChild(null);
  // };
  // const handleLogout = () => {
  //   dispatch(userLogout());
  //   logout({ returnTo: window.location.origin });
  // };

  return (
    <AppBar
      position='fixed'
      style={{ backgroundColor: '#ffffff', color: '#081735' }}
      sx={{ width: `calc(100% - ${isOpen ? '260px' : '120px'}` }}
      elevation={0}
    >
      <Toolbar sx={{ minHeight: '97px !important' }}>
        <FlexHeader isOpen={isOpen}>
          <WelcomeBox>
            <Typography
              variant="h3"
              component="div"
              sx={{color: 'text.main'}}
            >
              Welcome back,
            </Typography>
            <Typography
              variant="h1"
              component="div"
              sx={{color: 'text.main'}}
            >
              {`Dr. ${auth0Info?.given_name}`}
            </Typography>
          </WelcomeBox>
          <SearchBox />
          <IconButton sx={{ width: '48px', height: '48px'}}>
            <Badge badgeContent={2} color="error">
              <img src={notificationIcon} style={{ maxWidth: "100%" }} alt="notification" />
            </Badge>
          </IconButton>
          {/* <Menu
            style={{
              margin: '8px',
              boxShadow: '0 3px 3px 0 rgba(18, 37, 63, 0.03)',
            }}
            id='menu-appbar'
            anchorEl={anchorEl}
            keepMounted
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <MenuChild variant='h5'>
                <SettingsTwoToneIcon style={{ marginRight: '8px' }} />
                <Linkstyles to='/profile'>
                  <p>Profile</p>
                </Linkstyles>
              </MenuChild>
            </MenuItem> */}

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
            {/* <MenuItem onClick={handleLogout}>
              <MenuChild variant='h5'>
                <ExitToAppTwoToneIcon style={{ marginRight: '8px' }} />
                <p>Log out</p>
              </MenuChild>
            </MenuItem>
          </Menu> */}
        </FlexHeader>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
