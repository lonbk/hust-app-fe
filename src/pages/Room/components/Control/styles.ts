import { styled as muiStyled } from '@mui/material';

export const ControlWrapper = muiStyled('div')(({ theme }) => ({
    width: '100px',
    position: 'absolute',
    zIndex: '2500',
    bottom: '15px',
    left: '50%',
    transform: 'translate(-50%, 0)',
}))