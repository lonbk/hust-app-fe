/* Libs */
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Typography,
  Grid,
  IconButton,
  ListProps,
  ListSubheaderProps,
} from '@mui/material';
/* Components */
import { ExerciseCard } from '../components';
import { StyledPaperWithPadding } from '../components';
import backgroundTestImg from '../../../assets/background.svg';
import avatarTestImg from '../../../assets/avatar.svg';
import userIcon from '../../../assets/info/user.svg';
import emailIcon from '../../../assets/info/email.svg';
import companyIcon from '../../../assets/info/company.svg';
import departmentIcon from '../../../assets/info/department.svg';
import phoneIcon from '../../../assets/info/phone.svg';
import mindfulDragonImg from '../../../assets/exercises/mindfulDragon.png';
import journalingImg from '../../../assets/exercises/journaling.png';
import students from '../../../data/students.json';
/* Styles */
import { FlexBox } from '../../../styles';
import {
  InfoList,
  InfoListItem,
  InfoListHeader,
  InfoListItemIcon, 
  InfoListItemText,
  BackgroundImage,
  StudentAvatar,
} from '../styles';

export const Information: React.FC = () => {
   const selectedStudent = useOutletContext<any>();

  const listSubHeaders = ['Thông tin', 'Liên hệ'];
  const listItems = [
    {
      category: 'Thông tin',
      label: 'name',
      title: selectedStudent.full_name,
      icon: <img src={userIcon} alt='name' />,
    },
    {
      category: 'Thông tin',
      label: 'department',
      title: selectedStudent.mssv,
      icon: <img src={departmentIcon} alt='department' />,
    },
    {
      category: 'Thông tin',
      label: 'company',
      title: selectedStudent.department_name,
      icon: <img src={companyIcon} alt='company' />,
    },
    {
      category: 'Liên hệ',
      label: 'email',
      title: selectedStudent.email,
      icon: <img src={emailIcon} alt='email' />,
    },
    {
      category: 'Liên hệ',
      label: 'phone', 
      title: '+1 (609) 972-22-22',
      icon: <img src={phoneIcon} alt='phone' />,
    },
  ];

  const infoListAttrs: ListProps & { component: React.ElementType } = {
    component: 'nav',
  };

  const infoListHeaderAttrs: ListSubheaderProps & {
    component: React.ElementType;
  } = {
    id: 'nested-list-subheader',
    component: 'ul',
  };

  return (
    <>
      <Grid item xs={false} md={12}>
        <FlexBox
          column={false}
          justify='center'
          align='center'
          style={{ position: 'relative', marginBottom: '40px' }}
        >
          <BackgroundImage src={backgroundTestImg} alt='background' />
          <StudentAvatar src={selectedStudent.avatar} alt='avatar' /> 
        </FlexBox>
        <FlexBox column={false} justify='center' align='center'>
          <Typography variant='h5' component='div'>
            {selectedStudent.full_name}
          </Typography> 
        </FlexBox>
      </Grid>
      <Grid item xs={false} md={4}>
        <StyledPaperWithPadding
          borderRadius='16px'
          sections={[
            <FlexBox
              column={false}
              justify='space-between'
              align='center'
            >
              <Typography variant='h5' component='div'>
                Hồ sơ
              </Typography>
            </FlexBox>,
            <InfoList
              {...infoListAttrs}
              aria-labelledby='nested-list-subheader'
              // subheader={<li />}
            >
              {listSubHeaders.map((header) => (
                <div key={header} style={{ margin: '0px 0px 10px 0px' }}>
                  <InfoListHeader {...infoListHeaderAttrs}>
                    <Typography
                      variant='subtitle1'
                      component='ul'
                      sx={{ textTransform: 'uppercase' }}
                    >
                      {header}
                    </Typography>
                  </InfoListHeader>
                  {listItems.map(
                    (item) =>
                      item.category === header && (
                        <InfoListItem key={item.title}>
                          <InfoListItemIcon>
                            <FlexBox
                              column={false}
                              justify='center'
                              align='center'
                            >
                              {item.icon}
                            </FlexBox>
                          </InfoListItemIcon>
                          <InfoListItemText primary={item.title} />
                        </InfoListItem>
                      )
                  )}
                </div>
              ))}
            </InfoList>
          ]}

        />
      </Grid>
      <Grid item xs={false} md={8}>
        <StyledPaperWithPadding
          borderRadius='16px'
          sections={[
            <FlexBox
              column={false}
              justify='space-between'
              align='center'
            >
              <Typography variant='h5' component='div'>
                Hoạt động điểm rèn luyện
              </Typography>
            </FlexBox>,
            <Grid container spacing={2}>
              <Grid item xs={false} md={3}>
                <ExerciseCard title="Cốc trà đá vì động đồng" time="04 April 2022" image={journalingImg} />
              </Grid>
              <Grid item xs={false} md={3}>
                <ExerciseCard title="10000 bước chân vì sức khỏe mỗi ngày" time="05 April 2022" image={mindfulDragonImg} />
              </Grid>
            </Grid>
          ]}
        />
      </Grid>
    </>
  );
};
