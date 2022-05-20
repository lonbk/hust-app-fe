/* Libs */
import React from 'react';
import { Grid, Typography, Icon } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  registerables as registerablesJS,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import faker from '@faker-js/faker';
/* Components */
import {
  StyledPaperWithPadding,
  StyledStep,
  StyledTable,
  CommonReport,
} from '../components';
import StyledDateTimePicker, {
  RangeSelection,
} from '../../../components/DateTimePicker';
/* Styles */
import { StyledPaper, FlexBox } from '../../../styles';
/* Types */
import { statsLevel } from '../../../types/levels';
interface UserInfo {
  fullname: string;
  gender: string;
  dateOfBirth: string;
  disease: string;
  height: string;
  weight: string;
  BMI: string;
}
ChartJS.register(...registerablesJS);

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  aspectRatio: 3,
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const insulinData = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 200 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const grucoseData = {
  labels,
  datasets: [
    {
      type: 'line' as const,
      label: 'Dataset 1',
      borderColor: 'rgb(255, 99, 132)',
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: 0, max: 400 })),
    },
    {
      type: 'bar' as const,
      label: 'Dataset 2',
      backgroundColor: 'rgb(75, 192, 192)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 400 })),
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar' as const,
      label: 'Dataset 3',
      backgroundColor: 'rgb(53, 162, 235)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 400 })),
    },
  ],
};

const commonStats = [
  {
    title: 'Average Blood Glucose',
    lastUpdate: 'Feb 22, 2022',
    body: (
      <>
        <FlexBox column={true} justify='flex-start' align='flex-start'>
          <FlexBox
            column={false}
            justify='flex-start'
            align='flex-end'
            style={{ margin: '10px 0' }}
          >
            <Typography
              variant='h1'
              component='div'
              sx={{ marginRight: '10px' }}
            >
              148
            </Typography>
            <Typography variant='h5' component='div'>
              mg/dL
            </Typography>
          </FlexBox>
          <FlexBox column={false} justify='flex-start' align='center'>
            <Icon
              fontSize='small'
              component={ArrowDownwardIcon}
              sx={{ color: 'error.main' }}
            />
            <Typography
              variant='h6'
              component='div'
              sx={{ color: 'error.main' }}
            >
              .5 %
            </Typography>
          </FlexBox>
        </FlexBox>
      </>
    ),
  },
  {
    title: 'Average Daily Readings',
    lastUpdate: 'Feb 22, 2022',
    body: (
      <>
        <FlexBox column={true} justify='flex-start' align='flex-start'>
          <FlexBox
            column={false}
            justify='flex-start'
            align='flex-end'
            style={{ margin: '10px 0' }}
          >
            <Typography
              variant='h1'
              component='div'
              sx={{ marginRight: '10px' }}
            >
              8
            </Typography>
            <Typography variant='h5' component='div'>
              readings
            </Typography>
          </FlexBox>
          <FlexBox column={false} justify='flex-start' align='center'>
            <Icon
              fontSize='small'
              component={ArrowDownwardIcon}
              sx={{ color: 'error.main' }}
            />
            <Typography
              variant='h6'
              component='div'
              sx={{ color: 'error.main' }}
            >
              1 reading
            </Typography>
          </FlexBox>
        </FlexBox>
      </>
    ),
  },
  {
    title: 'Hypo & Hyper',
    lastUpdate: 'Feb 22, 2022',
    body: (
      <FlexBox column={false} justify='space-between' align='flex-start'>
        <FlexBox column={true} justify='flex-start' align='flex-start'>
          <FlexBox
            column={false}
            justify='flex-start'
            align='flex-end'
            style={{ margin: '10px 0' }}
          >
            <Typography
              variant='h1'
              component='div'
              sx={{
                marginRight: '5px',
                textTransform: 'uppercase',
                color: 'info.main',
              }}
            >
              3
            </Typography>
            <Typography
              variant='h5'
              component='div'
              sx={{ textTransform: 'uppercase', color: 'info.main' }}
            >
              hyper
            </Typography>
          </FlexBox>
          <FlexBox column={false} justify='flex-start' align='center'>
            <Typography variant='subtitle1' component='div'>
              {'> 250 mg/dL'}
            </Typography>
          </FlexBox>
        </FlexBox>
        <FlexBox column={true} justify='flex-start' align='flex-start'>
          <FlexBox
            column={false}
            justify='flex-start'
            align='flex-end'
            style={{ margin: '10px 0' }}
          >
            <Typography
              variant='h1'
              component='div'
              sx={{
                marginRight: '5px',
                textTransform: 'uppercase',
                color: 'error.main',
              }}
            >
              1
            </Typography>
            <Typography
              variant='h5'
              component='div'
              sx={{ textTransform: 'uppercase', color: 'error.main' }}
            >
              hypo
            </Typography>
          </FlexBox>
          <FlexBox column={false} justify='flex-start' align='center'>
            <Typography variant='subtitle1' component='div'>
              {'< 70 mg/dL'}
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    ),
  },
  {
    title: 'Hemoglobin A1c',
    lastUpdate: 'Jan 22, 2022',
    body: (
      <>
        <FlexBox column={true} justify='flex-start' align='flex-start'>
          <FlexBox
            column={false}
            justify='flex-start'
            align='flex-end'
            style={{ margin: '10px 0' }}
          >
            <Typography
              variant='h1'
              component='div'
              sx={{ marginRight: '10px' }}
            >
              9.6
            </Typography>
            <Typography variant='h5' component='div'>
              %
            </Typography>
          </FlexBox>
          <FlexBox column={false} justify='flex-start' align='center'>
            <Icon
              fontSize='small'
              component={ArrowDownwardIcon}
              sx={{ color: 'error.main' }}
            />
            <Typography
              variant='h6'
              component='div'
              sx={{ color: 'error.main' }}
            >
              .5 %
            </Typography>
          </FlexBox>
        </FlexBox>
      </>
    ),
  },
];

