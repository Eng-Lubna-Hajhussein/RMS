import { Demo_jsnSystemInfo, lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext } from "react";
import Tabs001 from "components/sharedUI/Tabs001/Tabs001";
import SignupSystem from "./signupSystem/SignupSystem";
import SignupUser from "./signupUser/SignupUser";
import { Grid, SvgIcon, Typography } from "@basetoolkit/ui";
import { AppRegistrationSharp, FoodBank } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { dictionary } from "appHelper/appDictionary";

function Signup() {
  const { appState } = useContext(AppContext);
  const { systemID } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const tabsContent = [
    {
      tabLabel: (
        <Grid container justifyContent={"center"} alignItems="center">
          <Grid item px={1}>
            <SvgIcon icon="food_bank" variant="filled" color="text.secondary" />
          </Grid>
          <Grid item>
            <Typography sx={{ textTransform: "capitalize"}}>
              {dictionary.signup.restaurant[lang]}
            </Typography>
          </Grid>
        </Grid>
      ),
      content: <SignupSystem />,
    },
    {
      tabLabel: (
        <Grid container justifyContent={"center"}  alignItems="center">
          <Grid item px={1}>
            <SvgIcon icon="app_registration" color="text.secondary" />
          </Grid>
          <Grid item>
            <Typography sx={{ textTransform: "capitalize" }}>
            {dictionary.signup.user[lang]}
            </Typography>
          </Grid>
        </Grid>
      ),
      content: <SignupUser />,
    },
  ];
  const userNavList = [
    {
      bigNavID: 1342146478,
      nav: { eng: "login", arb: "تسجيل الدخول" },
      path:  "/login",
    },
    {
      bigNavID: 2344146478,
      nav: { eng: "register", arb: "تسجيل حساب" },
      path: "/signup",
    },
  ];
  return (
    <React.Fragment>
     {!systemID&&<WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={lstWebsiteNav}
        jsnSystemContact={Demo_jsnSystemInfo.jsnSystemContact}
        websiteLogo={Demo_jsnSystemInfo?.strLogoPath}
        userNavList={userNavList}
        editable={false}
      />}
      {!systemID && <Tabs001 tabsContent={tabsContent} />}
      {systemID && <SignupUser />}
    </React.Fragment>
  );
}

export default Signup;
