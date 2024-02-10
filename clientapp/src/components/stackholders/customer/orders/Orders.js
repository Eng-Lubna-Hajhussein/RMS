import { lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, Icon, TextField, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert, TimeToLeave, Visibility } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import moment from "moment";
import { useParams } from "react-router-dom";

const styles = {
  dishName: {
    fontSize: { lg: "16px !important", xs: "9px" },
    fontWeight: "800 !important",
    color: "#000",
    fontFamily: "sans-serif",
  },
  dishDescription: {
    fontSize: { lg: "18px !important", xs: "9px" },
    fontWeight: "400 !important",
    color: "#555",
    fontFamily: "Epilogue",
    lineHeight: { lg: "30px !important", xs: "20px" },
  },
};

function Orders() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;

  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const instalData = async () => {
    setIsLoading(true);
    const objInput = {
      bigUserID: appState.userInfo.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnOrdersData = await findUserOrders(objInput);
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
    setIsLoading(false);
  };

  const userNavList = [
    {
      bigNavID: 9974846478,
      nav: { eng: "profile", arb: "حسابي" },
      path: `/customer/profile/${systemName}/${systemID}`,
    },
    {
      bigNavID: 1234846478,
      nav: { eng: "settings", arb: "حسابي" },
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
        {
          bigNavID: 341246078,
          nav: { eng: "reserve table", arb: "عنا" },
          path: `/customer/reserve-table/${systemName}/${systemID}`,
        },
        {
          bigNavID: 968341478,
          nav: { eng: "reserved tables", arb: "خدماتنا" },
          path: `/customer/tables/${systemName}/${systemID}`,
        },
      ],
    },
    { bigNavID: 941116478, nav: { eng: "contact", arb: "تواصل معنا" } },
    {
      bigNavID: 2344146478,
      nav: { eng: "review", arb: "المنيو" },
      path: `/customer/review/${systemName}/${systemID}`,
    },
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
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={{ marginY: "50px" }}>
          <Grid item xs="10" container>
            <Grid item xs="12" px={1}>
              <Table
                sx={{ minWidth: 650, border: "1px solid #c4c4c4" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Order ID
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Address
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Total Price
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Order Date
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Order Time
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Order Details
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders?.map((order) => (
                    <TableRow>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                          }}
                        >
                          #{order.bigOrderID}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                            textTransform: "capitalize",
                          }}
                        >
                          {order?.jsnAddress?.jsnCity[lang] +
                            ", " +
                            order?.jsnAddress?.jsnCountry[lang]}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                            textTransform: "capitalize",
                          }}
                        >
                          ${order?.strTotalPrice}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                          }}
                        >
                          {moment(new Date(Number(order?.dtmOrderDate))).format(
                            "MMM DD,YYYY"
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                          }}
                        >
                          {moment(new Date(Number(order?.dtmOrderDate))).format(
                            "hh:mm A"
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Button endIcon={<Visibility />}>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              textTransform: "uppercase",
                            }}
                          >
                            view
                          </Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Orders;
