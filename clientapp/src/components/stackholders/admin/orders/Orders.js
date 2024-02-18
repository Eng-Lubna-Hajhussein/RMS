import React, { useContext, useEffect, useState } from "react";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { findSystemOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import { useParams } from "react-router-dom";
import arrowImg from "assets/image/arrow-2.png";
import AnimationBox from "components/sharedUI/AnimationBox/AnimationBox";
import OrdersTable from "./ordersTable/OrdersTable";

const styles = {
  container: {
    marginY: "50px",
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
  const { appState } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

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
          <Grid item xs="10" container>
            {/* <Grid
              item
              xs="12"
              px={1}
              pb={10}
              justifyContent={"center"}
              sx={styles.itemContainer}
            >
              <Grid container>
                <Grid item container xs="5" px={2} justifyContent={"start"}>
                  <Grid item xs="12">
                    <Typography sx={styles.title}>
                      Restaurant Orders !
                    </Typography>
                  </Grid>
                  <Grid item xs="12">
                    <Typography sx={styles.subtitle}>{`( ${
                      orders?.length || 0
                    } Orders ) `}</Typography>
                  </Grid>
                </Grid>
                <Grid item container xs="2" justifyContent={"start"} py={2}>
                  <AnimationBox
                    animationMode="reverse"
                    easing={"ease-in"}
                    forceTrigger={true}
                    type="fadeOut"
                    trigger="manual"
                  >
                    <Box
                      component={"img"}
                      sx={styles.arrowImg}
                      src={arrowImg}
                    />
                  </AnimationBox>
                </Grid>
              </Grid>
            </Grid> */}
            <Grid item xs="12" px={1} container sx={styles.tableContainer}>
              <OrdersTable orders={orders} lang={lang} dir={dir} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Orders;
