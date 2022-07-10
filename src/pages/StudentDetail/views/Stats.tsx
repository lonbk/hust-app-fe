/* Libs */
import React from 'react';
import { useOutletContext } from 'react-router-dom';
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
/* Styles */
import { StyledPaper, FlexBox } from '../../../styles';
/* Types */
import { statsLevel } from '../../../types/levels';
interface UserInfo {
  HọTên: string;
  GiớiTính: string;
  NgàySinh: string;
  MSSV: string;
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

const labels = ['2018-2019', '2019-2020', '2020-2021', '2021-2022', '2022-2023'];

// grades[
//   {
//     period: '2018-2019',
//     cpa: '4.0'
//   }
// ]

export const gradeData = {
  labels,
  datasets: [
    {
      type: 'bar' as const,
      label: 'Kỳ 1',
      backgroundColor: 'rgb(75, 192, 192)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 4 , precision: 0.01 })),//grade.map((grade) => grade.cpa)
      borderColor: 'white',
      borderWidth: 2,
    },
    {
      type: 'bar' as const,
      label: 'Kỳ 2',
      backgroundColor: 'rgb(53, 162, 235)',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 4 , precision: 0.01 })),
    },
  ],
};

const commonStats = [
  {
    title: 'Điểm trung bình các kỳ',
    lastUpdate: 'June 27, 2022',
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
              3.51
            </Typography>
          </FlexBox>
          <FlexBox column={false} justify='flex-start' align='center'>
            <Typography
              variant='h6'
              component='div'
              sx={{ color: 'white' }}
            >
              . 
            </Typography>
          </FlexBox>
        </FlexBox>
      </>
    ),
  },
  {
    title: 'Điểm trung bình cao nhất',
    lastUpdate: 'June 27, 2022',
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
              3.93
            </Typography>
          </FlexBox>
          <FlexBox column={false} justify='flex-start' align='center'>
            <Typography
              variant='h6'
              component='div'
              sx={{ color: '#50C878' }}
            >
              Kỳ 20191
            </Typography>
          </FlexBox>
        </FlexBox>
      </>
    ),
  },
  {
    title: 'Điểm 2 kỳ gần nhất',
    lastUpdate: 'June 27, 2022',
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
                // color: 'info.main',
              }}
            >
              3.5
            </Typography>
          </FlexBox>
            <Typography
              variant='h6'
              component='div'
              sx={{ color: '#6495ED' }}
            >
              Kỳ 20202 
            </Typography>
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
                // color: 'error.main',
              }}
            >
              3.35
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
              Kỳ 20211 
            </Typography>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    ),
  },
];

export const Stats: React.FC = () => {
  const selectedStudent = useOutletContext<any>();
  const userInfo = {
    HọTên: selectedStudent.full_name,
    GiớiTính: selectedStudent.gender,
    NgàySinh: selectedStudent.date_of_birth,
    MSSV: selectedStudent.mssv,
  }; 

  const userNav = [];
  for (const key in userInfo) {
    userNav.push(
      <FlexBox key={key} column={true} justify='center' align='flex-start'>
        <Typography variant='subtitle1' component='div'>
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Typography>
        <Typography variant='h4' component='div'>
          {userInfo[key as keyof UserInfo]}
        </Typography>
      </FlexBox>
    );
  }

  return (
    
    <div>
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
                        Kết quả học tập 
                      </Typography>
                    </FlexBox>,
                    <Chart
                      type='bar'
                      data={gradeData}
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
                        Thang điểm
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
    </div>
  );
};
