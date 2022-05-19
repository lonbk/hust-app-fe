/* Libs */
import React from "react";
import { styled as muiStyled, CircularProgress } from "@mui/material";
import styled  from 'styled-components';

export const CircularProgress_styled = muiStyled(CircularProgress)`
  margin-right: 30px;
`;
export const DivLoadding = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`;