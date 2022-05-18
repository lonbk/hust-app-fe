/* Libs */
import React, { useContext, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
/* Components */
import Item from '../../components/Item';
import DynamicChart from '../../components/DynamicChart';
import { useTitleContext } from '../Portal';

const Dashboard: React.FC = () => {
  const handleChangeTitle = useTitleContext();

  useEffect(() => {
    handleChangeTitle('Traffic');
  }, [])

  return (
    <Grid container spacing={4} sx={{ px: 2}}>
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>

          </Grid>
          {/* ************************************ */}
          <Grid item xs={12} sm={12} md={6}></Grid>
        </Grid>
      </Grid>
      {/* ************************************ */}
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h5' component='div'>
                  Gender
                </Typography>
                <Typography variant='subtitle1' component='div'>
                  Customers that use our service
                </Typography>
              </Box>
              <DynamicChart dataType='gender' />
            </Item>
          </Grid>
          {/* ************************************ */}
          <Grid item xs={12} sm={12} md={6}>
            <Item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant='h5' component='div'>
                  Disease
                </Typography>
                <Typography variant='subtitle1' component='div'>
                  Customers that use our service
                </Typography>
              </Box>
              <DynamicChart dataType='disease' />
            </Item>
          </Grid>
        </Grid>
      </Grid>
      {/* ************************************ */}
      <Grid item xs={12} sm={12} md={12}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={3}>
            <Item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <Typography variant='h5' component='div'>
                Anxiety
              </Typography>
              <DynamicChart disease='anxiety' />
            </Item>
          </Grid>
          {/* ************************************ */}
          <Grid item xs={12} sm={12} md={3}>
            <Item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <Typography variant='h5' component='div'>
                Depression
              </Typography>
              <DynamicChart disease='depression' />
            </Item>
          </Grid>
          {/* ************************************ */}
          <Grid item xs={12} sm={12} md={3}>
            <Item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <Typography variant='h5' component='div'>
                ADHD
              </Typography>
              <DynamicChart disease='ADHD' />
            </Item>
          </Grid>
          {/* ************************************ */}
          <Grid item xs={12} sm={12} md={3}>
            <Item
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '24px',
              }}
            >
              <Typography variant='h5' component='div'>
                Isomia
              </Typography>
              <DynamicChart disease='isomia' />
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
