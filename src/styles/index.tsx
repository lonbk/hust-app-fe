
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material'; 


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