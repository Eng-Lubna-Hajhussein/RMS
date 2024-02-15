import {
  CITIES,
  COUNTRIES,
  initialAppState,
  lstWebsiteNav,
  objAppActions,
} from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import menuIcon from "assets/image/menu-icon.svg";

import { Avatar, Box, Grid, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import {
  MoreVert,
  TimeToLeave,
  ViewAgenda,
  Visibility,
} from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import {
  findAvailableTables,
  findTables,
  findUserTables,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import bgImg from "assets/image/patron.jpg";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { findSystemOrders, findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";

const style = {
  box: {
    width: "100%",
    background: "#f4fcfc !important",
    height: "100px",
    borderRadius: "20px",
    paddingX: "20px",
  },
  title: {
    textTransform: "capitalize",
    color: "#555",
    fontSize: "14px !important",
  },
  description: {
    textTransform: "capitalize",
    color: "#000",
    fontSize: "25px !important",
    fontWeight: "800 !important",
  },
  icon: {
    padding: "18px",
    background: "#ffd40d",
    borderRadius: "10px",
  },
  logo: {
    width: "150px",
  },
};

function Dashboard() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const { systemID, systemName } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);

  const instalData = async () => {
    setIsLoading(true);
    const systemOrders = await findSystemOrders(appState.systemInfo.bigSystemID);
    if (systemOrders?.length) {
      setOrders([...systemOrders]);
    }
    const systemTables = await findTables(appState.systemInfo.bigSystemID);
    if (systemTables?.length) {
      setTables([...systemTables]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    instalData();
  }, []);

  const lastOrder = useMemo(() => {
    const ascOrders = orders.sort((a, b) => {
      return Number(b.dtmOrderDate) - Number(a.dtmOrderDate);
    });
    return ascOrders[0];
  }, [orders]);

  const lastReservation = useMemo(() => {
    const ascTables = tables.sort((a, b) => {
      return new Date(b.dtmReservationStart) - new Date(a.dtmReservationStart);
    });
    return ascTables[0];
  }, [tables]);

  const userNavList = [
    { bigNavID: 6774846478, nav: { eng: "upload picture", arb: "حسابي" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ];

  const adminNavList = [
    { bigNavID: 1234146400, nav: { eng: "upload logo", arb: "صورة اللوغو" } },
    {
      bigNavID: 3234146150,
      nav: { eng: "dashboard", arb: "داشبورد" },
    },
    { bigNavID: 7764142478, nav: { eng: "settings", arb: "الاعدادات" } },
  ];

  const navList = [
    {
      bigNavID: 1342146478,
      nav: { eng: "home", arb: "الرئيسية" },
      path: `/admin/${systemName}/${systemID}`,
    },

    {
      bigNavID: 8944146478,
      nav: { eng: "orders", arb: "تسوق" },
      path: `/admin/orders/${systemName}/${systemID}`,
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "tables", arb: "الاخبار" },
      path: `/admin/tables/${systemName}/${systemID}`,
    },

    { bigNavID: 2344146478, nav: { eng: "users", arb: "المنيو" } },
    { bigNavID: 2344146478, nav: { eng: "reviews", arb: "المنيو" } },
  ];
  const [isLoading, setIsLoading] = useState(false);
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        adminNavList={adminNavList}
        websiteLogo={appState?.systemInfo?.strLogoPath}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"}>
          <Grid
            item
            container
            justifyContent={"center"}
            xs="10"
            sx={{
              height: "fit-content",
              marginY: "50px",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            <Grid item xs="12" pb={1} container justifyContent={"center"}>
            <Box component={"img"} sx={style.logo} src={appState?.systemInfo?.strLogoPath} />
            </Grid>
            <Grid item xs="12" container justifyContent={"center"}>
              <Typography
                component={"h3"}
                sx={{
                  color: "#000",
                  textTransform: "capitalize",
                  fontWeight: "800",
                  fontSize: "30px",
                }}
              >
                {appState?.systemInfo?.jsnSystemName[lang]}
              </Typography>
            </Grid>
            <Grid item xs="12" pb={3} container justifyContent={"center"}>
              <Typography
                sx={{
                  fontWeight: "700",
                  fontSize: "15px",
                  textTransform: "capitalize",
                }}
              >
                {appState?.systemInfo?.jsnSystemAddress?.jsnCity[lang] +
                  ", " +
                  appState?.systemInfo?.jsnSystemAddress?.jsnCountry[lang]
                  }
              </Typography>
            </Grid>
            <Grid item xs="12" py={5} container justifyContent={"center"}>
            <Grid
                item
                xs="6"
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ height: "fit-content" }}
                px={2}
                pb={3}
              >
                <Box sx={style.box}>
                  <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                    sx={{ height: "100%" }}
                  >
                    <Grid item xs="10">
                      <Grid container>
                        <Grid item xs="12">
                          <Typography sx={style.title}>
                            {"Last Order"}
                          </Typography>
                        </Grid>
                        <Grid item xs="12">
                          <Typography sx={style.description}>
                            {moment(
                              new Date(Number(lastOrder?.dtmOrderDate))
                            ).format("MMM DD,YYYY")}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs="2">
                      <img src={menuIcon} style={style.icon} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs="6"
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ height: "fit-content" }}
                px={2}
                pb={3}
              >
                <Box sx={style.box}>
                  <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                    sx={{ height: "100%" }}
                  >
                    <Grid item xs="10">
                      <Grid container>
                        <Grid item xs="12">
                          <Typography sx={style.title}>
                            {"Last Reservation"}
                          </Typography>
                        </Grid>
                        <Grid item xs="12">
                          <Typography sx={style.description}>
                            {moment(
                              new Date(lastReservation?.dtmReservationStart)
                            ).format("MMM DD,YYYY")}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs="2">
                      <img src={menuIcon} style={style.icon} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs="6"
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ height: "fit-content" }}
                px={2}
                pb={3}
              >
                <Box sx={style.box}>
                  <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                    sx={{ height: "100%" }}
                  >
                    <Grid item xs="10">
                      <Grid container>
                        <Grid item xs="12">
                          <Typography sx={style.title}>
                            {"Total Orders"}
                          </Typography>
                        </Grid>
                        <Grid item xs="12">
                          <Typography sx={style.description}>
                            {orders?.length}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs="2">
                      <img src={menuIcon} style={style.icon} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs="6"
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ height: "fit-content" }}
                px={2}
                pb={3}
              >
                <Box sx={style.box}>
                  <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                    sx={{ height: "100%" }}
                  >
                    <Grid item xs="10">
                      <Grid container>
                        <Grid item xs="12">
                          <Typography sx={style.title}>
                            {"Total Tables"}
                          </Typography>
                        </Grid>
                        <Grid item xs="12">
                          <Typography sx={style.description}>
                            {tables.length}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs="2">
                      <img src={menuIcon} style={style.icon} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
             
            </Grid>
            <Grid item container xs="12">
              <Grid item xs="12" p={2}>
                <Typography
                  sx={{
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "600",
                    px: "3px",
                  }}
                >
                  Location
                </Typography>
              </Grid>
              <Grid item xs="12" container p={2}>
                <iframe
                  src={`https://maps.google.com/maps?q=${appState?.systemInfo?.jsnSystemLocation?.lat}, ${appState?.systemInfo?.jsnSystemLocation?.long}&z=15&output=embed`}
                  width="100%"
                  height="350"
                  frameborder="0"
                  style={{ borderRadius: "10px" }}
                ></iframe>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Dashboard;