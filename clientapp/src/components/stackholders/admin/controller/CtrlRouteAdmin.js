import { initialAppState, objCategoriesType } from "appHelper/appVariables";
import {
  bulkCategories,
  findCategories,
} from "appHelper/fetchapi/tblCategory/tblCategory";
import {
  findSystem,
  updateSystem,
} from "appHelper/fetchapi/tblSystem/tblSystem";

export const ctrlRouteAdmin = {
  installData: async ({
    appState,
    appDispatch,
    systemID,
    setSystemInfo,
    setIsLoading,
  }) => {
    setIsLoading(true);
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
    setIsLoading(false);
  },
  onLogout: ({ appState, appDispatch }) => {
    appState.clientInfo.blnUserLogin = false;
    appState.clientInfo = initialAppState.clientInfo;
    appState.systemInfo = initialAppState.systemInfo;
    appState.userInfo = initialAppState.userInfo;
    appDispatch({ ...appState });
  },
  onSave: async ({
    setIsLoading,
    isMenuUpdated,
    isSystemUpdated,
    appState,
    appDispatch,
    systemInfo,
  }) => {
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
      console.log(systemInfo.systemMenu);
      console.log(categoriesOnDeleteIDs);
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
      appState.systemInfo.bigSystemID = systemData?.bigSystemID;
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
    isMenuUpdated.current = false;
    isSystemUpdated.current = false;
    setIsLoading(false);
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
        bigNavID: 1166046478,
        nav: { eng: "logout", arb: "تسجيل الخروج" },
        onClick: () =>
          ctrlRouteAdmin.onLogout({
            appState: appState,
            appDispatch: appDispatch,
          }),
      },
    ];
  },
  generateAdminNavList: ({
    handleSharedLinkOpen,
    handleUploadLogoOpen,
    systemID,
    systemName,
  }) => {
    return [
      {
        bigNavID: 1234146400,
        nav: { eng: "logo picture", arb: "صورة اللوغو" },
        onClick: handleUploadLogoOpen,
      },
      {
        bigNavID: 1874146400,
        nav: { eng: "Dashboard", arb: "الداشبورد" },
        path: `/admin/dashboard/${systemName}/${systemID}`,
      },
      {
        bigNavID: 1654146400,
        nav: { eng: "settings", arb: "الاعدادات" },
        path: `/admin/settings/${systemName}/${systemID}`,
      },
      {
        bigNavID: 2354146400,
        nav: { eng: "delivery address", arb: "مواقع الدليفري" },
        path: `/admin/deliveryAddress/${systemName}/${systemID}`,
      },
      {
        bigNavID: 2554146400,
        nav: { eng: "shared link", arb: "رابط المطعم" },
        onClick: handleSharedLinkOpen,
      },
    ];
  },
  generateWebsiteNavList: ({ systemName, systemID }) => {
    return [
      {
        bigNavID: 1342146478,
        nav: { eng: "home", arb: "الرئيسية" },
        path: `/admin/${systemName}/${systemID}`,
      },

      {
        bigNavID: 8944146478,
        nav: { eng: "orders", arb: "الطلبات" },
        path: `/admin/orders/${systemName}/${systemID}`,
      },
      {
        bigNavID: 7943146478,
        nav: { eng: "tables", arb: "الطاولات" },
        path: `/admin/tables/${systemName}/${systemID}`,
      },

      {
        bigNavID: 2344146478,
        nav: { eng: "users", arb: "المستخدمين" },
        path: `/admin/users/${systemName}/${systemID}`,
      },
      {
        bigNavID: 2344146478,
        nav: { eng: "reviews", arb: "التقييمات" },
        path: `/admin/reviews/${systemName}/${systemID}`,
      },
    ];
  },
};
