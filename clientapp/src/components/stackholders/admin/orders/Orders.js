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
import { Box, Button, Grid, Icon, TableFooter, TablePagination, TextField, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert, TimeToLeave, Visibility } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { findSystemOrders, findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const instalData = async () => {
    setIsLoading(true);
    const bigSystemID= appState.systemInfo.bigSystemID;
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
      path:`/admin/orders/${systemName}/${systemID}`
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
      />
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={{ marginY: "5px" }}>
          <Grid item xs="10" container>
          <Grid
              item
              xs="12"
              px={1}
              pb={10}
              justifyContent={"center"}
              sx={{
                background: "#f4fcfc",
                height: "100px",
                marginY: "50px",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <Grid container>
                <Grid item xs="12" container px={2} justifyContent={"start"}>
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "28px",
                      fontWeight: "800",
                      color: App_Primary_Color,
                      borderBottom: "3px solid #ffd40d",
                      width: "fit-content",
                    }}
                  >
                    System Orders !
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
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
                   {(rowsPerPage > 0
                    ? orders.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : orders
                  )?.map((order) => (
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
                   {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      count={orders.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      labelDisplayedRows={({ page }) => {
                        // return `Page: ${page+1}`;
                        return (
                          <Typography sx={{ color: "#000" }}>
                            Page: {page + 1}
                          </Typography>
                        );
                      }}
                      backIconButtonProps={{
                        color: "#fff",
                      }}
                      nextIconButtonProps={{ color: "#fff" }}
                      showFirstButton={true}
                      showLastButton={true}
                      labelRowsPerPage={
                        <Typography sx={{ color: "#000" }}>Rows:</Typography>
                      }
                      sx={{
                        ".MuiTablePagination-toolbar": {
                          backgroundColor: "#f4fcfc",
                          textAlign: "center",
                        },
                        ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                          {
                            fontWeight: "800",
                          },
                        ".MuiTablePagination-input": {
                          fontWeight: "bold",
                          background: "#fff",
                          borderRadius: "10px",
                          border: "1px solid #000",
                        },
                      }}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Orders;
