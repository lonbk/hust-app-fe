/* Libs */
import React from 'react';
import { Paper, styled as muiStyled } from '@mui/material';

const Item = muiStyled(Paper)(({ theme }) => ({
    borderRadius: '24px',
    boxShadow: '0px 8px 32px #8F95B226',
    opacity: '1',
    background: '#FFFFFF 0% 0% no-repeat padding-box'
}))

export default Item;