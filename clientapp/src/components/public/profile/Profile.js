import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import menuIcon from "assets/image/menu-icon.svg";
import { Grid, Typography } from "@basetoolkit/ui";
import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlProfile } from "./controller/CtrlProfile";
import { ctrlRouteCustomer } from "components/stackholders/customer/controller/CtrlRouteCustomer";
import { lstWebsiteNav, objRoleID } from "appHelper/appVariables";
import Activities from "./activities/Activities";
import PersonalInfo from "./personalInfo/PersonalInfo";
import Location from "./location/Location";

const styles = {
  container: {
    height: "fit-content",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
};

function Profile() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const { systemID, systemName ,userID} = useParams();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const navigate = useNavigate();
  const [userInfo,setUserInfo] = useState();
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);
  const loggedIn = appState?.clientInfo?.blnUserLogin;
  const isAdmin = appState?.userInfo?.bigUserRoleID === objRoleID.Admin;
  const isCustomer = appState?.userInfo?.bigUserRoleID === objRoleID.Customer;

  
  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

  const userNavList = useMemo(()=>{
    if(isAdmin){
      
    }
    if(isCustomer){
      return ctrlRouteCustomer.generateUserNavList({
        appState:appState,
        appDispatch:appDispatch,
        systemName:systemName,
        systemID:systemID,
        handleUploadPictureOpen:handleUploadPictureOpen
      })
    }
    return null;
  },[]);

  const navList = useMemo(()=>{
    if(isAdmin){
      
    }
    if(isCustomer){
      return ctrlRouteCustomer.generateWebsiteNavList({
         systemID:systemID,
         systemName:systemName
      })
    }
    return lstWebsiteNav;
  },[])

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
      setUserInfo:setUserInfo,
      bigUserID:Number(userID),
      bigSystemID:Number(systemID)
    });
  }, []);

  const lastOrder = useMemo(() => {
    if (!orders?.length) {
      return "-";
    }
    const ascOrders = orders.sort((a, b) => {
      return Number(b.dtmOrderDate) - Number(a.dtmOrderDate);
    });
    return moment(new Date(Number(ascOrders[0]?.dtmOrderDate))).format(
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

  const activities = [
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
      title: "Total Reservations",
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
            xs={10}
            sx={styles.container}
          >
            <PersonalInfo userInfo={userInfo} lang={lang} />
            <Activities activities={activities} />
            <Location userInfo={userInfo} />
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Profile;
