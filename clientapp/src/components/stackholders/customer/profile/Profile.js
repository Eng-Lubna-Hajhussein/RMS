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
import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";

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
};

function Profile() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const { systemID, systemName } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);

  const instalData = async () => {
    setIsLoading(true);
    const objInputOrder = {
      bigUserID: appState.userInfo.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnOrdersData = await findUserOrders(objInputOrder);
    if (jsnOrdersData?.length) {
      const ordersData = jsnOrdersData.map((order) => ({
        ...order,
        lstProduct: JSON.parse(order?.lstProduct || []),
        jsnAddress: JSON.parse(order?.jsnAddress || {}),
        jsnLocation: JSON.parse(order?.jsnLocation || {}),
        jsnClientPayment: JSON.parse(order?.jsnClientPayment || {}),
      }));
      setOrders([...ordersData]);
    }
    const objInputTables = {
      bigUserID: appState.userInfo.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnUserTables = await findUserTables(objInputTables);
    console.log({ jsnUserTables });
    if (jsnUserTables?.length) {
      const userTables = jsnUserTables.map((table) => ({
        ...table,
        jsnClientPayment: JSON.parse(table?.jsnClientPayment || {}),
      }));
      setTables([...userTables]);
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

  console.log({ lastReservation });

  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" },
    path: `/customer/profile/${systemName}/${systemID}`,
  },
    { bigNavID: 1234846478, nav: { eng: "settings", arb: "حسابي" },
    path: `/customer/settings/${systemName}/${systemID}`,
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
  const [isLoading, setIsLoading] = useState(false);
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
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
              <Avatar
                src={appState?.userInfo?.strImgPath}
                sx={{
                  height: "200px",
                  width: "200px",
                }}
              />
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
                {appState?.userInfo?.jsnFullName[lang]}
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
                {appState?.userInfo?.jsnAddress?.jsnCity[lang] +
                  ", " +
                  appState?.userInfo?.jsnAddress?.jsnCountry[lang]}
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
                            {"Total Reservations"}
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
                  src={`https://maps.google.com/maps?q=${appState?.userInfo?.jsnLocation?.lat}, ${appState?.userInfo?.jsnLocation?.long}&z=15&output=embed`}
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

export default Profile;
