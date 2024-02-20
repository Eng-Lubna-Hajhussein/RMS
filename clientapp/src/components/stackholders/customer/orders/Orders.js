import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlOrders } from "./controller/CtrlOrders";
import OrdersInfo from "./ordersInfo/OrdersInfo";
import { ctrlRouteCustomer } from "../controller/CtrlRouteCustomer";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";

const styles = {
  container: {
    marginY: "50px",
  },
};

function Orders() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const navigate = useNavigate();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [uploadPictureOpen, setUploadPicture] = useState(false);

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

  useEffect(() => {
    ctrlOrders.installData({
      appState: appState,
      setIsLoading: setIsLoading,
      setOrders: setOrders,
    });
  }, []);

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        websiteLogo={appState?.systemInfo?.strLogoPath}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item xs="10" container>
            <Grid item xs="12" px={1}>
              <OrdersInfo orders={orders} dir={dir} lang={lang} />
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

export default Orders;
