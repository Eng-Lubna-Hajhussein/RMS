import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import menuIcon from "assets/image/menu-icon.svg";
import { Grid, Typography } from "@basetoolkit/ui";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlProfile } from "./controller/CtrlProfile";
import Activities from "./activities/Activities";
import Location from "./location/Location";
import PersonalInfo from "./personalInfo/PersonalInfo";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import { ctrlRouteCustomer } from "../controller/CtrlRouteCustomer";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    lg: { my: "50px" },
    xs: { my: "20px" },
  },
};

function Profile() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const { systemID, systemName } = useParams();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);

  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  useEffect(() => {
    ctrlProfile.installData({
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

  const activities = [
    {
      title: dictionary.users.lastOrderDate[lang],
      description: lastOrder,
      img: menuIcon,
    },
    {
      title: dictionary.users.lastReservationDate[lang],
      description: lastReservation,
      img: menuIcon,
    },
    {
      title: dictionary.users.totalOrders[lang],
      description: orders?.length,
      img: menuIcon,
    },
    {
      title: dictionary.users.totalReservations[lang],
      description: tables?.length,
      img: menuIcon,
    },
  ];

  const userNavList = ctrlRouteCustomer.generateUserNavList({
    appState: appState,
    appDispatch: appDispatch,
    handleUploadPictureOpen: handleUploadPictureOpen,
    systemID: systemID,
    systemName: systemName,
  });
  const navList = ctrlRouteCustomer.generateWebsiteNavList({
    systemID: systemID,
    systemName: systemName,
  });
  const [isLoading, setIsLoading] = useState(false);
  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        websiteLogo={appState?.systemInfo?.strLogoPath}
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
            <PersonalInfo appState={appState} lang={lang} />
            <Activities activities={activities} />
            <Location appState={appState} />
          </Grid>
        </Grid>
      )}
      <UploadPicture
        open={uploadPictureOpen}
        handleClose={() => setUploadPicture(false)}
      />
    </React.Fragment>
  );
}

export default Profile;
