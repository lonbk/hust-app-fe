import styled from 'styled-components';
import { styled as muiStyled, CircularProgress } from "@mui/material";

interface DivLoadingProps {
  fullScreen: boolean;
}

export const CircularProgress_styled = muiStyled(CircularProgress)`
  margin-right: 30px;
`;
export const DivLoadding = styled.div<DivLoadingProps>`
  width: 100%;
  height: ${props => props.fullScreen ? '500px' : '100%'};
  display: flex;
  justify-content: ${props => props.fullScreen ? 'center' : 'flext-start'};
  align-items: center;
  margin-left: 10px;
`;