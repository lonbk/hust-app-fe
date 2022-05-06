/* Libs */
import React from "react";
import { Box, styled } from "@mui/material";
/* Components */
import { DrawerHeader } from "../Header/DrawerHeader";
/* Hooks */
/* Styles */
import { ContentContainer } from '../../styles'
/* Configs */
/* Types */
type Props = {
  children: React.ReactNode;
};

const MainBox = styled(Box)`
  min-height: calc(100vh - 97px);
`

const Content = ({ children }: Props) => {

  return (
      <MainBox component="main" sx={{ flexGrow: 1, p: 0 }}>
        <DrawerHeader />
        <ContentContainer>
          {children}
        </ContentContainer>
      </MainBox>
  );
};

export default Content;
