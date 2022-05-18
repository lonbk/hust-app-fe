import { styled as muiStyled } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledLink = muiStyled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.text.primary
}))