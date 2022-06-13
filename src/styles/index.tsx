import React from 'react';
import { styled as muiStyled } from '@mui/material';
import { InputBase } from '@mui/material';
import { ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Grid, 
  Button, 
  Paper,
} from '@mui/material'; 

interface FlexBoxProps {
  column?: boolean;
  justify: 'flex-start' | 'flex-end' | 'center' |'space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
  align: 'flex-start' | 'flex-end' | 'center' |'space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
  maxHeight?: boolean;
}

interface StyledButtonProps extends ButtonProps {
  width: string; 
  height: string; 
  borderRadius: string;
  component?: React.ElementType;
  defaultActiveStyle?: boolean;
  to?: string;
}

export const MainGrid = muiStyled(Grid)`
  height: 100vh;
`;

export const PaperDiv = muiStyled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StyledLink = muiStyled(Link)`
  text-decoration: none;
  color: #000000;
`

export const FlexBox = muiStyled('div')<FlexBoxProps>`
  display: flex;
  width: 100%;
  height: ${props => props.maxHeight ? '100%' : 'auto'};
  flex-direction: ${props => props.column ? 'column' : 'row'};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
`

export const MainLogo = muiStyled('img')`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 20px;
`

export const StyledButton = muiStyled(Button)<StyledButtonProps>(({ theme, width, height, borderRadius }) => ({
  width: width,
  height: height,
  borderRadius: borderRadius
}))

export const StyledPaper = muiStyled(Paper)<{borderRadius: string}>(({ theme, borderRadius }) => ({
  borderRadius: borderRadius,
  backgroundColor: theme.palette.background.default,
  boxShadow: '0px 8px 32px #8F95B226',
  height: '100%',
}))

export const StyledInput = muiStyled(InputBase)(({ theme }) => ({
  borderRadius: '8px',
  fontSize: '0.875rem',
  border: '1px solid #E6E8F0',
  width: '260px',
  height: '38px',
  padding: '11px 16px',
  marginLeft: '30px',
  '&:focus-within,:hover': {
      border: `1px solid ${theme.palette.primary.main}`
  },
  '&::placeholder': {
      color: '#D8DAE5',
  }
}))

export const StyledText = muiStyled('div')(({ theme }) => ({
  fontFamily: "'Nunito', sans-serif"
}))