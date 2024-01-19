import { useContext, useEffect } from "react";
import { AppContext } from "contextapi/context/AppContext";

function useLanguage() {
  const { appState, appDispatch } = useContext(AppContext);
  useEffect(() => {
    document.documentElement.dir = appState.clientInfo.strDir;
  }, [appState.clientInfo.strLanguage]);

  const onLangChange = () => {
    const lang = appState.clientInfo.strLanguage === "eng" ? "arb" : "eng";
    const dir = lang === "arb" ? "rtl" : "ltr";
    appState.clientInfo.strLanguage = lang;
    appState.clientInfo.strDir = dir;
    appDispatch({ ...appState });
  };

  return { onLangChange };
}

export default useLanguage;
