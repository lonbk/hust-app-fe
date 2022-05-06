/* Libs */
import React, { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth0 } from "@auth0/auth0-react";
/* Components */
/* Hooks */
/* Styles */
import { MainGrid, MainLogo } from '../../styles';
/* Types */
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

const Login: React.FC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) {
      navigate('/verify')
    };
  }, [isAuthenticated])

  return (
    <MainGrid container>
      <Grid item xs={6} sm={6} md={5}>
        <PaperDiv>
        <MainLogo className="app-logo" src={logo} />
          <Button variant="contained" color="primary" onClick={loginWithRedirect}>
            Log in with Auth0
          </Button>
        </PaperDiv>
      </Grid>
      <GridImage className="app-img" item xs={6} sm={6} md={7} />
    </MainGrid>
  );
};

export default Login;
