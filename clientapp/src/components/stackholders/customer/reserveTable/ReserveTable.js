import React, { useContext, useEffect, useRef, useState } from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import { Grid, Typography } from "@mui/material";
import Checkout from "./checkout/Checkout";
import { useNavigate, useParams } from "react-router-dom";
import { ctrlReserveTable } from "./controller/ctrlReserveTable";
import AvailableTables from "./availableTables/AvailableTables";
import Reservation from "./reservation/Reservation";
import { ctrlRouteCustomer } from "../controller/CtrlRouteCustomer";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";

const styles = {
  container: {
    marginY: { lg: "50px", xs: "20px" },
  },
};

function ReserveTable() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const navigate = useNavigate();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const [tables, setTables] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [tableOnAction, setTableOnAction] = useState();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!appState.clientInfo.blnUserLogin) {
      navigate(`/${systemName}/${systemID}`);
    }
  }, [appState.clientInfo.blnUserLogin]);

  const handleUploadPictureOpen = () => {
    setUploadPicture(true);
  };

  const [reservationHours, setReservationHours] = useState(1);
  const startDate = useRef();
  const startTime = useRef();
  const endDate = useRef();
  const endTime = useRef();

  useEffect(() => {
    ctrlReserveTable.installData({
      appState: appState,
      setIsLoading: setIsLoading,
      setTables: setTables,
    });
  }, []);

  const handleReverseTable = (table) => {
    setTableOnAction({ ...table });
    setOpenCheckout(true);
  };

  const onChangeReservationHours = (e) => {
    setReservationHours(e.target.value);
  };

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
      {isLoading && <Typography>loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item lg="10" xs="12" px={2} container>
            <Reservation
              dir={dir}
              endDate={endDate}
              endTime={endTime}
              lang={lang}
              reservationHours={reservationHours}
              onChangeReservationHours={onChangeReservationHours}
              startDate={startDate}
              startTime={startTime}
            />
            <AvailableTables
              dir={dir}
              handleReverseTable={handleReverseTable}
              lang={lang}
              tables={tables}
            />
          </Grid>
        </Grid>
      )}
      <Checkout
        open={openCheckout}
        table={tableOnAction}
        startDate={startDate}
        startTime={startTime}
        endDate={endDate}
        endTime={endTime}
        handleClose={() => setOpenCheckout(false)}
        setTables={setTables}
        tables={tables}
      />
       <UploadPicture
        open={uploadPictureOpen}
        handleClose={() => setUploadPicture(false)}
      />
    </React.Fragment>
  );
}

export default ReserveTable;
