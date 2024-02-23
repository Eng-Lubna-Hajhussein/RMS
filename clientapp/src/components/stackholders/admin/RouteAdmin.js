import React, { useContext, useEffect, useRef, useState } from "react";
import Website from "components/shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { Save } from "@mui/icons-material";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import UploadLogo from "./uploadLogo/UploadLogo";
import SharedLink from "./sharedLink/SharedLink";
import { ctrlRouteAdmin } from "./controller/CtrlRouteAdmin";
import { dictionary } from "appHelper/appDictionary";

function RouteAdmin() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const [systemInfo, setSystemInfo] = useState(
    JSON.parse(JSON.stringify(appState.systemInfo))
  );
  const isSystemUpdated = useRef(false);
  const isMenuUpdated = useRef(false);
  const firstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const [uploadLogoOpen, setUploadLogo] = useState(false);
  const [sharedLinkOpen, setSharedLinkOpen] = useState(false);
  const navigate = useNavigate();
  useLanguage();

  useEffect(() => {
    const funInstallData = async () => {
      setIsLoading(true);
      ctrlRouteAdmin.installData({
        appDispatch: appDispatch,
        appState: appState,
        setSystemInfo: setSystemInfo,
        systemID: systemID,
        setIsLoading:setIsLoading
      });
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
  }, [appState]);

  const onSaveUpperHeader = (contacts) => {
    setSystemInfo({ ...systemInfo, jsnSystemContact: contacts });
    isSystemUpdated.current = true;
  };
  const onSaveHero = (heroSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        lstHeroSlides: heroSectionUpdated,
      },
    });
    isSystemUpdated.current = true;
  };
  const onSaveOwner = (ownerSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        jsnOwnerSection: ownerSectionUpdated,
      },
    });
    isSystemUpdated.current = true;
  };
  const onSaveReservation = (resSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        jsnReservation: resSectionUpdated,
      },
    });
    isSystemUpdated.current = true;
  };
  const onSaveAbout = (aboutSectionUpdated) => {
    setSystemInfo({
      ...systemInfo,
      jsnSystemSections: {
        ...systemInfo.jsnSystemSections,
        jsnAboutSection: aboutSectionUpdated,
      },
    });
    isSystemUpdated.current = true;
  };
  const addMenuCategory = (category) => {
    systemInfo.systemMenu.push(category);
    setSystemInfo({ ...systemInfo, systemMenu: [...systemInfo?.systemMenu] });
    isMenuUpdated.current = true;
  };
  const deleteMenuCategory = (bigID) => {
    if (bigID === systemInfo.bigWSCategoryID) {
      systemInfo.bigWSCategoryID = null;
      isSystemUpdated.current = true;
    }
    systemInfo.systemMenu = systemInfo.systemMenu.filter(
      (category) => category.bigID !== bigID
    );
    setSystemInfo({ ...systemInfo });
    isMenuUpdated.current = true;
  };
  const editMenuCategory = (category) => {
    const categoryIndex = systemInfo.systemMenu.findIndex(
      ({ bigID }) => category.bigID === bigID
    );
    systemInfo.systemMenu[categoryIndex] = category;
    setSystemInfo({ ...systemInfo });
    isMenuUpdated.current=true;
  };
  const addWS = (categoryID) => {
    systemInfo.bigWSCategoryID = categoryID;
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current = true;
  };
  const removeWS = () => {
    systemInfo.bigWSCategoryID = null;
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current = true;
  };
  const addChef = (chef) => {
    systemInfo.lstSystemTeam.push(chef);
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current = true;
  };
  const editChef = (chef) => {
    const chefIndex = systemInfo.lstSystemTeam.findIndex(
      ({ bigID }) => chef.bigID === bigID
    );
    systemInfo.lstSystemTeam[chefIndex] = chef;
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current = true;
  };
  const deleteChef = (bigID) => {
    systemInfo.lstSystemTeam = systemInfo.lstSystemTeam.filter(
      (chef) => chef.bigID !== bigID
    );
    setSystemInfo({ ...systemInfo });
    isSystemUpdated.current = true;
  };

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

  const handleSharedLinkOpen = () => {
    setSharedLinkOpen(true);
  };

  const handleUploadLogoOpen = () => {
    setUploadLogo(true);
  };

  const adminNavList = ctrlRouteAdmin.generateAdminNavList({
    handleSharedLinkOpen: handleSharedLinkOpen,
    handleUploadLogoOpen: handleUploadLogoOpen,
    systemID: systemID,
    systemName: systemName,
  });

  const userNavList = ctrlRouteAdmin.generateUserNavList({
    appState: appState,
    appDispatch: appDispatch,
    handleUploadPictureOpen: handleUploadPictureOpen,
    systemID: systemID,
    systemName: systemName,
  });
  const navList = ctrlRouteAdmin.generateWebsiteNavList({
    systemID: systemID,
    systemName: systemName,
  });

  return (
    <React.Fragment>
      {(!!isSystemUpdated.current || !!isMenuUpdated.current) && (
        <Grid container justifyContent={"center"}>
          <Button
            color="secondary"
            onClick={() => {
              ctrlRouteAdmin.onSave({
                appState: appState,
                appDispatch: appDispatch,
                isMenuUpdated: isMenuUpdated,
                isSystemUpdated: isSystemUpdated,
                setIsLoading: setIsLoading,
                systemInfo: systemInfo,
              });
            }}
            startIcon={<Save />}
          >
            <Typography px={dir === "rtl" ? 2 : 0}>
              {dictionary.buttons.saveChanges[lang]}
            </Typography>
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
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
      />
      <SharedLink
        open={sharedLinkOpen}
        handleClose={() => setSharedLinkOpen(false)}
      />
    </React.Fragment>
  );
}

export default RouteAdmin;
