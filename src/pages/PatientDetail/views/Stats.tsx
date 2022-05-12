/* Libs */
import React from 'react';
import { Grid, Divider, Typography } from '@mui/material';
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
  registerables as registerablesJS
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import faker from '@faker-js/faker';
/* Styles */
import { StyledPaper, FlexBox } from '../../../styles';
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
      },   {
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

export const Stats: React.FC = () => {
  console.log('got here')

    return (
      <>
        <Grid item xs={false} md ={6}>
          <StyledPaper borderRadius="16px">
            <FlexBox column={false} justify="space-between" align="center" style={{ padding: '16px' }}>
              <Typography variant='h5' component='div'>
                Insulin Taken vs Prescribed
              </Typography>
            </FlexBox>
            <Divider />
            <div style={{ padding: '16px' }}>
              <Line options={options} data={insulinData} />
            </div>
          </StyledPaper>
        </Grid>
        <Grid item xs={false} md ={6}>
          <StyledPaper borderRadius="16px">
            <FlexBox column={false} justify="space-between" align="center" style={{ padding: '16px' }}>
              <Typography variant='h5' component='div'>
                Blood Glucose
              </Typography>
            </FlexBox>
            <Divider />
            <div style={{ padding: '16px' }}>
              <Chart type='bar' data={grucoseData} />
            </div>
          </StyledPaper>
        </Grid>
      </>
    )
}