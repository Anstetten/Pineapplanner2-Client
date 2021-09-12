import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./components/Auth/UserProvider";
import App from "./App";
import {ThemeProvider} from "@material-ui/core/styles";
import "./styles/reset.css";
import "./styles/global.css";
import theme from "./styles/theme"

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
