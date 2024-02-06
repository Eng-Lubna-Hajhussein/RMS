import React, { useContext, useEffect, useRef, useState } from "react";
import Website from "./shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import {  useParams } from "react-router-dom";
import {
  Demo_jsnSystemInfo,
  lstWebsiteNav,
  objCategoriesType,
  objRoleID,
} from "appHelper/appVariables";
import {
  findSystem,
  updateSystem,
} from "appHelper/fetchapi/tblSystem/tblSystem";
import {
  bulkCategories,
  findCategories,
} from "appHelper/fetchapi/tblCategory/tblCategory";
import { Typography } from "@mui/material";

function RouteLandingPage({ isDemo }) {
  const { appState, appDispatch } = useContext(AppContext);

  const { systemID } = useParams();
  const [systemInfo, setSystemInfo] = useState(
    null
  );

  const firstRender = useRef(true);

  const loggedIn = appState?.clientInfo?.loggedIn;
  const [isLoading, setIsLoading] = useState(false);
  useLanguage();
  const instalData = async () => {
    const system = await findSystem(systemID);
    const categoriesData = await findCategories(systemID);
    const systemData = {};
    if (Array.isArray(categoriesData)) {
      const systemMenu = [];
      const systemRegion = [];
      categoriesData.forEach((category) => {
        if (category.bigCategoryTypeID === objCategoriesType["Menu"]) {
          systemMenu.push({
            ...category,
            jsnName: JSON.parse(category?.jsnName || {}),
            jsnCategoryInfo: JSON.parse(category?.jsnCategoryInfo),
          });
          if (category.bigCategoryTypeID === objCategoriesType.Region) {
            systemRegion.push({
              ...category,
              jsnName: JSON.parse(category?.jsnName || {}),
              jsnCategoryInfo: JSON.parse(category?.jsnCategoryInfo),
            });
          }
        }
      });
      systemData.systemMenu = systemMenu;
      systemData.systemRegion = systemRegion;
    }
    systemData.bigSystemID = system.bigSystemID;
    systemData.jsnSystemContact = JSON.parse(
      system?.jsnSystemContact
    );
    systemData.lstSystemReviews = JSON.parse(
      system?.lstSystemReviews
    );
    systemData.lstSystemTeam = JSON.parse(system?.lstSystemTeam);
    systemData.jsnSystemSections = JSON.parse(
      system?.jsnSystemSections
    );
    systemData.bigWSCategoryID = system?.bigWSCategoryID;
    systemData.jsnSystemLocation = JSON.parse(
      system?.jsnSystemLocation
    );
    systemData.lstContactUs = JSON.parse(system?.lstContactUs);
    systemData.strLogoPath = system?.strLogoPath;
    systemData.strSystemPathURL = system?.strSystemPathURL;
    appState.systemInfo = {...appState.systemInfo,...systemData};
    setSystemInfo({...appState.systemInfo,...systemData});
    appDispatch({ ...appState });
  };

  useEffect(() => {
    const funInstallData = async () => {
      setIsLoading(true);
      await instalData();
      setIsLoading(false);
    };
    if (systemID) {     
      funInstallData();
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  useEffect(() => {
    setSystemInfo(JSON.parse(JSON.stringify(appState.systemInfo)));
  }, [appState,appState.systemInfo]);

  const adminNavList = [
    { bigNavID: 1234146400, nav: { eng: "upload logo", arb: "صورة اللوغو" } },
    { bigNavID: 3234146150, nav: { eng: "dashboard", arb: "داشبورد" } },
    { bigNavID: 4324146478, nav: { eng: "orders", arb: "الطلبات" } },
    { bigNavID: 5674146478, nav: { eng: "reservations", arb: "الحجوزات" } },
    { bigNavID: 9864146478, nav: { eng: "messages", arb: "الرسائل" } },
    { bigNavID: 7764142478, nav: { eng: "settings", arb: "الاعدادات" } },
  ];

  const onLogout = () => {
    console.log("logout");
  };
  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    {
      bigNavID: 1166046478,
      nav: { eng: "logout", arb: "تسجيل الخروج" },
      onClick: onLogout,
    },
  ];

  return (
    <React.Fragment>
      {isLoading && <Typography>loading</Typography>}
      {!isLoading &&(systemInfo)&& (
        <Website
          systemInfo={
            isDemo ? Demo_jsnSystemInfo : JSON.parse(JSON.stringify(systemInfo))
          }
          editable={false}
          adminEditMode={false}
          customerEditMode={false}
          navList={lstWebsiteNav}
          systemID={systemID}
          systemPath={systemInfo?.strSystemPathURL}
          ws={systemInfo?.bigWSCategoryID}
          adminNavList={adminNavList}
          lang={appState.clientInfo.strLanguage}
          userImg={appState?.userInfo?.strImgPath}
          userName={JSON.parse(JSON.stringify(appState?.userInfo?.jsnFullName))}
          blnUserLogin={appState?.clientInfo?.blnUserLogin}
          userNavList={userNavList}
          dir={appState.clientInfo.strDir}
        />
      )}
    </React.Fragment>
  );
}

export default RouteLandingPage;
