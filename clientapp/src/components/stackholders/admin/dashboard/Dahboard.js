import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import menuIcon from "assets/image/menu-icon.svg";
import { App_Second_Color } from "appHelper/appColor";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, Typography } from "@basetoolkit/ui";
import Box001 from "components/sharedUI/Box001/Box001";
import { dictionary } from "appHelper/appDictionary";
import { ctrlDashboard } from "./controller/CtrlDashboard";
import { ctrlRouteAdmin } from "../controller/CtrlRouteAdmin";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import UploadLogo from "../uploadLogo/UploadLogo";
import SharedLink from "../sharedLink/SharedLink";

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
    lg: { fontSize: "14px" },
    xs: { fontSize: "14px" },
  },
  description: {
    textTransform: "capitalize",
    color: "#000",
    lg: { fontSize: "25px" },
    xs: { fontSize: "14px" },

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
    lg: {paddingY:"50px  !important"}, xs: {paddingY:"10px !important" },

  },
  systemName: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    lg: { fontSize: "30px" },
    xs: { fontSize: "20px" },
  },
  systemAddress: {
    fontWeight: "700",
    lg: { fontSize: "15px" },
    xs: { fontSize: "10px" },
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
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const { systemID, systemName } = useParams();
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const [uploadLogoOpen, setUploadLogo] = useState(false);
  const [sharedLinkOpen, setSharedLinkOpen] = useState(false);

  useEffect(() => {
    ctrlDashboard.installData({
      appState: appState,
      setIsLoading: setIsLoading,
      setOrders: setOrders,
      setTables: setTables,
    });
  }, []);

  const lastOrder = useMemo(() => {
    if (!orders?.length) {
      return "-";
    }
    const ascOrders = orders.sort((a, b) => {
      return b.dtmOrderDate - a.dtmOrderDate;
    });
    return moment(new Date(ascOrders[0]?.dtmOrderDate)).format("MMM DD,YYYY");
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

  const statistics = [
    {
      title: dictionary.system.lastOrderDate[lang],
      description: lastOrder,
      img: menuIcon,
    },
    {
      title: dictionary.system.lastReservationDate[lang],
      description: lastReservation,
      img: menuIcon,
    },
    {
      title: dictionary.system.totalOrders[lang],
      description: orders?.length,
      img: menuIcon,
    },
    {
      title: dictionary.system.totalTables[lang],
      description: tables?.length,
      img: menuIcon,
    },
  ];

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

  const handleSharedLinkOpen = () => {
    setSharedLinkOpen(true);
  };

  const handleUploadLogoOpen = () => {
    setUploadLogo(true);
  };

  const adminNavList = ctrlRouteAdmin.generateAdminNavList({
    handleSharedLinkOpen: handleSharedLinkOpen,
    handleUploadLogoOpen: handleUploadLogoOpen,
    systemID: systemID,
    systemName: systemName,
  });

  const userNavList = ctrlRouteAdmin.generateUserNavList({
    appState: appState,
    appDispatch: appDispatch,
    handleUploadPictureOpen: handleUploadPictureOpen,
    systemID: systemID,
    systemName: systemName,
  });
  const navList = ctrlRouteAdmin.generateWebsiteNavList({
    systemID: systemID,
    systemName: systemName,
  });

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
            lg={10}
            xs={12}
            px={2}
            sx={styles.container}
          >
            <Grid item xs={12} pb={1} container justifyContent={"center"}>
              <Box
                component={"img"}
                sx={styles.logo}
                src={appState?.systemInfo?.strLogoPath}
              />
            </Grid>
            <Grid item xs={12} container justifyContent={"center"}>
              <Typography component={"h3"} sx={styles.systemName}>
                {appState?.systemInfo?.jsnSystemName[lang]}
              </Typography>
            </Grid>
            <Grid item xs={12} pb={3} container justifyContent={"center"}>
              <Typography sx={styles.systemAddress}>
                {appState?.systemInfo?.jsnSystemAddress?.jsnCity[lang] +
                  ", " +
                  appState?.systemInfo?.jsnSystemAddress?.jsnCountry[lang]}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                ...styles.fitContentHeight,
                lg:{py:"50px !important"},xs:{py:"10px !important"}
              }}
              container
              justifyContent={"center"}
            >
              {statistics.map(({ title, description, img }, index) => (
                <Grid
                  item
                  lg={6}
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
      <UploadPicture
        open={uploadPictureOpen}
        handleClose={() => setUploadPicture(false)}
      />
      <UploadLogo
        open={uploadLogoOpen}
        handleClose={() => setUploadLogo(false)}
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
      />
      <SharedLink
        open={sharedLinkOpen}
        handleClose={() => setSharedLinkOpen(false)}
      />
    </React.Fragment>
  );
}

export default Dashboard;
