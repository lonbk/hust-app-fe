import { styled as muiStyled } from '@mui/material';

export const PageContainer = muiStyled('div')(({ theme }) => ({
    padding: '20px 10px',
    width: '100%', 
    height: '100%'
}))

export const StyledText = muiStyled('div')(({ theme }) => ({
    fontSize: '0.875rem',
    fontWeight: '700',
    fontFamily: '"Nunito", sans-serif',
    color: theme.palette.text.primary,
}))