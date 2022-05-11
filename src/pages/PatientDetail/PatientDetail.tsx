/* Libs */
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
/* Components */
import backgroundTestImg from '../../assets/background.svg';
import avatarTestImg from '../../assets/avatar.svg';
import { InformationIcon } from '../../assets/profile/InformationIcon';
import { AppointmentsIcon } from '../../assets/profile/AppointmentsIcon';
import StyledNavLink from '../../components/StyledNavLink';
/* Styles */
import { FlexBox, StyledButton } from '../../styles';
import { BackgroundImage, PatientAvatar } from './styles';

const PatientDetail: React.FC = () => {
  const location = useLocation();
  const userOptions = [
    {
      name: 'Information',
      link: 'information',
      icon: (isActive: boolean) => <InformationIcon isActive={isActive} />
    },
    {
      name: 'Appointments',
      link: 'appointments',
      icon: (isActive: boolean) => <AppointmentsIcon isActive={isActive} />
    },
  ];

  return (
    <>
      <FlexBox
        column={false}
        justify='center'
        align='center'
        style={{ position: 'relative', marginBottom: '40px' }}
      >
        <BackgroundImage src={backgroundTestImg} alt='background' />
        <PatientAvatar src={avatarTestImg} alt='avatar' />
      </FlexBox>
      <FlexBox
        column={false}
        justify='center'
        align='center'
        style={{ marginBottom: '51px' }}
      >
        <Typography variant='h5' component='div'>
          Fernando Torres
        </Typography>
      </FlexBox>
      <Grid container spacing={4}>
        <Grid item xs={false} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={false} md={4} />
            {userOptions.map((option) => {
              const isActive = location.pathname.includes(option.link)
                ? true
                : false;
              return (
                <Grid item xs={false} md={2}>
                    <FlexBox column={false} justify="center" align="center">
                        <StyledButton
                            width='124px'
                            height='46px'
                            borderRadius='8px'
                            variant='text'
                            startIcon={option.icon(isActive)}
                        >
                            <StyledNavLink defaultActiveStyle={true} to={option.link}>
                            {option.name}
                            </StyledNavLink>
                        </StyledButton>
                    </FlexBox>
                </Grid>
              );
            })}
            <Grid item xs={false} md={2} />
            <Grid item xs={false} md={2}>
                <FlexBox column={false} justify="center" align="center">
                    <StyledButton
                        width='124px'
                        height='46px'
                        borderRadius='8px'
                        variant='contained'
                        color='primary'
                    >
                        Add more
                    </StyledButton>
                </FlexBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={false} md={12}>
          <Grid></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default PatientDetail;
