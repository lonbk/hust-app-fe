/* Libs */
import React from "react";
import { styled as muiStyled, CircularProgress } from "@mui/material";
import styled from "styled-components";
/* Types */
type Props = {
  status: "idle" | "pending" | "success" | "failed";
  onIdle: string;
  onError: any;
};
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

const LoadingWithChild: React.FC<Props> = ({ status, onIdle, onError, children }) => {
  const loadingIcon = (
    <DivLoadding>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <CircularProgress_styled />
      <p>Loading</p>
    </DivLoadding>
  );

  switch (status) {
    case "idle":
        return <p>{onIdle}</p>
    case "pending":
        return loadingIcon;
    case "success":
        return <>{children}</>
    case "failed":
        return <p>{onError}</p>
    default: 
      return loadingIcon;
  }
};

export default LoadingWithChild;
