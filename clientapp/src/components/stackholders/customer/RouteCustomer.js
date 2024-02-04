import React, { useContext, useEffect, useRef, useState } from "react";
import Website from "components/shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { useNavigate, useParams } from "react-router-dom";
import {
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
import { Typography } from "@mui/material";
import { findUnDeliveredOrder } from "appHelper/fetchapi/tblOrder/tblOrder";
import moment from "moment";

function RouteCustomer({ isDemo }) {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID } = useParams();
  const [systemInfo, setSystemInfo] = useState(
    null
  );
  const firstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  useLanguage();
  const instalData = async () => {
    const system = await findSystem(systemID);
    const categoriesData = await findCategories(systemID);
    const systemData ={}; 
    const userOrderObjInput = {
      bigUserID:appState.userInfo.bigUserID,
      bigSystemID:appState.systemInfo.bigSystemID
    }
    const userOrder = await findUnDeliveredOrder(userOrderObjInput);
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
    if(userOrder){
      appState.userInfo.userOrder ={
        bigOrderID:userOrder.bigOrderID,
        bigSystemID:userOrder.bigSystemID,
        bigUserID:userOrder.bigUserID,
        lstProduct:JSON.parse(userOrder.lstProduct),
        strTotalPrice:JSON.parse(userOrder.strTotalPrice),
        jsnAddress:JSON.parse(userOrder.jsnAddress),
        jsnLocation:JSON.parse(userOrder.jsnLocation),
        dtmOrderDate:moment.utc(new Date(Number(userOrder.dtmOrderDate))).format('YYYY-MM-DD HH:mm:ss'),
        jsnClientInfo:JSON.parse(userOrder.jsnClientInfo),
        jsnClientPayment:JSON.parse(userOrder.jsnClientPayment),
        blnDelivered:userOrder.blnDelivered
      }
    }
    systemData.bigSystemID = system.bigSystemID;
    systemData.jsnSystemContact = JSON.parse(
      system?.jsnSystemContact
    );
    systemData.lstSystemReviews = JSON.parse(
      system?.lstSystemReviews
    );
    systemData.lstSystemTeam = JSON.parse(system?.lstSystemTeam);
    systemData.jsnSystemSections = JSON.parse(
      system?.jsnSystemSections
    );
    systemData.bigWSCategoryID = system?.bigWSCategoryID;
    systemData.jsnSystemLocation = JSON.parse(
      system?.jsnSystemLocation
    );
    systemData.lstContactUs = JSON.parse(system?.lstContactUs);
    systemData.strLogoPath = system?.strLogoPath;
    appState.systemInfo={...appState.systemInfo,...systemData};
    setSystemInfo({...appState.systemInfo,...systemData});
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
      console.log(appState)
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

  const onLogout = () => {
    console.log("logout")
  };
  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" },onClick:onLogout },
  ];

  const addOrderProduct = (product)=>{
    const productPrice = product.jsnCategoryInfo.blnOnSale?product.jsnCategoryInfo.strSalePrice:product.jsnCategoryInfo.strPrice;
    const productIndex = appState.userInfo.userCart.lstProduct.findIndex(({bigID})=>`${product.bigID}`===`${bigID}`);
    if(productIndex===-1){
      appState.userInfo.userCart.lstProduct.push({bigID:product.bigID,intQuantity:1,strPrice:productPrice});
      appDispatch({...appState})
     return;
    }
    appState.userInfo.userCart.lstProduct[productIndex] = {...appState.userInfo.userCart.lstProduct[productIndex],intQuantity:appState.userInfo.userCart.lstProduct[productIndex]?.intQuantity+1};
    appDispatch({...appState})
  };

  const removeOrderProduct = (product)=>{
  };

  return (
    <React.Fragment>
      {isLoading && <Typography>loading</Typography>}
      {!isLoading&&(systemInfo)&& (
        <Website
          systemInfo={ JSON.parse(JSON.stringify(systemInfo))  }
          editable={false}
          adminEditMode={false}
          customerEditMode={true}
          userCart={appState?.userInfo?.userCart}
          addOrderProduct={addOrderProduct}
          removeOrderProduct={removeOrderProduct}
          systemID={systemID}
          ws={systemInfo?.bigWSCategoryID}
          adminNavList={null}
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

export default RouteCustomer;
