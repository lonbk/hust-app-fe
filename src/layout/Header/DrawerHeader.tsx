/* Styles */
import { styled } from "@mui/material/styles";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  height: '97px',
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

