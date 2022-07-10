/* Libs */
import React, { memo } from 'react';
import {
  Toolbar,
  Typography,
  Badge,
  IconButton,
} from '@mui/material';
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
              Chào mừng bạn đã quay lại,
            </Typography>
            <Typography
              variant="h1"
              component="div"
              sx={{color: 'text.main'}}
            >
              {`${auth0Info?.given_name}`}
            </Typography>
          </WelcomeBox>
          <a href="https://hust.edu.vn/">
            <img src="https://hust.edu.vn/hust-theme/images/logoEn.png" width={420} height={70} />
          </a>
        </FlexHeader>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
