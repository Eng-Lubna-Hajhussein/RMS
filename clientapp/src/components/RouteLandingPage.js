import React, { useContext, useEffect, useRef, useState } from "react";
import Website from "./shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { useNavigate, useParams } from "react-router-dom";
import {
  Demo_jsnSystemInfo,
  lstWebsiteNav,
  objCategoriesType,
  objRoleID,
} from "appHelper/appVariables";
import {
  findSystem,
} from "appHelper/fetchapi/tblSystem/tblSystem";
import {
  findCategories,
} from "appHelper/fetchapi/tblCategory/tblCategory";
import { Typography } from "@mui/material";

function RouteLandingPage({ isDemo }) {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID } = useParams();
  const navigate = useNavigate();
  const [systemInfo, setSystemInfo] = useState(null);
  const firstRender = useRef(true);
  useEffect(() => {
    const loggedIn = appState?.clientInfo?.blnUserLogin;
    if (loggedIn) {
      const isAdmin = appState?.userInfo?.bigUserRoleID === objRoleID.Admin;
      const isCustomer =
        appState?.userInfo?.bigUserRoleID === objRoleID.Customer;
      const strSystemPathURL = appState?.systemInfo?.strSystemPathURL;
      if (isAdmin) {
        navigate(`/admin/${strSystemPathURL}`);
      }
      if (isCustomer) {
        navigate(`/customer/${strSystemPathURL}`);
      }
    }
  }, []);
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
    systemData.jsnSystemContact = JSON.parse(system?.jsnSystemContact);
    systemData.lstSystemReviews = JSON.parse(system?.lstSystemReviews);
    systemData.lstSystemTeam = JSON.parse(system?.lstSystemTeam);
    systemData.jsnSystemSections = JSON.parse(system?.jsnSystemSections);
    systemData.bigWSCategoryID = system?.bigWSCategoryID;
    systemData.jsnSystemLocation = JSON.parse(system?.jsnSystemLocation);
    systemData.lstContactUs = JSON.parse(system?.lstContactUs);
    systemData.strLogoPath = system?.strLogoPath;
    systemData.strSystemPathURL = system?.strSystemPathURL;
    appState.systemInfo = { ...appState.systemInfo, ...systemData };
    setSystemInfo({ ...appState.systemInfo, ...systemData });
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
  }, [appState, appState.systemInfo]);

  return (
    <React.Fragment>
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && systemInfo && (
        <Website
          systemInfo={
            isDemo ? Demo_jsnSystemInfo : JSON.parse(JSON.stringify(systemInfo))
          }
          editable={false}
          adminEditMode={false}
          customerEditMode={false}
          navList={lstWebsiteNav}
          systemID={systemID}
          websiteLogo={
            isDemo?Demo_jsnSystemInfo.strLogoPath:systemInfo.strLogoPath
          }
          systemPath={systemInfo?.strSystemPathURL}
          ws={isDemo?Demo_jsnSystemInfo.bigWSCategoryID:systemInfo?.bigWSCategoryID}
          lang={appState.clientInfo.strLanguage}
          userImg={appState?.userInfo?.strImgPath}
          userName={JSON.parse(JSON.stringify(appState?.userInfo?.jsnFullName))}
          blnUserLogin={appState?.clientInfo?.blnUserLogin}
          dir={appState.clientInfo.strDir}
        />
      )}
    </React.Fragment>
  );
}

export default RouteLandingPage;
