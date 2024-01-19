import React from "react";
import Router from "Router";
import 'index.css'
import AppContextProvider from "contextapi/context/AppContext";
// document.documentElement.dir = 'ltr'

function App() {
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  );
}

export default App;
