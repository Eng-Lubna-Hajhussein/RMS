import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import React, { useContext } from "react";
import { lstWebsiteNav } from "appHelper/appVariables";
import { AppContext } from "contextapi/context/AppContext";
const strServerAssetsPath = "http://localhost:4000/assets/";

function Login() {
  const { appState, appDispatch } = useContext(AppContext);

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={lstWebsiteNav}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
      />
    </React.Fragment>
  );
}

export default Login;
