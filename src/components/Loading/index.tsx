/* Libs */
import React from "react";
import { styled as muiStyled, CircularProgress } from "@mui/material";
import styled  from 'styled-components';
/* Styles */
/* Styled components */
const CircularProgress_styled = muiStyled(CircularProgress)`
  margin-right: 30px;
`;
const DivLoadding = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading: React.FC = () => {
  return (
    <DivLoadding>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <CircularProgress_styled />
      <p>Loading</p>
    </DivLoadding>
  );
};

export default Loading;
