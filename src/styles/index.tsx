
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material'; 

interface FlexBoxProps {
  column: boolean;
  justify: 'flex-start' | 'flex-end' | 'center' |' space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
  align: 'flex-start' | 'flex-end' | 'center' |' space-between' | 'space-around' | 'space-evenly' | 'initial' | 'inherit';
}

export const MainGrid = styled(Grid)`
  height: 100vh;
`;

export const MainLogo = styled.img`
  margin: 0px auto;
`;

export const PaperDiv = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: #f2f3f4;
    padding: 20px;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
`

export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
`