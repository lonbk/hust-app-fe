/* Libs */
import React from "react";
/* Styles */
import { DivLoadding, CircularProgress_styled } from './styles';

interface Props {
    message?: string;
}

const Loading: React.FC<Props> = ({ message }) => {
  return (
    <DivLoadding>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <CircularProgress_styled />
      <p>{message ? message : 'Loading'}</p>
    </DivLoadding>
  );
};

export default Loading;
