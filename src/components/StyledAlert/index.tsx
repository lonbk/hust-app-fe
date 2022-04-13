/* Libs */
import React from "react";
import { Stack, Alert } from "@mui/material";
/* Type */
type Props = {
  status: "idle" | "pending" | "success" | "failed";
};

const StyledAlert: React.FC<Props> = ({ status, children }) => {
  const checkStatus = () => {
    switch (status) {
      case "idle":
        return;
      case "pending":
        return "warning";
      case "success":
        return "success";
      case "failed":
        return "error";
      default:
        return;
    }
  };

  if (status === "idle") return null;

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={checkStatus()}>{children}</Alert>
    </Stack>
  );
};

export default StyledAlert;
