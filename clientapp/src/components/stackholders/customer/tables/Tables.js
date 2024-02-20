import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlTables } from "./controller/CtrlTables";
import TablesInfo from "./TablesInfo/TablesInfo";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import { ctrlRouteCustomer } from "../controller/CtrlRouteCustomer";

const styles = {
  container: {
    marginY: "50px",
  },
};

function Tables() {
  const { appState,appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const [tables, setTables] = useState([]);
  const { systemID, systemName } = useParams();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const navigate = useNavigate();

  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  const userNavList = ctrlRouteCustomer.generateUserNavList({
    appState: appState,
    appDispatch: appDispatch,
    handleUploadPictureOpen: handleUploadPictureOpen,
    systemID: systemID,
    systemName: systemName,
  });
  const navList = ctrlRouteCustomer.generateWebsiteNavList({
    systemID: systemID,
    systemName: systemName,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ctrlTables.installData({
      appState: appState,
      setIsLoading: setIsLoading,
      setTables: setTables,
    });
  }, []);

  const handleCancelTable = (bigTableID, tableIndex) => {
    ctrlTables.freeTable({
      bigTableID: bigTableID,
      index: tableIndex,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      tables: tables,
      setTables: setTables,
    });
  };

  useEffect(()=>{
    console.log({tables})
  },[tables])

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        websiteLogo={appState?.systemInfo?.strLogoPath}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item xs="10" container>
            <Grid item xs="12" px={1}>
              <TablesInfo
                handleCancelTable={handleCancelTable}
                dir={dir}
                lang={lang}
                tables={tables}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
      <UploadPicture
        open={uploadPictureOpen}
        handleClose={() => setUploadPicture(false)}
      />
    </React.Fragment>
  );
}

export default Tables;
