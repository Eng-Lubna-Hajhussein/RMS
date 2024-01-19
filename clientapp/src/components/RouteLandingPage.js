import { useContext } from "react";
import Website from "./shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";

function RouteLandingPage() {
  const { appState, appDispatch } = useContext(AppContext);
  useLanguage();

  const onSaveUpperHeader = (contacts) => {
    appState.jsnSystemContact = contacts;
    appDispatch({ ...appState });
  };

  return (
    <Website
      systemInfo={appState.systemInfo}
      categories={appState.categories}
      editable={false}
      onSaveUpperHeader={onSaveUpperHeader}
      lang={appState.clientInfo.strLanguage}
      dir={appState.clientInfo.strDir}
    />
  );
}

export default RouteLandingPage;
