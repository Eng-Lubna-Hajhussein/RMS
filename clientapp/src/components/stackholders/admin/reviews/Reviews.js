import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {  Grid } from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsTable from "./reviewsTable/ReviewsTable";
import { ctrlRouteAdmin } from "../controller/CtrlRouteAdmin";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import UploadLogo from "../uploadLogo/UploadLogo";
import SharedLink from "../sharedLink/SharedLink";

const styles = {
  container: {
    marginY: { lg: "50px", xs: "20px" },
  },
  itemContainer: {
    background: "#f4fcfc",
    height: "140px",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
  title: {
    textTransform: "uppercase",
    fontSize: "28px",
    fontWeight: "800",
    color: App_Primary_Color,
    borderBottom: "3px solid #ffd40d",
    width: "fit-content",
  },
  reviewsNum: {
    fontWeight: "800",
    textTransform: "capitalize",
  },
  arrowImg: {
    transform: "rotate(180deg)",
    height: "80px",
    width: "100%",
  },
};

function Reviews() {
  const { appState,appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const navigate = useNavigate();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const [uploadLogoOpen, setUploadLogo] = useState(false);
  const [sharedLinkOpen, setSharedLinkOpen] = useState(false);
  const reviews = useMemo(() => {
    return appState?.systemInfo?.lstSystemReviews || [];
  });

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
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        adminNavList={adminNavList}
        websiteLogo={appState?.systemInfo?.strLogoPath}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      <Grid container justifyContent={"center"} sx={styles.container}>
        <Grid item lg="10" xs="12" px={2} container>
          <ReviewsTable reviews={reviews} lang={lang} dir={dir} />
        </Grid>
      </Grid>
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

export default Reviews;
