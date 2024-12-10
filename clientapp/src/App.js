import React from "react";
import Router from "Router";
import "index.css";
import AppContextProvider from "contextapi/context/AppContext";
import { ThemeProvider, createTheme } from "@basetoolkit/ui";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#ffd40d",
    },
    primary:{
      main:"#f3274c"
    },
    error:{
      main:"red"
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
