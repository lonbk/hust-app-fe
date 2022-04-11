/* Libs */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
/* Components */

/* Styles */

/* Configs */

type Props = {
  children: React.ReactNode;
}

const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const defaultValue = "http://localhost:3000"

    const domain = process.env.REACT_APP_AUTH0_DOMAIN || defaultValue;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || defaultValue;
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE || defaultValue;
    const scope = process.env.REACT_APP_AUTH0_SCOPE || defaultValue;
  
    const navigate = useNavigate();
  
    const onRedirectCallback = (appState: any) => {
      navigate(appState?.returnTo || window.location.pathname);
    };
  
    return (
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        audience={audience}
        scope={scope}
        redirectUri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        {children}
      </Auth0Provider>
    );
  };
  
  export default Auth0ProviderWithNavigate;