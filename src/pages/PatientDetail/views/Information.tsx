/* Libs */
import React from 'react';
import {
  Divider,
  Typography,
  Grid,
  IconButton,
  ListProps,
  ListSubheaderProps,
} from '@mui/material';
/* Components */
import { StyledPaperWithPadding } from '../components/StyledPapperWithPadding';
import backgroundTestImg from '../../../assets/background.svg';
import avatarTestImg from '../../../assets/avatar.svg';
import actionDotsIcon from '../../../assets/actionDots.svg';
import userIcon from '../../../assets/info/user.svg';
import emailIcon from '../../../assets/info/email.svg';
import companyIcon from '../../../assets/info/company.svg';
import departmentIcon from '../../../assets/info/department.svg';
import phoneIcon from '../../../assets/info/phone.svg';
/* Styles */
import { StyledPaper, FlexBox } from '../../../styles';
import {
  InfoList,
  InfoListItem,
  InfoListHeader,
  InfoListItemIcon,
  InfoListItemText,
  BackgroundImage,
  PatientAvatar,
} from '../styles';

export const Information: React.FC = () => {
  const listSubHeaders = ['About', 'Contact'];
  const listItems = [
    {
      category: 'About',
      label: 'name',
      title: 'Fernando Torres',
      icon: <img src={userIcon} alt='name' />,
    },
    {
      category: 'About',
      label: 'department',
      title: 'No department',
      icon: <img src={departmentIcon} alt='department' />,
    },
    {
      category: 'About',
      label: 'company',
      title: 'BrightScout',
      icon: <img src={companyIcon} alt='company' />,
    },
    {
      category: 'Contact',
      label: 'email',
      title: 'fernandotorres@gmail.com',
      icon: <img src={emailIcon} alt='email' />,
    },
    {
      category: 'Contact',
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
          <PatientAvatar src={avatarTestImg} alt='avatar' />
        </FlexBox>
        <FlexBox column={false} justify='center' align='center'>
          <Typography variant='h5' component='div'>
            Fernando Torres
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
                Profile
              </Typography>
              <IconButton>
                <img
                  src={actionDotsIcon}
                  alt='dots'
                  style={{ width: '16px', height: '16px' }}
                />
              </IconButton>
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
                Activities
              </Typography>
              <IconButton>
                <img
                  src={actionDotsIcon}
                  alt='dots'
                  style={{ width: '16px', height: '16px' }}
                />
              </IconButton>
            </FlexBox>
          ]}
        />
      </Grid>
    </>
  );
};
