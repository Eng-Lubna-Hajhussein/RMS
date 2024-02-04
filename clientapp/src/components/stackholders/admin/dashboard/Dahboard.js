import { lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import { useContext } from "react";

function Dashboard(){
    const { appState, appDispatch } = useContext(AppContext);
    // const lang = appState.clientInfo.strLanguage;
    const lstDashboardNav = [
        { bigNavID: 3844146478, nav: { eng: "reservations", arb: "المنيو" } },
        { bigNavID: 5342146478, nav: { eng: "statistics", arb: "الرئيسية" } },
        { bigNavID: 1344146478, nav: { eng: "users", arb: "المنيو" } },
        { bigNavID: 3342146478, nav: { eng: "orders", arb: "الرئيسية" } },
        { bigNavID: 9344146478, nav: { eng: "messages", arb: "المنيو" } },
        // { bigNavID: 7744146478, nav: { eng: "settings", arb: "المنيو" } },
      ];
    return <>
          <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={lstDashboardNav}
        userNavList={null}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      /></>
}

export default Dashboard;