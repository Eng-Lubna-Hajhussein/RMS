import { initialAppState, objCategoriesType } from "appHelper/appVariables";
import { findCategories } from "appHelper/fetchapi/tblCategory/tblCategory";
import { findUnDeliveredOrder } from "appHelper/fetchapi/tblOrder/tblOrder";
import { findSystem } from "appHelper/fetchapi/tblSystem/tblSystem";
import moment from "moment";

export const ctrlRouteCustomer = {
  installData:async ({appState,appDispatch,systemID,setSystemInfo}) => {
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
        dtmOrderDate:userOrder.dtmOrderDate,
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
  },
  onLogout: ({ appState, appDispatch }) => {
    appState.clientInfo.blnUserLogin = false;
    appState.clientInfo = initialAppState.clientInfo;
    appState.systemInfo = initialAppState.systemInfo;
    appState.userInfo = initialAppState.userInfo;
    appDispatch({ ...appState });
  },
  generateUserNavList: ({
    handleUploadPictureOpen,
    systemName,
    systemID,
    appState,
    appDispatch,
  }) => {
    return [
      {
        bigNavID: 6774846478,
        nav: { eng: "profile picture", arb: "الصورة الشخصية" },
        onClick: handleUploadPictureOpen,
      },
      {
        bigNavID: 9974846478,
        nav: { eng: "profile", arb: "حسابي" },
        path: `/customer/profile/${systemName}/${systemID}`,
      },
      {
        bigNavID: 1234846478,
        nav: { eng: "settings", arb: "الاعدادات" },
        path: `/customer/settings/${systemName}/${systemID}`,
      },
      {
        bigNavID: 1166046478,
        nav: { eng: "logout", arb: "تسجيل الخروج" },
        onClick:()=> ctrlRouteCustomer.onLogout({
          appState: appState,
          appDispatch: appDispatch,
        }),
      },
    ];
  },
  generateWebsiteNavList:({
        systemName,systemID
  })=>{
    return [
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
                arb: "المنيو",
                path: `/customer/${systemName}/${systemID}`,
              },
            },
          ],
        },
        {
          bigNavID: 7943146478,
          nav: { eng: "order", arb: "طلبك" },
          navList: [
            {
              nav: { eng: "current order", arb: "طلبك الحالي" },
              path: `/customer/order/${systemName}/${systemID}`,
            },
            {
              nav: { eng: "orders", arb: "طلباتك" },
              path: `/customer/orders/${systemName}/${systemID}`,
            },
          ],
        },
        {
          bigNavID: 948246478,
          nav: { eng: "table", arb: "الحجوزات" },
          navList: [
            {
              bigNavID: 341246078,
              nav: { eng: "reserve table", arb: "حجز طاولة" },
              path: `/customer/reserve-table/${systemName}/${systemID}`,
            },
            {
              bigNavID: 968341478,
              nav: { eng: "reserved tables", arb: "الطاولات المحجوزة" },
              path: `/customer/tables/${systemName}/${systemID}`,
            },
          ],
        },
        {
          bigNavID: 2344146478,
          nav: { eng: "review", arb: "قيمنا" },
          path: `/customer/review/${systemName}/${systemID}`,
        },
      ]
  },
};
