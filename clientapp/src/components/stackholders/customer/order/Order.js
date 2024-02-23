import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { ctrlOrder } from "./controller/CtrlOrder";
import { useNavigate, useParams } from "react-router-dom";
import { calculateZDirection } from "appHelper/appFunctions";
import Products from "./products/Products";
import DeliveryTime from "./deliveryTime/DeliveryTime";
import TotalInfo from "./totalInfo/TotalInfo";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import { ctrlRouteCustomer } from "../controller/CtrlRouteCustomer";

const styles = {
  container: {
    marginY: {lg:"50px",xs:"20px"},
  },
  orderInfo: {
    marginTop: {lg:"40px",xs:"10px"},
  },
};

function Order() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const navigate = useNavigate();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const deliveryTime = useMemo(() => {
    const coord = appState.userInfo.jsnLocation;
    const systemCoord = appState.systemInfo.jsnSystemLocation;
    let deliveryTime = calculateZDirection(
      coord.lat,
      coord.long,
      systemCoord.lat,
      systemCoord.long
    );
    return Math.round(Number(deliveryTime * 60));
  }, []);
  const initOrderedCategories = useMemo(() => {
    return appState?.userInfo?.userOrder?.lstProduct.map((product) => {
      const category = appState.systemInfo.systemMenu.find(
        ({ bigID }) => `${product.bigID}` === `${bigID}`
      );
      return { ...product, ...category };
    });
  }, [appState?.systemInfo?.userOrder]);
  const [orderedCategories, setOrderedCategories] = useState([
    ...initOrderedCategories,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = appState?.userInfo?.userOrder?.lstProduct.reduce(
    (total, { strPrice, intQuantity }) => {
      return total + Number(strPrice) * intQuantity;
    },
    0
  );

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

  const handleOrderDelivered = () => {
    ctrlOrder.orderDelivered({
      appDispatch: appDispatch,
      appState: appState,
      bigOrderID: appState?.userInfo?.userOrder?.bigOrderID,
      setIsLoading: setIsLoading,
      setOrderedCategories: setOrderedCategories,
    });
  };
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
          <Grid item lg="10" xs="12" px={2} container>
            <Grid item xs="12" px={1}>
              <Products
                orderedCategories={orderedCategories}
                lang={lang}
                dir={dir}
                appState={appState}
              />
            </Grid>
            <Grid item xs="12" container 
             sx={styles.orderInfo}>
              <Grid item lg="4" sx={{paddingY:{lg:"0px",xs:"20px"}}} xs={12} px={1}>
                <DeliveryTime
                  deliveryTime={deliveryTime}
                  dir={dir}
                  handleOrderDelivered={handleOrderDelivered}
                  lang={lang}
                  orderedCategories={orderedCategories}
                  appState={appState}
                />
              </Grid>
              <Grid item lg="8" sx={{paddingY:{lg:"0px",xs:"20px"}}} xs={12} px={1}>
                <TotalInfo dir={dir} lang={lang} totalPrice={totalPrice} />
              </Grid>
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

export default Order;
