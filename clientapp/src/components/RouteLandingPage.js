import { useContext, useEffect, useMemo, useState } from "react";
import Website from "./shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { useParams } from "react-router-dom";
import {
  Demo_categories,
  Demo_jsnSystemInfo,
  objRoleID,
} from "appHelper/appVariables";
import {
  findSystem,
  updateSystem,
} from "appHelper/fetchapi/tblSystem/tblSystem";
import { findCategories } from "appHelper/fetchapi/tblCategory/tblCategory";

function RouteLandingPage({ isDemo }) {
  const { appState, appDispatch } = useContext(AppContext);

  const { systemID } = useParams();
  const [categories, setCategories] = useState(
    JSON.parse(JSON.stringify(appState.categories))
  );
  const [systemInfo, setSystemInfo] = useState(
    JSON.parse(JSON.stringify(appState.systemInfo))
  );
  const isEditable =
    appState.clientInfo.blnUserLogin &&
    objRoleID["Admin"] === appState.userInfo.bigUserRoleID &&
    appState.systemInfo.bigSystemID === Number(systemID);
  useLanguage();

  const instalData = async () => {
    const systemData = await findSystem(systemID);
    const categoriesData = await findCategories(systemID);
    appState.categories = [...categoriesData];
    appState.systemInfo.bigSystemID = systemData.bigSystemID;
    appState.systemInfo.jsnSystemContact = JSON.parse(
      systemData?.jsnSystemContact || {}
    );
    appState.systemInfo.lstSystemReviews = JSON.parse(
      systemData?.lstSystemReviews || []
    );
    appState.systemInfo.lstSystemTeam = JSON.parse(
      systemData?.lstSystemTeam || []
    );
    appState.systemInfo.jsnSystemSections = JSON.parse(
      systemData?.jsnSystemSections || {}
    );
    appState.systemInfo.bigWSCategoryID = systemData?.bigWSCategoryID;
    appState.systemInfo.jsnSystemLocation = JSON.parse(
      systemData?.jsnSystemLocation || {}
    );
    appState.systemInfo.lstContactUs = JSON.parse(
      systemData?.lstContactUs || []
    );
    appState.systemInfo.strLogoPath = systemData?.strLogoPath;
    appDispatch({ ...appState });
  };
  useEffect(() => {
    if (systemID) {
      instalData();
    }
  }, []);

  const onSaveUpperHeader = async (contacts) => {
    setSystemInfo({ ...systemInfo, jsnSystemContact: contacts });
  };

  const onSaveHero = async (heroSectionUpdated) => {
    systemInfo.jsnSystemSections.lstHeroSlides = heroSectionUpdated;
    setSystemInfo({ ...systemInfo });
  };

  const onSaveOwner = async (ownerSectionUpdated) => {
    systemInfo.jsnSystemSections.jsnOwnerSection = ownerSectionUpdated;
    setSystemInfo({ ...systemInfo });
  };

  const onSaveReservation = async (resSectionUpdated) => {
    systemInfo.jsnSystemSections.jsnReservation = resSectionUpdated;
    setSystemInfo({ ...systemInfo });
  };

  const onSaveAbout = async (aboutSectionUpdated) => {
    systemInfo.jsnSystemSections.jsnAboutSection = aboutSectionUpdated;
    setSystemInfo({ ...systemInfo });
  };

  const adminNavList = [
    { bigNavID: 1234146400, nav: { eng: "upload logo", arb: "صورة اللوغو" } },
    { bigNavID: 4324146478, nav: { eng: "orders", arb: "الطلبات" } },
    { bigNavID: 5674146478, nav: { eng: "reservations", arb: "الحجوزات" } },
    { bigNavID: 9864146478, nav: { eng: "messages", arb: "الرسائل" } },
    { bigNavID: 7764142478, nav: { eng: "location", arb: "الموقع" } },

  ];
  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ]

  const onLogout = async()=>{

  }

  useEffect(() => {
    console.log({ systemInfo });
  }, [systemInfo]);

  return (
    <Website
      isDemo={isDemo}
      systemInfo={
        isDemo ? Demo_jsnSystemInfo : JSON.parse(JSON.stringify(systemInfo))
      }
      categories={
        isDemo ? Demo_categories : JSON.parse(JSON.stringify(categories))
      }
      editable={isEditable}
      onSaveUpperHeader={onSaveUpperHeader}
      onSaveHero={onSaveHero}
      onSaveOwner={onSaveOwner}
      onSaveReservation={onSaveReservation}
      onSaveAbout={onSaveAbout}
      adminNavList={adminNavList}
      lang={appState.clientInfo.strLanguage}
      userImg= {appState?.userInfo?.strImgPath}
      userName={JSON.parse(JSON.stringify(appState?.userInfo?.jsnFullName))}
      blnUserLogin={appState?.clientInfo?.blnUserLogin}
      userNavList={userNavList}
      dir={appState.clientInfo.strDir}
    />
  );
}

export default RouteLandingPage;
