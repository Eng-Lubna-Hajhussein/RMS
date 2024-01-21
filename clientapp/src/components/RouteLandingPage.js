import { useContext } from "react";
import Website from "./shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { useParams } from "react-router-dom";
import { objRoleID } from "appHelper/appVariables";
import { updateSystem } from "appHelper/fetchapi/tblSystem/tblSystem";

function RouteLandingPage() {
  const { appState, appDispatch } = useContext(AppContext);
  const {systemID} = useParams();
  const isEditable = appState.clientInfo.blnUserLogin&&objRoleID['Admin']===(appState.userInfo.bigUserRoleID)&&appState.systemInfo.bigSystemID===Number(systemID)
  useLanguage();

  const onSaveUpperHeader = async(contacts) => {
    appState.systemInfo.jsnSystemContact = contacts;
    appDispatch({ ...appState });
  };
  const onSaveHero = async(slides)=>{
    appState.systemInfo.jsnSystemSections.lstHeroSlides = slides;
    appDispatch({ ...appState });
  }

  return (
    <Website
      systemInfo={appState.systemInfo}
      categories={appState.categories}
      editable={isEditable}
      onSaveUpperHeader={onSaveUpperHeader}
      onSaveHero={onSaveHero}
      lang={appState.clientInfo.strLanguage}
      dir={appState.clientInfo.strDir}
    />
  );
}

export default RouteLandingPage;
