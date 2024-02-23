import React, { useContext, useEffect, useState } from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import { Grid, Typography } from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { findSystemOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import { useNavigate, useParams } from "react-router-dom";
import OrdersTable from "./ordersTable/OrdersTable";
import { ctrlRouteAdmin } from "../controller/CtrlRouteAdmin";
import UploadPicture from "components/shared/uploadPicture/UploadPicture";
import UploadLogo from "../uploadLogo/UploadLogo";
import SharedLink from "../sharedLink/SharedLink";

const styles = {
  container: {
    marginY: { lg: "50px", xs: "20px" },
  },
  itemContainer: {
    background: "#f4fcfc",
    height: "140px",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
  title: {
    textTransform: "uppercase",
    fontSize: "28px",
    fontWeight: "800",
    color: App_Primary_Color,
    borderBottom: "3px solid #ffd40d",
    width: "fit-content",
  },
  subtitle: {
    fontWeight: "800",
    textTransform: "capitalize",
  },
  arrowImg: {
    transform: "rotate(180deg)",
    height: "80px",
    width: "100%",
  },
  table: {
    minWidth: 650,
    border: "1px solid #c4c4c4",
  },
  columnTableCell: {
    border: "1px solid #c4c4c4",
    background: App_Primary_Color,
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
  },
  rowTableCell: {
    border: "1px solid #c4c4c4",
  },
  orderID: {
    fontSize: "14px",
    fontWeight: "800",
  },
  orderAddress: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  totalPrice: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  orderDate: {
    fontSize: "14px",
    fontWeight: "800",
  },
  orderTime: {
    fontSize: "14px",
    fontWeight: "800",
  },
  tableDetails: {
    fontSize: "15px",
    textTransform: "uppercase",
  },
  tablePagination: {
    ".MuiTablePagination-toolbar": {
      backgroundColor: "#f4fcfc",
      textAlign: "center",
    },
    ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
      fontWeight: "800",
    },
    ".MuiTablePagination-input": {
      fontWeight: "bold",
      background: "#fff",
      borderRadius: "10px",
      border: "1px solid #000",
    },
  },
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
  },
};

function Orders() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [uploadPictureOpen, setUploadPicture] = useState(false);
  const [uploadLogoOpen, setUploadLogo] = useState(false);
  const [sharedLinkOpen, setSharedLinkOpen] = useState(false);

  const instalData = async () => {
    setIsLoading(true);
    const bigSystemID = appState.systemInfo.bigSystemID;
    const jsnOrdersData = await findSystemOrders(bigSystemID);
    if (jsnOrdersData?.length) {
      const ordersData = jsnOrdersData.map((order) => ({
        ...order,
        lstProduct: JSON.parse(order?.lstProduct || []),
        jsnAddress: JSON.parse(order?.jsnAddress || {}),
        jsnLocation: JSON.parse(order?.jsnLocation || {}),
        jsnClientPayment: JSON.parse(order?.jsnClientPayment || {}),
        jsnClientInfo: JSON.parse(order?.jsnClientInfo || {}),
      }));
      setOrders([...ordersData]);
    }
    setIsLoading(false);
  };

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

  useEffect(() => {
    instalData();
  }, []);

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        adminNavList={adminNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
        websiteLogo={appState?.systemInfo?.strLogoPath}
      />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item lg="10" xs="12" px={2} container>
            <Grid item xs="12" px={1} container>
              <OrdersTable orders={orders} lang={lang} dir={dir} />
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

export default Orders;
