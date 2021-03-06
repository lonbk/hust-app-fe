/* Libs */
import React from "react";
import { Grid, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from '@auth0/auth0-react'
/* Components */
/* Hooks */
/* Types */
/* Styles */
import { MainGrid } from "../../styles";
/* Styled components */
const loginImg = process.env.PUBLIC_URL + "/login.png";
const logo = process.env.PUBLIC_URL + "/logo.png";

const GridImage = styled(Grid)`
  background-image: url(${loginImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const PaperDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const MainLogo = styled.img`
  margin: 0px auto;
`;

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth0();

  return (
    <MainGrid container>
      <Grid item xs={false} sm={false} md={5}>
        <PaperDiv>
          <MainLogo className="app-logo" src={logo}></MainLogo>
          <p>Không tồn tại</p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Quay lại
          </Button>
        </PaperDiv>
      </Grid>
      <GridImage className="app-img" item xs={false} sm={false} md={7} />
    </MainGrid>
  );
};

export default NotFound;