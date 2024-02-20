import React, { useContext, useEffect, useRef, useState } from "react";
import Website from "components/shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { useNavigate, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import { ctrlRouteCustomer } from "./controller/CtrlRouteCustomer";

function RouteCustomer() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const [systemInfo, setSystemInfo] = useState(null);
  const firstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const navigate = useNavigate();
  useLanguage();

  useEffect(() => {
    const funInstallData = async () => {
      setIsLoading(true);
      await ctrlRouteCustomer.installData({
        appState:appState,
        appDispatch:appDispatch,
        setSystemInfo:setSystemInfo,
        systemID:systemID
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

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  const addOrderProduct = (product) => {
    if(appState?.userInfo?.userOrder?.bigOrderID){
      alert('you have an order on the way already!');
      return;
    }else {
      const productPrice = product.jsnCategoryInfo.blnOnSale
        ? product.jsnCategoryInfo.strSalePrice
        : product.jsnCategoryInfo.strPrice;
      const productIndex = appState.userInfo.userCart.lstProduct.findIndex(
        ({ bigID }) => `${product.bigID}` === `${bigID}`
      );
      if (productIndex === -1) {
        appState.userInfo.userCart.lstProduct.push({
          bigID: product.bigID,
          intQuantity: 1,
          strPrice: productPrice,
        });
        appDispatch({ ...appState });
        return;
      }
      appState.userInfo.userCart.lstProduct[productIndex] = {
        ...appState.userInfo.userCart.lstProduct[productIndex],
        intQuantity:
          appState.userInfo.userCart.lstProduct[productIndex]?.intQuantity + 1,
      };
      appDispatch({ ...appState });
    }
  }

  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

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
  return (
    <React.Fragment>
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && systemInfo && (
        <Website
          systemInfo={JSON.parse(JSON.stringify(systemInfo))}
          editable={false}
          navList={navList}
          adminEditMode={false}
          jsnSystemLocation={appState?.systemInfo?.jsnSystemLocation}
          customerEditMode={true}
          userCart={appState?.userInfo?.userCart}
          addOrderProduct={addOrderProduct}
          systemID={systemID}
          ws={systemInfo?.bigWSCategoryID}
          websiteLogo={appState?.systemInfo?.strLogoPath}
          lang={appState.clientInfo.strLanguage}
          userImg={appState?.userInfo?.strImgPath}
          userName={JSON.parse(JSON.stringify(appState?.userInfo?.jsnFullName))}
          blnUserLogin={appState?.clientInfo?.blnUserLogin}
          userNavList={userNavList}
          dir={appState.clientInfo.strDir}
        />
      )}
      <UploadPicture
        open={uploadPictureOpen}
        handleClose={() => setUploadPicture(false)}
      />
    </React.Fragment>
  );
}

export default RouteCustomer;
