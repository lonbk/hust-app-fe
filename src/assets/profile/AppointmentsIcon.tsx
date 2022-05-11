/*Libs */
import React from 'react';
import { theme } from '../../theme';

interface Props {
  isActive: boolean;
}

export const AppointmentsIcon: React.FC<Props> = ({ isActive }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
    >
      <g
        id='vuesax_outline_calendar-tick'
        data-name='vuesax/outline/calendar-tick'
        transform='translate(-556 -188)'
      >
        <g id='calendar-tick'>
          <path
            id='Vector'
            d='M.75,4.5A.755.755,0,0,1,0,3.75v-3A.755.755,0,0,1,.75,0,.755.755,0,0,1,1.5.75v3A.755.755,0,0,1,.75,4.5Z'
            transform='translate(563.25 189.25)'
            fill={theme.palette[isActive ? 'primary' : 'secondary'].main}
          />
          <path
            id='Vector-2'
            data-name='Vector'
            d='M.75,4.5A.755.755,0,0,1,0,3.75v-3A.755.755,0,0,1,.75,0,.755.755,0,0,1,1.5.75v3A.755.755,0,0,1,.75,4.5Z'
            transform='translate(571.25 189.25)'
            fill={theme.palette[isActive ? 'primary' : 'secondary'].main}
          />
          <path
            id='Vector-3'
            data-name='Vector'
            d='M1,1.987A1.052,1.052,0,0,1,.29,1.7,1.033,1.033,0,0,1,0,.987,1,1,0,0,1,.08.607,1.155,1.155,0,0,1,.29.278a1.047,1.047,0,0,1,1.42,0A1.052,1.052,0,0,1,2,.987a1.5,1.5,0,0,1-.02.2.636.636,0,0,1-.06.18.757.757,0,0,1-.09.18l-.12.15A1.052,1.052,0,0,1,1,1.987Z'
            transform='translate(563.5 200.513)'
            fill={theme.palette[isActive ? 'primary' : 'secondary'].main}
          />
          <path
            id='Vector-4'
            data-name='Vector'
            d='M1,1.994a1,1,0,0,1-.38-.08A1.032,1.032,0,0,1,.29,1.7,1.033,1.033,0,0,1,0,.994,1,1,0,0,1,.08.614,1.155,1.155,0,0,1,.29.284,1.032,1.032,0,0,1,.62.074a1.017,1.017,0,0,1,1.09.21A1.052,1.052,0,0,1,2,.994a1.5,1.5,0,0,1-.02.2.636.636,0,0,1-.06.18.757.757,0,0,1-.09.18,1.576,1.576,0,0,1-.12.15A1.052,1.052,0,0,1,1,1.994Z'
            transform='translate(567 200.506)'
            fill={theme.palette[isActive ? 'primary' : 'secondary'].main}
          />
          <path
            id='Vector-5'
            data-name='Vector'
            d='M1,2a1,1,0,0,1-.38-.08.933.933,0,0,1-.33-.21.933.933,0,0,1-.21-.33A1,1,0,0,1,0,1,1,1,0,0,1,.08.619.933.933,0,0,1,.29.289.933.933,0,0,1,.62.079a.956.956,0,0,1,.76,0,.933.933,0,0,1,.33.21.933.933,0,0,1,.21.33A1,1,0,0,1,2,1a1,1,0,0,1-.08.38.9.9,0,0,1-.54.54A1,1,0,0,1,1,2Z'
            transform='translate(563.5 204.001)'
            fill={theme.palette[isActive ? 'primary' : 'secondary'].main}
          />
          <path
            id='Vector-6'
            data-name='Vector'
            d='M17.75,1.5H.75A.755.755,0,0,1,0,.75.755.755,0,0,1,.75,0h17a.755.755,0,0,1,.75.75A.755.755,0,0,1,17.75,1.5Z'
            transform='translate(558.75 196.34)'
            fill={theme.palette[isActive ? 'primary' : 'secondary'].main}
          />
          <path
            id='Vector-7'
            data-name='Vector'
            d='M4.75,9.5A4.641,4.641,0,0,1,1.62,8.31,4.307,4.307,0,0,1,.68,7.19,4.7,4.7,0,0,1,0,4.75a4.75,4.75,0,0,1,9.5,0A4.672,4.672,0,0,1,8.81,7.2,4.734,4.734,0,0,1,4.75,9.5Zm0-8A3.256,3.256,0,0,0,1.5,4.75a3.169,3.169,0,0,0,.47,1.67,2.938,2.938,0,0,0,.63.76A3.173,3.173,0,0,0,4.75,8,3.255,3.255,0,0,0,8,4.75,3.322,3.322,0,0,0,7.19,2.6,3.263,3.263,0,0,0,4.75,1.5Z'
            transform='translate(569.25 202.25)'
            fill={theme.palette[isActive ? 'primary' : 'secondary'].main}
          />
          <path
            id='Vector-8'
            data-name='Vector'
            d='M1.737,3.468a.742.742,0,0,1-.53-.22l-.99-.99A.75.75,0,0,1,1.277,1.2l.48.48L3.357.2a.75.75,0,0,1,1.02,1.1l-2.13,1.97A.782.782,0,0,1,1.737,3.468Z'
            transform='translate(571.692 205.272)'
            fill={theme.palette[isActive ? 'primary' : 'secondary'].main}
          />
          <path
            id='Vector-9'
            data-name='Vector'
            d='M13.12,20H5.75C2.1,20,0,17.9,0,14.25V5.75C0,2.1,2.1,0,5.75,0h8C17.4,0,19.5,2.1,19.5,5.75v7.86a.753.753,0,0,1-1.32.49,3.252,3.252,0,0,0-5.69,2.15,3.169,3.169,0,0,0,.47,1.67,2.938,2.938,0,0,0,.63.76.744.744,0,0,1,.22.83A.715.715,0,0,1,13.12,20ZM5.75,1.5C2.89,1.5,1.5,2.89,1.5,5.75v8.5c0,2.86,1.39,4.25,4.25,4.25h5.82A4.7,4.7,0,0,1,11,16.25a4.745,4.745,0,0,1,7-4.18V5.75c0-2.86-1.39-4.25-4.25-4.25Z'
            transform='translate(558.25 190.75)'
            fill={theme.palette[isActive ? 'primary' : 'secondary'].main}
          />
          <path
            id='Vector-10'
            data-name='Vector'
            d='M0,0H24V24H0Z'
            transform='translate(556 188)'
            fill='none'
            opacity='0'
          />
        </g>
      </g>
    </svg>
  );
};
