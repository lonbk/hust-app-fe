/* Libs */
import React, { useState, useEffect } from "react";
/* Redux */
import { StatusType } from '../../features/global';
/* Styled */
import { CircularProgress_styled, DivLoadding } from "./styles";
/* Types */
type Props = {
  status: StatusType;
  onError: any;
  autoDisappear: boolean;
  fullScreen: boolean;
};

const LoadingWithChild: React.FC<Props> = ({ status, onError, autoDisappear, children, fullScreen }) => {
  const [visisble, setVisible] = useState<boolean>(false);

  const loadingIcon = (
    <DivLoadding fullScreen={fullScreen}>
      {/* eslint-disable-next-line react/jsx-pascal-case */}
      <CircularProgress_styled size={fullScreen ? 50 : 20} />
    </DivLoadding>
  );

  useEffect(() => {
    if(status === StatusType.STATUS_PENDING) {
      setVisible(true);
    } 
    else if((status === StatusType.STATUS_SUCCESS || StatusType.STATUS_FAILED) && autoDisappear) {
        setTimeout(() => {
        setVisible(false);
      }, 3000)
    }
  }, [status])
  
  if(status === StatusType.STATUS_PENDING) {
    return loadingIcon;
  }

  return (
    <>
      {visisble && (
        status === StatusType.STATUS_SUCCESS ? children : onError
      )}
    </>
  )
};

export default LoadingWithChild;
