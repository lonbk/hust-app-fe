import { styled as muiStyled } from '@mui/material';

export const RangeSelectionWrapper = muiStyled('div')(({ theme }) => ({
    position: 'absolute', 
    right: '50%', 
    zIndex: 5000,
    top: '20px',
    transform: 'translate(50%, 0)'
}))