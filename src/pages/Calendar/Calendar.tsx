/* Libs */
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  AppointmentTooltip,
  AppointmentForm,
  ConfirmationDialog,
  Resources
} from '@devexpress/dx-react-scheduler-material-ui';
/* Components */
import { RangeSelection } from '../../components/DateTimePicker';
/* Utils */
import { appointments } from './appointments';
import { useTitleContext } from '../Portal';
/* Styles */
import { StyledPaper } from '../../styles';
import { RangeSelectionWrapper } from './style';
import './calendar.css'

const Calendar: React.FC = () => {
  const handleChangeTitle = useTitleContext();
  const [view, setView] = useState('Week');
  
  const [data, setData] = useState(appointments);
  const [currentDate, setCurrentDate] = useState<Date | string>('2018-06-27');
  
  const resources = [{
    fieldName: 'type',
    title: 'Type',
    instances: [
      { id: 'private', text: 'Private', color: '#EC407A' },
      { id: 'work', text: 'Work', color: '#6C5DD3' },
    ],
  }];

  const handleCurrentDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const commitChanges = ({ added, changed, deleted }: any) => {
    setData((state) => {
      let data = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
          ? { ...appointment, ...changed[appointment.id] }
          : appointment
          );
        }
        if (deleted !== undefined) {
          data = data.filter((appointment) => appointment.id !== deleted);
        }
        return data;
      });
    };
    
    const dateOptions = [
      {
      range: 'Day',
      active: false,
    },
    {
      range: 'Week',
      active: true,
    },
    {
      range: 'Month',
      active: false,
    },
  ];

  const views = [
    {
      range: 'Day',
      view: <DayView startDayHour={9} endDayHour={19} />
    },
    {
      range: 'Week',
      view: <WeekView startDayHour={9} endDayHour={19} />
    },
    {
      range: 'Month',
      view: <MonthView  />
    }
  ]

  useEffect(() => {
    handleChangeTitle('Calendar');
  }, [])

  
  return (
    <Grid container spacing={2}>
      <Grid item xs={false} md={12}>
        <StyledPaper borderRadius="16px" sx={{ paddingBottom: '10px', position: 'relative' }}>
          <Scheduler data={data} height={"auto"}>
            <RangeSelectionWrapper>
              <RangeSelection selections={dateOptions} />
            </RangeSelectionWrapper>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={handleCurrentDateChange}
            />
            <Toolbar />
            <DateNavigator />
            <WeekView startDayHour={9} endDayHour={19} />
            <TodayButton />
            <EditingState onCommitChanges={commitChanges} />
            <IntegratedEditing />
            {/* <DayView startDayHour={9} endDayHour={19} /> */}
            <ConfirmationDialog />
            
            <Appointments />
            <AppointmentTooltip showCloseButton showOpenButton />
            <AppointmentForm />

            <Resources
              data={resources}
            />
          </Scheduler>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default Calendar;
