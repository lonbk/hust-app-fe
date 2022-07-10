/* Libs */
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
/* Components */
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";
import App from "./App";
import { store } from "./app/store";
/* Styles */
import { theme } from "./theme";

/* ? */
import reportWebVitals from "./reportWebVitals";
console.log(theme)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Auth0ProviderWithNavigate>
            <CssBaseline>
              <App />
            </CssBaseline>
          </Auth0ProviderWithNavigate>
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
