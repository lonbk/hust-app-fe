import { styled as muiStyled } from '@mui/material';
import { Grid, TextField, IconButton } from '@mui/material';

export const StyledTextField = muiStyled(TextField)(({ theme }) => ({
    width: '100%', 
    borderWidth: 0, 
    borderColor: 'transparent'
}))

export const SendButton = muiStyled(IconButton)(({ theme }) => ({
    backgroundColor: '#3f51b5',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: 'rgb(75, 65, 147)'
    }
}))

export const Inbox = muiStyled('div')(({ theme }) => ({
    width: '100%',
    height: '100%',
    [theme.breakpoints.up('xl')]: {
        maxHeight: 'calc(85vh - 300px)'
    },
    [theme.breakpoints.down('xl')]: {
        maxHeight: 'calc(85vh - 260px)'
    },
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '8px',
    overflowY: 'auto', 
}))
