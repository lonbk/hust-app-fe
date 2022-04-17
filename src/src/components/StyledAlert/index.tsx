/* Libs */
import React, { useState, useEffect } from "react";
import { Stack, Alert } from "@mui/material";
/* Redux */
import { StatusType } from '../../features/global';
/* Type */
type Props = {
  status: StatusType;
};

const StyledAlert: React.FC<Props> = ({ status, children }) => {
  const [visisble, setVisible] = useState<boolean>(false);

  const checkStatus = () => {
    switch (status) {
      case StatusType.STATUS_IDLE:
        return;
      case StatusType.STATUS_PENDING:
        return "warning";
      case StatusType.STATUS_SUCCESS:
        return "success";
      case StatusType.STATUS_FAILED:
        return "error";
      default:
        return;
    }
  };

  /* Effects */
  useEffect(() => {
    if(status === StatusType.STATUS_PENDING) {
      setVisible(true)
    }
    else if(status === StatusType.STATUS_SUCCESS || StatusType.STATUS_FAILED) {
      setTimeout(() => {
        setVisible(false);
      }, 2000)
    }
  }, [status])

  return (
    <>
      {visisble && <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity={checkStatus()}>{children}</Alert>
      </Stack>}
    </>
  );
};

export default StyledAlert;
