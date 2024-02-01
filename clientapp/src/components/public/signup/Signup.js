import { Demo_jsnSystemInfo, lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext } from "react";
import Tabs001 from "components/sharedUI/Tabs001/Tabs001";
import SignupSystem from "./signupSystem/SignupSystem";
import SignupUser from "./signupUser/SignupUser";
import { Grid, Typography } from "@mui/material";
import { AppRegistrationSharp, FoodBank } from "@mui/icons-material";

function Signup() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const tabsContent = [
    {
      tabLabel:<Grid container justifyContent={'center'}>
      <Grid item px={1}>
        <FoodBank />
      </Grid>
      <Grid item>
      <Typography sx={{textTransform:"capitalize"}}>Restaurant</Typography>
      </Grid>
    </Grid>,
      content:<SignupSystem />
    },
    {
      tabLabel:<Grid container justifyContent={'center'}>
      <Grid item px={1}>
        <AppRegistrationSharp />
      </Grid>
      <Grid item>
      <Typography sx={{textTransform:"capitalize"}}>User</Typography>
      </Grid>
    </Grid>,
      content:<SignupUser />
    }
  ]
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={lstWebsiteNav}
        jsnSystemContact={Demo_jsnSystemInfo.jsnSystemContact}
        editable={false}
      />
      <Tabs001 tabsContent={tabsContent} />
    </React.Fragment>
  );
}

export default Signup;
