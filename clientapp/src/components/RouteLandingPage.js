import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Website from "./shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { json, useNavigate, useParams } from "react-router-dom";
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
import {
  bulkCategories,
  findCategories,
} from "appHelper/fetchapi/tblCategory/tblCategory";
import { Button, Grid, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";

function RouteLandingPage({ isDemo }) {
  const { appState, appDispatch } = useContext(AppContext);

  const { systemID } = useParams();
  const [systemInfo, setSystemInfo] = useState(
    JSON.parse(JSON.stringify(appState.systemInfo))
  );
  const [saveMode, setSaveMode] = useState([]);
  const firstRender = useRef(true);
  const adminEditMode =
    appState.clientInfo.blnUserLogin &&
    objRoleID["Admin"] === appState.userInfo.bigUserRoleID &&
    appState.systemInfo.bigSystemID === Number(systemID);
  const customerEditMode =
    appState.clientInfo.blnUserLogin &&
    objRoleID["Customer"] === appState.userInfo.bigUserRoleID &&
    appState.systemInfo.bigSystemID === Number(systemID);
  const loggedIn = appState?.clientInfo?.loggedIn;
  const [isLoading, setIsLoading] = useState(false);
  useLanguage();
  const instalData = async () => {
    setIsLoading(true);
    const systemData = await findSystem(systemID);
    const categoriesData = await findCategories(systemID);
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
    appState.systemInfo.lstSystemTeam = JSON.parse(systemData?.lstSystemTeam);
    appState.systemInfo.jsnSystemSections = JSON.parse(
      systemData?.jsnSystemSections
    );
    appState.systemInfo.bigWSCategoryID = systemData?.bigWSCategoryID;
    appState.systemInfo.jsnSystemLocation = JSON.parse(
      systemData?.jsnSystemLocation
    );
    appState.systemInfo.lstContactUs = JSON.parse(systemData?.lstContactUs);
    appState.systemInfo.strLogoPath = systemData?.strLogoPath;
    appDispatch({ ...appState });
    setIsLoading(false);
  };

  useEffect(() => {
    if (systemID) {
      instalData();
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  useEffect(() => {
    setSystemInfo(JSON.parse(JSON.stringify(appState.systemInfo)));
  }, [appState.systemInfo,appState.systemInfo.systemMenu,appState]);


  const onSaveUpperHeader = (contacts) => {
    setSystemInfo({ ...systemInfo, jsnSystemContact: contacts });
  };
  const onSaveHero = (heroSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        lstHeroSlides: heroSectionUpdated,
      },
    });
    if (!saveMode.includes("tblSystem")) {
      saveMode.push("tblSystem");
      setSaveMode([...saveMode]);
    }
  };
  const onSaveOwner = (ownerSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        jsnOwnerSection: ownerSectionUpdated,
      },
    });
    if (!saveMode.includes("tblSystem")) {
      saveMode.push("tblSystem");
      setSaveMode([...saveMode]);
    }
  };
  const onSaveReservation = (resSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        jsnReservation: resSectionUpdated,
      },
    });
    if (!saveMode.includes("tblSystem")) {
      saveMode.push("tblSystem");
      setSaveMode([...saveMode]);
    }
  };
  const onSaveAbout = (aboutSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        jsnAboutSection: aboutSectionUpdated,
      },
    });
    if (!saveMode.includes("tblSystem")) {
      saveMode.push("tblSystem");
      setSaveMode([...saveMode]);
    }
  };
  const addMenuCategory = (category) => {
    systemInfo.systemMenu.push(category);
    setSystemInfo({ ...systemInfo, systemMenu: [...systemInfo?.systemMenu] });
    if (!saveMode.includes("tblCategory")) {
      saveMode.push("tblCategory");
      setSaveMode([...saveMode]);
    }
  };
  const deleteMenuCategory = (bigID) => {
    systemInfo.systemMenu = systemInfo.systemMenu.filter(
      (category) => category.bigID !== bigID
    );
    setSystemInfo({ ...systemInfo });
    if (!saveMode.includes("tblCategory")) {
      saveMode.push("tblCategory");
      setSaveMode([...saveMode]);
    }
  };
  const editMenuCategory = (category) => {
    const categoryIndex = systemInfo.systemMenu.findIndex(
      ({ bigID }) => category.bigID === bigID
    );
    systemInfo.systemMenu[categoryIndex] = category;
    setSystemInfo({ ...systemInfo });
    if (!saveMode.includes("tblCategory")) {
      saveMode.push("tblCategory");
      setSaveMode([...saveMode]);
    }
  };
  const addWS = (categoryID) => {
    systemInfo.bigWSCategoryID = categoryID;
    setSystemInfo({ ...systemInfo });
    if (!saveMode.includes("tblSystem")) {
      saveMode.push("tblSystem");
      setSaveMode([...saveMode]);
    }
  };

  const removeWS = () => {
    systemInfo.bigWSCategoryID = null;
    setSystemInfo({ ...systemInfo });
    if (!saveMode.includes("tblSystem")) {
      saveMode.push("tblSystem");
      setSaveMode([...saveMode]);
    }
  };

  const addChef = (chef) => {
    systemInfo.lstSystemTeam.push(chef);
    setSystemInfo({ ...systemInfo });
    if (!saveMode.includes("tblSystem")) {
      saveMode.push("tblSystem");
      setSaveMode([...saveMode]);
    }
  };

  const editChef = (chef) => {
    const chefIndex = systemInfo.lstSystemTeam.findIndex(
      ({ bigID }) => chef.bigID === bigID
    );
    systemInfo.lstSystemTeam[chefIndex] = chef;
    setSystemInfo({ ...systemInfo });
    if (!saveMode.includes("tblSystem")) {
      saveMode.push("tblSystem");
      setSaveMode([...saveMode]);
    }
  };

  const deleteChef = (bigID) => {
    systemInfo.lstSystemTeam = systemInfo.lstSystemTeam.filter(
      (chef) => chef.bigID !== bigID
    );
    setSystemInfo({ ...systemInfo });
    if (!saveMode.includes("tblSystem")) {
      saveMode.push("tblSystem");
      setSaveMode([...saveMode]);
    }
  };

  const onSave = async () => {
    if (saveMode?.length) {
      setIsLoading(true);
    }
    if (saveMode.includes("tblCategory")) {
      const categoriesOnDeleteIDs = (
        appState?.systemInfo?.systemMenu || []
      ).reduce((IDs, category) => {
        const isCatOnDelete =
          systemInfo?.systemMenu?.findIndex(
            ({ bigID }) => `${category.bigID}` === `${bigID}`
          ) === -1;
        if (isCatOnDelete) {
          IDs.push(category.bigID);
        }
        return IDs;
      }, []);
      const categoriesData = await bulkCategories(
        systemInfo.systemMenu,
        categoriesOnDeleteIDs
      );
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
        appState.systemInfo.systemMenu = systemMenu;
        appState.systemInfo.systemRegion = systemRegion;
      }
    }
    if (saveMode.includes("tblSystem")) {
      const objInputSystem = JSON.parse(JSON.stringify(systemInfo));
      const systemData = await updateSystem(objInputSystem);
      appState.systemInfo.bigSystemID = systemData.bigSystemID;
      appState.systemInfo.jsnSystemContact = JSON.parse(
        systemData?.jsnSystemContact
      );
      appState.systemInfo.lstSystemReviews = JSON.parse(
        systemData?.lstSystemReviews
      );
      appState.systemInfo.lstSystemTeam = JSON.parse(systemData?.lstSystemTeam);
      appState.systemInfo.jsnSystemSections = JSON.parse(
        systemData?.jsnSystemSections
      );
      appState.systemInfo.bigWSCategoryID = systemData?.bigWSCategoryID;
      appState.systemInfo.jsnSystemLocation = JSON.parse(
        systemData?.jsnSystemLocation
      );
      appState.systemInfo.lstContactUs = JSON.parse(systemData?.lstContactUs);
      appState.systemInfo.strLogoPath = systemData?.strLogoPath;
    }
    if (saveMode?.length) {
      appDispatch({ ...appState });
    }
    setSaveMode([]);
    setIsLoading(false);
  };
  const navigate = useNavigate();

  const adminNavList = [
    { bigNavID: 1234146400, nav: { eng: "upload logo", arb: "صورة اللوغو" } },
    { bigNavID: 3234146150, nav: { eng: "dashboard", arb: "داشبورد" } },
    { bigNavID: 4324146478, nav: { eng: "orders", arb: "الطلبات" } },
    { bigNavID: 5674146478, nav: { eng: "reservations", arb: "الحجوزات" } },
    { bigNavID: 9864146478, nav: { eng: "messages", arb: "الرسائل" } },
    { bigNavID: 7764142478, nav: { eng: "settings", arb: "الاعدادات" } },
  ];

  const onLogout = () => {
    console.log("logout")
  };
  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" },onClick:onLogout },
  ];

  const addOrderProduct = (product)=>{
    const productPrice = product.jsnCategoryInfo.blnOnSale?product.jsnCategoryInfo.strSalePrice:product.jsnCategoryInfo.strPrice;
    const productIndex = appState.userInfo.userOrder.lstProduct.findIndex(({bigID})=>`${product.bigID}`===`${bigID}`);
    if(productIndex===-1){
      appState.userInfo.userOrder.lstProduct.push({bigID:product.bigID,intQuantity:1,strPrice:productPrice});
      appDispatch({...appState})
     return;
    }
    appState.userInfo.userOrder.lstProduct[productIndex] = {...appState.userInfo.userOrder.lstProduct[productIndex],intQuantity:appState.userInfo.userOrder.lstProduct[productIndex]?.intQuantity+1};
    appDispatch({...appState})
  };

  const removeOrderProduct = (product)=>{
  };

  return (
    <React.Fragment>
      {!!saveMode.length && adminEditMode && (
        <Grid container justifyContent={"center"}>
          <Button color="secondary" onClick={onSave} startIcon={<Save />}>
            Save changes
          </Button>
        </Grid>
      )}
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && (systemInfo.bigSystemID || isDemo) && (
        <Website
          systemInfo={
            isDemo ? Demo_jsnSystemInfo : JSON.parse(JSON.stringify(systemInfo))
          }
          editable={adminEditMode}
          adminEditMode={adminEditMode}
          customerEditMode={customerEditMode}
          loggedIn={loggedIn}
          userOrder={appState?.userInfo?.userOrder}
          addOrderProduct={addOrderProduct}
          removeOrderProduct={removeOrderProduct}
          onSaveUpperHeader={onSaveUpperHeader}
          onSaveHero={onSaveHero}
          onSaveOwner={onSaveOwner}
          onSaveReservation={onSaveReservation}
          onSaveAbout={onSaveAbout}
          systemID={systemID}
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
        />
      )}
    </React.Fragment>
  );
}

export default RouteLandingPage;
