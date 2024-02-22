import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import menuIcon from "assets/image/menu-icon.svg";
import { App_Second_Color } from "appHelper/appColor";
import { findTables } from "appHelper/fetchapi/tblReservation/tblReservation";
import moment from "moment";
import { useParams } from "react-router-dom";
import { findSystemOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import { Box, Grid, Typography } from "@mui/material";
import Box001 from "components/sharedUI/Box001/Box001";

const styles = {
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
    fontSize: {lg:"14px",xs:"10px"},
  },
  description: {
    textTransform: "capitalize",
    color: "#000",
    fontSize: {lg:"25px",xs:"14px"},
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
  container: {
    height: "fit-content",
    paddingY: { lg: "50px", xs: "10px" },
    // borderRadius: "20px",
    // padding:{lg: "20px",xs:"10px"},
  },
  systemName: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    fontSize: { lg: "30px", xs: "15px" },
  },
  systemAddress: {
    fontWeight: "700",
    fontSize: { lg: "15px", xs: "10px" },
    textTransform: "capitalize",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  fullHeight: {
    height: "100%",
  },
  subtitle: {
    borderLeft: `5px solid ${App_Second_Color}`,
    fontWeight: "600",
    px: "3px",
    textTransform: "capitalize",
  },
  locationIframe: {
    borderRadius: "10px",
  },
};

function Dashboard() {
  const { appState } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const { systemID, systemName } = useParams();
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);

  const instalData = async () => {
    setIsLoading(true);
    const systemOrders = await findSystemOrders(
      appState.systemInfo.bigSystemID
    );
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
    if (!orders?.length) {
      return "-";
    }
    const ascOrders = orders.sort((a, b) => {
      return (b.dtmOrderDate) - (a.dtmOrderDate);
    });
    return moment(new Date((ascOrders[0]?.dtmOrderDate))).format(
      "MMM DD,YYYY"
    );
  }, [orders]);

  const lastReservation = useMemo(() => {
    if (!tables?.length) {
      return "-";
    }
    const ascTables = tables.sort((a, b) => {
      return new Date(b.dtmReservationStart) - new Date(a.dtmReservationStart);
    });
    return moment(new Date(ascTables[0]?.dtmReservationStart)).format(
      "MMM DD,YYYY"
    );
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

  const statistics = [
    {
      title: "Last Order",
      description: lastOrder,
      img: menuIcon,
    },
    {
      title: "Last Reservation",
      description: lastReservation,
      img: menuIcon,
    },
    {
      title: "Total Orders",
      description: orders?.length,
      img: menuIcon,
    },
    {
      title: "Total Tables",
      description: tables?.length,
      img: menuIcon,
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
            lg="10"
            xs="12"
            px={2}
            sx={styles.container}
          >
            <Grid item xs="12" pb={1} container justifyContent={"center"}>
              <Box
                component={"img"}
                sx={styles.logo}
                src={appState?.systemInfo?.strLogoPath}
              />
            </Grid>
            <Grid item xs="12" container justifyContent={"center"}>
              <Typography component={"h3"} sx={styles.systemName}>
                {appState?.systemInfo?.jsnSystemName[lang]}
              </Typography>
            </Grid>
            <Grid item xs="12" pb={3} container justifyContent={"center"}>
              <Typography sx={styles.systemAddress}>
                {appState?.systemInfo?.jsnSystemAddress?.jsnCity[lang] +
                  ", " +
                  appState?.systemInfo?.jsnSystemAddress?.jsnCountry[lang]}
              </Typography>
            </Grid>
            <Grid item xs="12" sx={{...styles.fitContentHeight,
                    paddingY:{lg:"50px",xs:"10px"}
                  }} container justifyContent={"center"}>
              {statistics.map(({ title, description, img }, index) => (
                <Grid
                  item
                  lg="6"
                  xs={12}
                  key={index}
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={styles.fitContentHeight}
          px={2}
          pb={3}
                  
                >
                  <Box001 title={title} description={description} img={img} />
                </Grid>
              ))}
            </Grid>
            <Grid item container xs="12">
              <Grid item xs="12" container p={2}>
                <iframe
                  src={`https://maps.google.com/maps?q=${appState?.systemInfo?.jsnSystemLocation?.lat}, ${appState?.systemInfo?.jsnSystemLocation?.long}&z=15&output=embed`}
                  width="100%"
                  height="350"
                  frameborder="0"
                  style={styles.locationIframe}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Dashboard;
