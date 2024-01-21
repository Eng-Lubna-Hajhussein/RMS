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
    bigSystemID: Demo_System_ID,
    jsnSystemContact: Demo_jsnSystemInfo.jsnSystemContact,
    lstSystemReviews: Demo_jsnSystemInfo.lstSystemReviews,
    lstSystemTeam: Demo_jsnSystemInfo.lstSystemTeam,
    jsnSystemSections: Demo_jsnSystemInfo.jsnSystemSections,
    bigWSCategoryID: Demo_jsnSystemInfo.bigWSCategoryID,
    jsnSystemLocation: Demo_jsnSystemInfo.jsnSystemLocation,
    lstContactUs: Demo_jsnSystemInfo.lstContactUs,
    strLogoPath:Demo_jsnSystemInfo.strLogoPath
  },
  userInfo: {
    bigUserID: "",
    strUserImage: "",
    jsnFullName: "",
    strEmail: "",
  },
  categories: [...Demo_categories],
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
