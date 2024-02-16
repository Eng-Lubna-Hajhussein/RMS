import React, { useContext, useEffect, useRef, useState } from "react";
import Website from "components/shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { useNavigate, useParams } from "react-router-dom";
import {
  initialAppState,
  objCategoriesType,
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
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import UploadLogo from "./uploadLogo/UploadLogo";
import SharedLink from "./sharedLink/SharedLink";

function RouteAdmin() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const [systemInfo, setSystemInfo] = useState(
    JSON.parse(JSON.stringify(appState.systemInfo))
  );
  const [saveMode, setSaveMode] = useState([]);
  const isSystemUpdated = useRef(false);
  const isMenuUpdated = useRef(false);
  const firstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const [uploadLogoOpen, setUploadLogo] = useState(false);
  const [sharedLinkOpen, setSharedLinkOpen] = useState(false);
  const navigate = useNavigate();
  useLanguage();

  const instalData = async () => {
    const system = await findSystem(systemID);
    const categoriesData = await findCategories(systemID);
    const systemData = {};
    if (Array.isArray(categoriesData)) {
      const systemMenu = [];
      const systemDeliveryAddress = [];
      categoriesData.forEach((category) => {
        if (category.bigCategoryTypeID === objCategoriesType["Menu"]) {
          systemMenu.push({
            ...category,
            jsnName: JSON.parse(category?.jsnName || {}),
            jsnCategoryInfo: JSON.parse(category?.jsnCategoryInfo),
          });
        }
        if (
          category.bigCategoryTypeID === objCategoriesType["DeliveryAddress"]
        ) {
          systemDeliveryAddress.push({
            ...category,
            jsnName: JSON.parse(category?.jsnName || {}),
            jsnCategoryInfo: JSON.parse(category?.jsnCategoryInfo),
          });
        }
      });
      systemData.systemMenu = systemMenu;
      systemData.systemDeliveryAddress = systemDeliveryAddress;
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
      console.log(appState);
    }
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, []);

  useEffect(() => {
    setSystemInfo(JSON.parse(JSON.stringify(appState.systemInfo)));
  }, [appState]);

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
    isSystemUpdated.current=true;
    // if (!saveMode.includes("tblSystem")) {
    //   saveMode.push("tblSystem");
    //   setSaveMode([...saveMode]);
    // }
  };
  const onSaveOwner = (ownerSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        jsnOwnerSection: ownerSectionUpdated,
      },
    });
    isSystemUpdated.current=true;
  };
  const onSaveReservation = (resSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        jsnReservation: resSectionUpdated,
      },
    });
    isSystemUpdated.current=true;
    // if (!saveMode.includes("tblSystem")) {
    //   saveMode.push("tblSystem");
    //   setSaveMode([...saveMode]);
    // }
  };
  const onSaveAbout = (aboutSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        jsnAboutSection: aboutSectionUpdated,
      },
    });
    isSystemUpdated.current=true;
    // if (!saveMode.includes("tblSystem")) {
    //   saveMode.push("tblSystem");
    //   setSaveMode([...saveMode]);
    // }
  };
  const addMenuCategory = (category) => {
    systemInfo.systemMenu.push(category);
    setSystemInfo({ ...systemInfo, systemMenu: [...systemInfo?.systemMenu] });
    isMenuUpdated.current=true;
    // if (!saveMode.includes("tblCategory")) {
    //   saveMode.push("tblCategory");
    //   setSaveMode([...saveMode]);
    // }
  };
  const deleteMenuCategory = (bigID) => {
    if (bigID === systemInfo.bigWSCategoryID) {
      systemInfo.bigWSCategoryID = null;
      isMenuUpdated.current=true;
      // if (!saveMode.includes("tblSystem")) {
      //   saveMode.push("tblSystem");
      //   setSaveMode([...saveMode]);
      // }
    }
    systemInfo.systemMenu = systemInfo.systemMenu.filter(
      (category) => category.bigID !== bigID
    );
    setSystemInfo({ ...systemInfo });
    isMenuUpdated.current=true;
    // if (!saveMode.includes("tblCategory")) {
    //   saveMode.push("tblCategory");
    //   setSaveMode([...saveMode]);
    // }
  };
  const editMenuCategory = (category) => {
    const categoryIndex = systemInfo.systemMenu.findIndex(
      ({ bigID }) => category.bigID === bigID
    );
    systemInfo.systemMenu[categoryIndex] = category;
    setSystemInfo({ ...systemInfo });
    isMenuUpdated.current=true;
    // if (!saveMode.includes("tblCategory")) {
    //   saveMode.push("tblCategory");
    //   setSaveMode([...saveMode]);
    // }
  };
  const addWS = (categoryID) => {
    systemInfo.bigWSCategoryID = categoryID;
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current=true;
    // if (!saveMode.includes("tblSystem")) {
    //   saveMode.push("tblSystem");
    //   setSaveMode([...saveMode]);
    // }
  };

  const removeWS = () => {
    systemInfo.bigWSCategoryID = null;
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current=true;
    // if (!saveMode.includes("tblSystem")) {
    //   saveMode.push("tblSystem");
    //   setSaveMode([...saveMode]);
    // }
  };

  const addChef = (chef) => {
    systemInfo.lstSystemTeam.push(chef);
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current=true;
    // if (!saveMode.includes("tblSystem")) {
    //   saveMode.push("tblSystem");
    //   setSaveMode([...saveMode]);
    // }
  };

  const editChef = (chef) => {
    const chefIndex = systemInfo.lstSystemTeam.findIndex(
      ({ bigID }) => chef.bigID === bigID
    );
    systemInfo.lstSystemTeam[chefIndex] = chef;
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current=true;
    // if (!saveMode.includes("tblSystem")) {
    //   saveMode.push("tblSystem");
    //   setSaveMode([...saveMode]);
    // }
  };

  const deleteChef = (bigID) => {
    systemInfo.lstSystemTeam = systemInfo.lstSystemTeam.filter(
      (chef) => chef.bigID !== bigID
    );
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current=true;
    // if (!saveMode.includes("tblSystem")) {
    //   saveMode.push("tblSystem");
    //   setSaveMode([...saveMode]);
    // }
  };

  const onSave = async () => {
    setIsLoading(true);
    if (isMenuUpdated.current) {
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
        categoriesData.forEach((category) => {
          if (category.bigCategoryTypeID === objCategoriesType.Menu) {
            systemMenu.push({
              ...category,
              jsnName: JSON.parse(category?.jsnName || {}),
              jsnCategoryInfo: JSON.parse(category?.jsnCategoryInfo),
            });
          }
        });
        appState.systemInfo.systemMenu = systemMenu;
      }
    }
    if (isSystemUpdated.current) {
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
    appDispatch({ ...appState });
    isMenuUpdated.current=false;
    isSystemUpdated.current=false;
    setIsLoading(false);
  };

  const onLogout = () => {
    appState.clientInfo.blnUserLogin = false;
    appState.clientInfo = initialAppState.clientInfo;
    appState.systemInfo = initialAppState.systemInfo;
    appState.userInfo = initialAppState.userInfo;
    appDispatch({ ...appState });
  };

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  const userNavList = [
    {
      bigNavID: 6774846478,
      nav: { eng: "upload picture", arb: "حسابي" },
      onClick: () => {
        setUploadPicture(true);
      },
    },
    {
      bigNavID: 1166046478,
      nav: { eng: "logout", arb: "تسجيل الخروج" },
      onClick: onLogout,
    },
  ];

  const adminNavList = [
    {
      bigNavID: 1234146400,
      nav: { eng: "upload logo", arb: "صورة اللوغو" },
      onClick: () => {
        setUploadLogo(true);
      },
    },
    { bigNavID: 1874146400, nav: { eng: "Dashboard", arb: "صورة اللوغو" } },
    { bigNavID: 1654146400, nav: { eng: "settings", arb: "صورة اللوغو" } },
    {
      bigNavID: 2354146400,
      nav: { eng: "delivery address", arb: "صورة اللوغو" },
    },
    { bigNavID: 2554146400, nav: { eng: "shared link", arb: "صورة اللوغو" },onClick: () => {
      setSharedLinkOpen(true);
    }, },
  ];

  const navList = [
    {
      bigNavID: 1342146478,
      nav: { eng: "home", arb: "الرئيسية" },
      path: `/admin/${systemName}/${systemID}`,
    },

    {
      bigNavID: 8944146478,
      nav: { eng: "orders", arb: "تسوق" },
      path: `/admin/orders/${systemName}/${systemID}`,
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "tables", arb: "الاخبار" },
      path: `/admin/tables/${systemName}/${systemID}`,
    },

    { bigNavID: 2344146478, nav: { eng: "users", arb: "المنيو" } },
    { bigNavID: 2344146478, nav: { eng: "reviews", arb: "المنيو" } },
  ];

  return (
    <React.Fragment>
      {!!(isSystemUpdated.current||isMenuUpdated.current) && (
        <Grid container justifyContent={"center"}>
          <Button color="secondary" onClick={onSave} startIcon={<Save />}>
            Save changes
          </Button>
        </Grid>
      )}
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && systemInfo.bigSystemID && (
        <Website
          systemInfo={JSON.parse(JSON.stringify(systemInfo))}
          editable={true}
          adminEditMode={true}
          customerEditMode={false}
          onSaveUpperHeader={onSaveUpperHeader}
          onSaveHero={onSaveHero}
          navList={navList}
          onSaveOwner={onSaveOwner}
          onSaveReservation={onSaveReservation}
          userNavList={userNavList}
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
          websiteLogo={appState?.systemInfo?.strLogoPath}
          userName={JSON.parse(JSON.stringify(appState?.userInfo?.jsnFullName))}
          blnUserLogin={appState?.clientInfo?.blnUserLogin}
          dir={appState.clientInfo.strDir}
        />
      )}
      <UploadPicture
        open={uploadPictureOpen}
        handleClose={() => setUploadPicture(false)}
      />
      <UploadLogo
        open={uploadLogoOpen}
        handleClose={() => setUploadLogo(false)}
      />
      <SharedLink
      open={sharedLinkOpen}
      handleClose={()=>setSharedLinkOpen(false)}
      />
    </React.Fragment>
  );
}

export default RouteAdmin;
