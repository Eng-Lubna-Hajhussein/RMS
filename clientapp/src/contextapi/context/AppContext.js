import React, { createContext, useEffect, useReducer } from "react";
import { AppReducer } from "contextapi/reducer/AppReducer";
import {
  Demo_System_ID,
  Demo_jsnSystemInfo,
  Demo_categories,
} from "appHelper/appVariables";

export const AppContext = createContext({ appState: {}, appDispatch: {} });

const initialAppState = {
  clientInfo: {
    blnUserLogin: false,
    strLanguage: "eng", // arb,
    strDir: "ltr", //rtl
  },
  systemInfo: {
    bigSystemID: null,
    jsnSystemContact: {},
    lstSystemReviews: [],
    lstSystemTeam:[],
    jsnSystemSections:[],
    bigWSCategoryID: null,
    jsnSystemLocation: {},
    lstContactUs: [],
    strLogoPath:null,
    systemMenu: [],
    systemRegion:[]
  },
  userInfo: {
    bigUserID: "",
    strUserImage: "",
    jsnFullName: "",
    strEmail: "",
  },
};

const AppContextProvider = (props) => {
  const localStorageAppState = JSON.parse(localStorage.getItem("appState"));
  const [appState, appDispatch] = useReducer(AppReducer,{
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
