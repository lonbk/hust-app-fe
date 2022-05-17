import React from 'react';
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';
import { ButtonProps } from '@mui/material';
import { Link } from 'react-router-dom';
import { 
  Grid, 
  Button, 
  Paper,
} from '@mui/material'; 

interface FlexBoxProps {
  column: boolean;
  justify: 'flex-start' | 'flex-end' | 'center' |'space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
  align: 'flex-start' | 'flex-end' | 'center' |'space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
}

interface StyledButtonProps extends ButtonProps {
  width: string; 
  height: string; 
  borderRadius: string;
  component?: React.ElementType;
  defaultActiveStyle?: boolean;
  to?: string;
}

export const MainGrid = styled(Grid)`
  height: 100vh;
`;

export const PaperDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`

export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
`

export const MainLogo = styled('img')`
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
  height: '100%'
}))
