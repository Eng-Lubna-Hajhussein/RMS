import React from "react";
import Router from "Router";
import "index.css";
import AppContextProvider from "contextapi/context/AppContext";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffd40d",
    },
    primary:{
      main:"#f3274c"
    },
  },
});

function App() {
  return (
    <AppContextProvider>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </AppContextProvider>
  );
}

export default App;
