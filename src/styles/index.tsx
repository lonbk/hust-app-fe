
import styled from 'styled-components';
import { styled as muiStyled } from '@mui/material';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material'; 

interface FlexBoxProps {
  column: boolean;
  justify: 'flex-start' | 'flex-end' | 'center' |' space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
  align: 'flex-start' | 'flex-end' | 'center' |' space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
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

export const StyledButton = muiStyled(Button)<{width: string; height: string; borderRadius: string}>(({ theme, width, height, borderRadius }) => ({
  width: width,
  height: height,
  borderRadius: borderRadius
}))