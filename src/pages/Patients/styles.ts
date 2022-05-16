import { styled as muiStyled } from '@mui/material';
import { InputBase } from '@mui/material';

export const PageContainer = muiStyled('div')(({ theme }) => ({
    padding: '20px 10px',
    width: '100%', 
    height: '100%'
}))


export const StyledInput = muiStyled(InputBase)(({ theme }) => ({
    borderRadius: '8px',
    fontSize: '0.875rem',
    border: '1px solid #E6E8F0',
    height: '38px',
    padding: '11px 16px',
    '&:focus-within,:hover': {
        border: `1px solid ${theme.palette.primary.main}`
    },
    '&::placeholder': {
        color: '#D8DAE5',
    }
}))

export const StyledText = muiStyled('div')(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: '700',
    fontFamily: '"Nunito", sans-serif',
    color: theme.palette.text.primary,
}))