export const Stats: React.FC = () => {
  const userInfo = {
    fullname: 'Fernando Torres',
    gender: 'Male',
    dateOfBirth: '02/02/2000',
    disease: 'ADHD',
    height: '183 cm',
    weight: '80 kg',
    BMI: '23.32',
  };

  const userNav = [];
  for (const key in userInfo) {
    userNav.push(
      <FlexBox key={key} column={true} justify='center' align='flex-start'>
        <Typography variant='subtitle1' component='div'>
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Typography>
        <Typography variant='h6' component='div'>
          {userInfo[key as keyof UserInfo]}
        </Typography>
      </FlexBox>
    );
  }

  return (
    <>
      <Grid item xs={false} md={12}>
        <StyledPaper borderRadius='8px'>
          <FlexBox
            column={false}
            justify='flex-start'
            align='center'
            style={{ padding: '16px' }}
          >
            {userNav}
          </FlexBox>
        </StyledPaper>
      </Grid>
      <Grid item xs={false} md={12}>
        <StyledPaper borderRadius='8px' sx={{ padding: '14px 24px' }}>
          <FlexBox column={false} justify='space-between' align='center'>
            <RangeSelection
              selections={[
                {
                  range: 'Today',
                  active: true,
                },
                {
                  range: 'Last 7 days',
                  active: false,
                },
                {
                  range: 'Last 30 days',
                  active: false,
                },
                {
                  range: 'Last 365 days',
                  active: false,
                },
              ]}
            />
            <StyledDateTimePicker />
          </FlexBox>
        </StyledPaper>
      </Grid>
      <Grid item xs={false} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={false} md={12}>
            <Grid container spacing={2}>
              {commonStats.map((stat) => (
                <Grid key={stat.title} item xs={false} md={3}>
                  <CommonReport
                    title={stat.title}
                    lastChecked={stat.lastUpdate}
                    body={stat.body}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={false} md={12}>
            <Grid container spacing={2}>
              <Grid item xs={false} md={9}>
                <StyledPaperWithPadding
                  borderRadius='16px'
                  sections={[
                    <FlexBox
                      column={false}
                      justify='space-between'
                      align='center'
                    >
                      <Typography variant='h5' component='div'>
                        Insulin Taken vs Prescribed
                      </Typography>
                    </FlexBox>,
                    <Line options={options} data={insulinData} />,
                  ]}
                />
              </Grid>
              <Grid item xs={false} md={3}>
                <StyledPaperWithPadding
                  borderRadius='16px'
                  sections={[
                    <FlexBox
                      column={false}
                      justify='space-between'
                      align='center'
                    >
                      <Typography variant='h5' component='div'>
                        Blood Glucose Stats
                      </Typography>
                    </FlexBox>,
                    <FlexBox
                      column={true}
                      justify='space-between'
                      align='flex-start'
                    >
                      <Typography
                        variant='subtitle2'
                        component='div'
                        sx={{ textTransform: 'uppercase' }}
                      >
                        average glucose
                      </Typography>
                      <FlexBox
                        column={false}
                        justify='flex-start'
                        align='center'
                      >
                        <Typography
                          variant='h5'
                          component='div'
                          sx={{ marginRight: '5px', color: 'primary.error' }}
                        >
                          148 mg/dL
                        </Typography>
                        <Typography
                          variant='subtitle1'
                          component='div'
                          sx={{ color: 'info.main' }}
                        >
                          based on 8 readings
                        </Typography>
                      </FlexBox>
                    </FlexBox>,
                    <FlexBox
                      column={true}
                      justify='space-between'
                      align='flex-start'
                    >
                      <Typography
                        variant='subtitle2'
                        component='div'
                        sx={{ textTransform: 'uppercase' }}
                      >
                        glucose level distribution
                      </Typography>
                      <FlexBox
                        column={false}
                        justify='flex-start'
                        align='center'
                      >
                        <Typography
                          variant='h5'
                          component='div'
                          sx={{ marginRight: '5px', color: 'primary.error' }}
                        >
                          148 mg/dL
                        </Typography>
                        <Typography
                          variant='subtitle1'
                          component='div'
                          sx={{ color: 'info.main' }}
                        >
                          based on 8 readings
                        </Typography>
                      </FlexBox>
                    </FlexBox>,
                    <FlexBox
                      column={true}
                      justify={'center'}
                      align={'space-between'}
                    >
                      {statsLevel.map((item) => (
                        <StyledStep
                          key={item.level}
                          level={item.level}
                          range={item.range}
                          threshold={item.threshold}
                          readings={item.readings}
                        />
                      ))}
                    </FlexBox>,
                  ]}
                />
              </Grid>

              <Grid item xs={false} md={9}>
                <StyledPaperWithPadding
                  borderRadius='16px'
                  sections={[
                    <FlexBox
                      column={false}
                      justify='space-between'
                      align='center'
                    >
                      <Typography variant='h5' component='div'>
                        Blood Glucose
                      </Typography>
                    </FlexBox>,
                    <Chart
                      type='bar'
                      data={grucoseData}
                      options={{ aspectRatio: 3 }}
                    />,
                  ]}
                />
              </Grid>
              <Grid item xs={false} md={3}>
                <StyledPaperWithPadding
                  borderRadius='16px'
                  sections={[
                    <FlexBox
                      column={false}
                      justify='space-between'
                      align='center'
                    >
                      <Typography variant='h5' component='div'>
                        Patient Specific Glucose Threshold
                      </Typography>
                    </FlexBox>,
                    <StyledTable />,
                  ]}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
