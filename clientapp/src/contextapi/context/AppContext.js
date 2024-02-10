import React, { createContext, useEffect, useReducer } from "react";
import { AppReducer } from "contextapi/reducer/AppReducer";
import {initialAppState} from 'appHelper/appVariables';
export const AppContext = createContext({ appState: {}, appDispatch: {} });

const AppContextProvider = (props) => {
  const localStorageAppState = JSON.parse(localStorage.getItem("appState"));
  const [appState, appDispatch] = useReducer(AppReducer, {
    ...initialAppState,
    ...localStorageAppState,
  });
  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(appState));
  }, [appState]);
  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
