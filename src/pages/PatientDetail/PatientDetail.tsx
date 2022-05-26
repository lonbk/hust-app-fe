/* Libs */
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useLocation, useNavigate } from 'react-router-dom';
/* Components */
import Room from '../Room';
import { InformationIcon } from '../../assets/profile/InformationIcon';
import { AppointmentsIcon } from '../../assets/profile/AppointmentsIcon';
import { StatsIcon } from '../../assets/profile/StatsIcon';
import StyledNavLink from '../../components/StyledNavLink';
/* Styles */
import { FlexBox, StyledButton } from '../../styles';

const PatientDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [visisbleCallVideo, setVisisbleCallVideo] = useState<boolean>(false);

  const handleOpenCallVideo = () => {
    setVisisbleCallVideo(true);
  };

  const handleCloseCallVideo = () => {
    setVisisbleCallVideo(false);
  };

  const userOptions = [
    {
      name: 'Information',
      link: 'information',
      icon: (isActive: boolean) => <InformationIcon isActive={isActive} />,
    },
    {
      name: 'Stats',
      link: 'stats',
      icon: (isActive: boolean) => <StatsIcon isActive={isActive} />,
    },
    {
      name: 'Appointments',
      link: 'appointments',
      icon: (isActive: boolean) => <AppointmentsIcon isActive={isActive} />,
    },
  ];

  // const styledButtonAttrs: ButtonProps & { component: React.ElementType } = {

  // }

  useEffect(() => {
    navigate('information');
  }, []);

  return (
    <>
      <Room open={visisbleCallVideo} handleClose={handleCloseCallVideo} />
      <Grid container spacing={2}>
        <Grid item xs={false} md={12}>
          <StyledButton
            borderRadius='8px'
            width='auto'
            height='30px'
            startIcon={<KeyboardBackspaceIcon />}
            variant='contained'
            onClick={() => navigate('/patients')}
          >
            Back to patients table
          </StyledButton>
        </Grid>
        <Grid item xs={false} md={12}>
          <FlexBox column={false} justify='space-between' align='center'>
            <FlexBox column={false} justify='flex-start' align='center'>
              {userOptions.map((option) => {
                const isActive = location.pathname.includes(option.link)
                  ? true
                  : false;
                return (
                  <StyledButton
                    key={option.name}
                    width='150px'
                    height='46px'
                    borderRadius='8px'
                    component={StyledNavLink}
                    variant='text'
                    startIcon={option.icon(isActive)}
                    to={option.link}
                    defaultActiveStyle={true}
                  >
                    {option.name}
                  </StyledButton>
                );
              })}
            </FlexBox>
            <StyledButton
              width='100px'
              height='46px'
              borderRadius='8px'
              variant='contained'
              startIcon={<PhoneIcon />}
              onClick={() => handleOpenCallVideo()}
            >
              Call
            </StyledButton>
          </FlexBox>
        </Grid>
        <Grid item xs={false} md={12}>
          <Grid container spacing={2}>
            <Outlet />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PatientDetail;
