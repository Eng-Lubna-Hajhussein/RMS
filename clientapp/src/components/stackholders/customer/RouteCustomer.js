import React, { useContext, useEffect, useRef, useState } from "react";
import Website from "components/shared/website/Website";
import { AppContext } from "contextapi/context/AppContext";
import useLanguage from "hooks/useLanguage/useLanguage";
import { useNavigate, useParams } from "react-router-dom";
import { objCategoriesType } from "appHelper/appVariables";
import { findSystem } from "appHelper/fetchapi/tblSystem/tblSystem";
import { findCategories } from "appHelper/fetchapi/tblCategory/tblCategory";
import { Typography } from "@mui/material";
import { findUnDeliveredOrder } from "appHelper/fetchapi/tblOrder/tblOrder";
import moment from "moment";
import {initialAppState} from 'appHelper/appVariables';
import UploadPicture from "./uploadPicture/UploadPicture";

function RouteCustomer() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const [systemInfo, setSystemInfo] = useState(null);
  const firstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPictureOpen,setUploadPicture] = useState(false);
  const navigate = useNavigate();
  useLanguage();

  const instalData = async () => {
    const system = await findSystem(systemID);
    const categoriesData = await findCategories(systemID);
    const systemData = {};
    const userOrderObjInput = {
      bigUserID: appState.userInfo.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const userOrder = await findUnDeliveredOrder(userOrderObjInput);
    if (Array.isArray(categoriesData)) {
      const systemMenu = [];
      const systemDeliveryAddress = [];
      categoriesData.forEach((category) => {
        if (category.bigCategoryTypeID === objCategoriesType.Menu) {
          systemMenu.push({
            ...category,
            jsnName: JSON.parse(category?.jsnName || {}),
            jsnCategoryInfo: JSON.parse(category?.jsnCategoryInfo),
          });
        }
        if (category.bigCategoryTypeID === objCategoriesType.DeliveryAddress) {
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
    if (userOrder) {
      appState.userInfo.userOrder = {
        bigOrderID: userOrder.bigOrderID,
        bigSystemID: userOrder.bigSystemID,
        bigUserID: userOrder.bigUserID,
        lstProduct: JSON.parse(userOrder.lstProduct),
        strTotalPrice: JSON.parse(userOrder.strTotalPrice),
        jsnAddress: JSON.parse(userOrder.jsnAddress),
        jsnLocation: JSON.parse(userOrder.jsnLocation),
        dtmOrderDate: moment
          .utc(new Date(Number(userOrder.dtmOrderDate)))
          .format("YYYY-MM-DD HH:mm:ss"),
        jsnClientInfo: JSON.parse(userOrder.jsnClientInfo),
        jsnClientPayment: JSON.parse(userOrder.jsnClientPayment),
        blnDelivered: userOrder.blnDelivered,
      };
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
    appState.clientInfo.blnUserLogin=false;
    appState.clientInfo=initialAppState.clientInfo;
    appState.systemInfo=initialAppState.systemInfo;
    appState.userInfo=initialAppState.userInfo;
    appDispatch({...appState});
  };

  useEffect(()=>{
    if(!(appState.clientInfo.blnUserLogin)){
      navigate(`/${systemName}/${systemID}`);
    }
  },[appState.clientInfo.blnUserLogin])

  const addOrderProduct = (product) => {
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
  };

  const userNavList = [
    { bigNavID: 6774846478, nav: { eng: "upload picture", arb: "حسابي" },
  onClick:()=>{setUploadPicture(true)}
  },
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" },
    path: `/customer/profile/${systemName}/${systemID}`,
  },
    { bigNavID: 1234846478, nav: { eng: "settings", arb: "حسابي" },
    path: `/customer/settings/${systemName}/${systemID}`,
  },
    {
      bigNavID: 1166046478,
      nav: { eng: "logout", arb: "تسجيل الخروج" },
      onClick: onLogout,
    },
  ];

  const navList = [
    {
      bigNavID: 1342146478,
      nav: { eng: "home", arb: "الرئيسية" },
      path: `/customer/${systemName}/${systemID}`,
    },

    {
      bigNavID: 8944146478,
      nav: { eng: "shop", arb: "تسوق" },
      navList: [
        {
          bigNavID: 8944146400,
          nav: { eng: "shop cart", arb: "كرت التسوق" },
          path: `/customer/cart/${systemName}/${systemID}`,
        },
        {
          bigNavID: 7644146400,
          nav: {
            eng: "menu",
            arb: "كرت التسوق",
            path: `/customer/${systemName}/${systemID}`,
          },
        },
      ],
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "order", arb: "الاخبار" },
      navList: [
        {
          nav: { eng: "undelivered order", arb: "مدونتنا" },
          path: `/customer/order/${systemName}/${systemID}`,
        },
        {
          nav: { eng: "delivered orders", arb: "تفاصيل المدونة" },
          path: `/customer/orders/${systemName}/${systemID}`,
        },
      ],
    },
    {
      bigNavID: 948246478,
      nav: { eng: "table", arb: "الصفحات" },
      navList: [
        { bigNavID: 341246078, nav: { eng: "reserve table", arb: "عنا" },
      path:`/customer/reserve-table/${systemName}/${systemID}`
      },
        {
          bigNavID: 968341478,
          nav: { eng: "reserved tables", arb: "خدماتنا" },
          path:`/customer/tables/${systemName}/${systemID}`
        },
      ],
    },
    { bigNavID: 941116478, nav: { eng: "contact", arb: "تواصل معنا" } },
    { bigNavID: 2344146478, nav: { eng: "review", arb: "المنيو" },
    path:`/customer/review/${systemName}/${systemID}`
  },
  ];

  return (
    <React.Fragment>
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && systemInfo && (
        <Website
          systemInfo={JSON.parse(JSON.stringify(systemInfo))}
          editable={false}
          navList={navList}
          adminEditMode={false}
          customerEditMode={true}
          userCart={appState?.userInfo?.userCart}
          addOrderProduct={addOrderProduct}
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
      <UploadPicture open={uploadPictureOpen} handleClose={()=>setUploadPicture(false)} />
    </React.Fragment>
  );
}

export default RouteCustomer;
