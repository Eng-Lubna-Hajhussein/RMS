import React, { useContext, useEffect, useMemo, useState } from "react";
import Website from "./shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { json, useParams } from "react-router-dom";
import {
  Demo_SystemMenu,
  Demo_categories,
  Demo_jsnSystemInfo,
  objCategoriesType,
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
  const [systemInfo, setSystemInfo] = useState(
    JSON.parse(JSON.stringify(appState.systemInfo))
  );
  const isEditable =
    appState.clientInfo.blnUserLogin &&
    objRoleID["Admin"] === appState.userInfo.bigUserRoleID &&
    appState.systemInfo.bigSystemID === Number(systemID);
    const [isLoading,setIsLoading] = useState(false);
  useLanguage();

  const instalData = async () => {
    setIsLoading(true);
    const systemData = await findSystem(systemID);
    const categoriesData = await findCategories(systemID);
    if (categoriesData.length) {
      const systemMenu = [];
      const systemRegion = [];
      categoriesData.forEach((category) => {
        if (category.bigCategoryTypeID === objCategoriesType['Menu']) {
          systemMenu.push({
            ...category,
            jsnName:JSON.parse(category?.jsnName||{}),
            jsnCategoryInfo:JSON.parse(category?.jsnCategoryInfo),
          })
        if(category.bigCategoryTypeID === objCategoriesType.Region){
          systemRegion.push({
            ...category,
            jsnName:JSON.parse(category?.jsnName||{}),
            jsnCategoryInfo:JSON.parse(category?.jsnCategoryInfo),
          })
        }
        }
      });
      appState.systemInfo.systemMenu = systemMenu;
      appState.systemInfo.systemRegion = systemRegion;
    }
    appState.systemInfo.bigSystemID = systemData.bigSystemID;
    appState.systemInfo.jsnSystemContact = JSON.parse(
    systemData?.jsnSystemContact
    );
    appState.systemInfo.lstSystemReviews = JSON.parse(
      systemData?.lstSystemReviews
    );
    appState.systemInfo.lstSystemTeam = JSON.parse(
      systemData?.lstSystemTeam
    );
    appState.systemInfo.jsnSystemSections = JSON.parse(
      systemData?.jsnSystemSections
    );
    appState.systemInfo.bigWSCategoryID = systemData?.bigWSCategoryID;
    appState.systemInfo.jsnSystemLocation = JSON.parse(
      systemData?.jsnSystemLocation
    );
    appState.systemInfo.lstContactUs = JSON.parse(
      systemData?.lstContactUs
    );
    appState.systemInfo.strLogoPath = systemData?.strLogoPath;
    appDispatch({ ...appState });
    setIsLoading(false);
  };

  useEffect(() => {
    if (systemID) {
      instalData();
    }
  }, []);

  const onSaveUpperHeader = (contacts) => {
    setSystemInfo({ ...systemInfo, jsnSystemContact: contacts });
  };
  const onSaveHero = (heroSectionUpdated) => {
    systemInfo.jsnSystemSections.lstHeroSlides = heroSectionUpdated;
    setSystemInfo({ ...systemInfo });
  };
  const onSaveOwner = (ownerSectionUpdated) => {
    systemInfo.jsnSystemSections.jsnOwnerSection = ownerSectionUpdated;
    setSystemInfo({ ...systemInfo });
  };
  const onSaveReservation = (resSectionUpdated) => {
    systemInfo.jsnSystemSections.jsnReservation = resSectionUpdated;
    setSystemInfo({ ...systemInfo });
  };
  const onSaveAbout = (aboutSectionUpdated) => {
    systemInfo.jsnSystemSections.jsnAboutSection = aboutSectionUpdated;
    setSystemInfo({ ...systemInfo });
  };
  const addMenuCategory = (category)=>{
    systemInfo.systemMenu.push(category);
    setSystemInfo({ ...systemInfo });
  }
  const deleteMenuCategory = (bigID)=>{
    systemInfo.systemMenu = systemInfo.systemMenu.filter((category)=>category.bigID!==bigID);
    setSystemInfo({ ...systemInfo });
  }
  const editMenuCategory = (category)=>{
    const categoryIndex = systemInfo.systemMenu.findIndex(({bigID})=>category.bigID===bigID);
    systemInfo.systemMenu[categoryIndex] = category;
    setSystemInfo({ ...systemInfo });
  }
  const addWS = (categoryID)=>{
    systemInfo.bigWSCategoryID = categoryID;
    setSystemInfo({...systemInfo});
  }

  const removeWS = ()=>{
    systemInfo.bigWSCategoryID = null;
    setSystemInfo({...systemInfo});
  }

  const addChef = (chef)=>{
    systemInfo.lstSystemTeam.push(chef);
    setSystemInfo({ ...systemInfo });
  }

  const editChef = (chef)=>{
    const chefIndex = systemInfo.lstSystemTeam.findIndex(({bigID})=>chef.bigID===bigID);
    systemInfo.lstSystemTeam[chefIndex] = chef;
    setSystemInfo({ ...systemInfo });
  }

  const deleteChef = (bigID)=>{
    systemInfo.lstSystemTeam = systemInfo.lstSystemTeam.filter((chef)=>chef.bigID!==bigID);
    setSystemInfo({ ...systemInfo });
  }


  const adminNavList = [
    { bigNavID: 1234146400, nav: { eng: "upload logo", arb: "صورة اللوغو" } },
    { bigNavID: 4324146478, nav: { eng: "orders", arb: "الطلبات" } },
    { bigNavID: 5674146478, nav: { eng: "reservations", arb: "الحجوزات" } },
    { bigNavID: 9864146478, nav: { eng: "messages", arb: "الرسائل" } },
    { bigNavID: 7764142478, nav: { eng: "settings", arb: "الاعدادات" } },
  ];
  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ];

  const onLogout = async () => {};

  useEffect(() => {
    console.log({ systemInfo });
    console.log(appState.systemInfo)
  }, [appState.systemInfo]);

  return (
    <React.Fragment>
      {!isLoading&&<Website
        isDemo={isDemo}
        systemInfo={
          isDemo ? Demo_jsnSystemInfo : JSON.parse(JSON.stringify(systemInfo))
        }
        editable={isEditable}
        onSaveUpperHeader={onSaveUpperHeader}
        onSaveHero={onSaveHero}
        onSaveOwner={onSaveOwner}
        onSaveReservation={onSaveReservation}
        onSaveAbout={onSaveAbout}
        addMenuCategory={addMenuCategory}
        deleteMenuCategory={deleteMenuCategory}
        editMenuCategory={editMenuCategory}
        addChef={addChef}
        editChef={editChef}
        deleteChef={deleteChef}
        addWS={addWS}
        removeWS={removeWS}
        ws={systemInfo?.bigWSCategoryID}
        adminNavList={adminNavList}
        lang={appState.clientInfo.strLanguage}
        userImg={appState?.userInfo?.strImgPath}
        userName={JSON.parse(JSON.stringify(appState?.userInfo?.jsnFullName))}
        blnUserLogin={appState?.clientInfo?.blnUserLogin}
        userNavList={userNavList}
        dir={appState.clientInfo.strDir}
      />}
    </React.Fragment>
  );
}

export default RouteLandingPage;
