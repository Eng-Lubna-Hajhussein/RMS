import { lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, Icon, TableFooter, TablePagination, TextField, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert, TimeToLeave } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import OrderTimer from "./OrderTimer/OrderTimer";
import { ctrlOrder } from "./controller/CtrlOrder";
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

function Order() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const calculateZDirection = (lat1, long1, lat2, long2) => {
    let p1 = Math.pow(Math.pow(lat1, 2) + Math.pow(long1, 2), 0.5);
    let p2 = Math.pow(Math.pow(lat2, 2) + Math.pow(long2, 2), 0.5);
    return (Math.abs(p2 - p1) * 157) / (70 / 60);
  };
  const deliveryTime = useMemo(() => {
    const coord = appState.userInfo.jsnLocation;
    const systemCoord = appState.systemInfo.jsnSystemLocation;
    let deliveryTime = calculateZDirection(
      coord.lat,
      coord.long,
      systemCoord.lat,
      systemCoord.long
    );
    return Math.round(Number(deliveryTime));
  }, []);

  const initOrderedCategories = useMemo(() => {
    return appState?.userInfo?.userOrder?.lstProduct.map((product) => {
      const category = appState.systemInfo.systemMenu.find(
        ({ bigID }) => `${product.bigID}` === `${bigID}`
      );
      return { ...product, ...category };
    });
  }, [appState?.systemInfo?.userOrder]);
  const [orderedCategories, setOrderedCategories] = useState([
    ...initOrderedCategories,
  ]);

  const [isLoading,setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderedCategories.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const totalPrice = appState?.userInfo?.userOrder?.lstProduct.reduce(
    (total, { strPrice, intQuantity }) => {
      return total + Number(strPrice) * intQuantity;
    },
    0
  );

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

  const formateTime = (seconds) => {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds - h * 3600) / 60);
    let s = Math.floor(seconds - (h * 3600 + m * 60));
    if (h < 10) {
      h = "0" + h;
    }
    if (m < 10) {
      m = "0" + m;
    }
    if (s < 10) {
      s = "0" + s;
    }
    return {h:h,m:m,s:s};
  };

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
      {isLoading&&<Typography>Loading...</Typography>}
      {!(isLoading)&&<Grid container justifyContent={"center"} sx={{ marginY: "50px" }}>
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
                    Product
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
                    Quantity
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
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {(rowsPerPage > 0
                    ? orderedCategories.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : orderedCategories
                  )?.map((item, index) => (
                  <TableRow key={item.bigID}>
                    <TableCell
                      sx={{ border: "1px solid #c4c4c4" }}
                      align="left"
                      component="th"
                      scope="row"
                    >
                      <Grid
                        container
                        sx={{ height: "fit-content" }}
                        alignContent={"center"}
                      >
                        <Grid item xs="2">
                          <Box
                            component={"img"}
                            src={item.jsnCategoryInfo.strImgPath}
                            height="100px"
                            width="100%"
                          />
                        </Grid>
                        <Grid
                          item
                          xs="9"
                          px={2}
                          container
                          justify={"start"}
                          alignContent={"center"}
                          sx={{ height: "100px" }}
                          alignSelf={"flex-start"}
                        >
                          <Grid item xs="12">
                            <Typography sx={styles.dishName}>
                              {item.jsnName[lang]}
                            </Typography>
                          </Grid>
                          <Grid item xs="12">
                            <Typography sx={styles.dishDescription}>
                              {item.jsnCategoryInfo.jsnDescription[lang]}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #c4c4c4" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <Typography
                        color={"#000"}
                        sx={{
                          fontSize: "18px",
                          fontWeight: "800",
                        }}
                      >
                        {item.intQuantity}
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid #c4c4c4" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <Typography
                        color={App_Primary_Color}
                        sx={{
                          fontSize: "20px",
                          fontWeight: "800",
                        }}
                      >
                        $
                        {Number(
                          appState.userInfo.userOrder.lstProduct[index].strPrice
                        ) *
                          appState.userInfo.userOrder.lstProduct[index]
                            .intQuantity}
                      </Typography>
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
                      count={orderedCategories.length}
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
          <Grid item xs="12" container sx={{ marginTop: "40px" }}>
            <Grid item xs="4" px={1}>
              <Paper
                sx={{
                  height: "300px",
                  width: "100%",
                  background: App_Second_Color,
                  borderRadius: "20px",
                  padding: "50px",
                  boxShadow: "none",
                }}
              >
                <Grid container sx={{ height: "100%" }} alignContent={"start"}>
                  <Grid item xs="12" p={1} container alignContent={'center'} alignItems={'center'} sx={{height:"fit-content"}}>
                  <Grid item xs='2'>
                    <TimeToLeave fontSize="large" />
                    </Grid>
                    <Grid item xs='10'> 
                    <Typography
                      sx={{
                        fontSize: "25px",
                        fontWeight: "800",
                      }}
                    >
                      Delivery Time
                    </Typography>
                    </Grid>
                    
                  </Grid>
                  <Grid item xs="12" p={1}>
                    <OrderTimer
                      deliveryTime={deliveryTime}
                      order={appState.userInfo.userOrder}
                      formateTime={formateTime}
                    />
                  </Grid>
                  {!!(orderedCategories?.length)&&<Grid item xs="12" p={1}>
                    <Button
                      sx={{
                        background: "#000",
                        padding: "20px 40px",
                        borderRadius: "10px",
                        ":hover": {
                          background: App_Primary_Color,
                        },
                      }}
                      fullWidth
                      onClick={()=>{
                        ctrlOrder.orderDelivered({
                          appDispatch:appDispatch,
                          appState:appState,
                          bigOrderID:appState?.userInfo?.userOrder?.bigOrderID,
                          setIsLoading:setIsLoading,
                          setOrderedCategories:setOrderedCategories
                        })
                      }}
                    >
                      <Typography
                        color={"#fff"}
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        Delivered
                      </Typography>
                    </Button>
                  </Grid>}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs="8" px={1}>
              <Paper
                sx={{
                  height: "500px",
                  boxShadow: "none",
                  border: `4px solid ${App_Second_Color}`,
                  borderRadius: "20px",
                  padding: "50px",
                }}
              >
                <Grid container sx={{ height: "100%" }} alignContent={"start"}>
                  <Grid item xs="12" p={1} pb={2}>
                    <Typography
                      sx={{
                        fontSize: "25px",
                        fontWeight: "800",
                      }}
                    >
                      Order Totals
                    </Typography>
                  </Grid>
                  <Grid item xs="12">
                    <Paper
                      sx={{
                        height: "250px",
                        boxShadow: "none",
                        border: `4px solid #e4e4e4`,
                        borderRadius: "20px",
                      }}
                    >
                      <Grid
                        container
                        sx={{ height: "100%" }}
                        alignContent={"center"}
                      >
                        <Grid container item xs="12" sx={{ paddingX: "50px" }}>
                          <Grid item xs="12" py={1} container>
                            <Grid
                              item
                              xs="6"
                              container
                              justifyContent={"start"}
                            >
                              <Typography
                                sx={{ fontSize: "15px", fontWeight: "800" }}
                              >
                                Sub total:
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs="6"
                              container
                              justifyContent={"flex-end"}
                            >
                              <Typography
                                sx={{ fontSize: "15px", fontWeight: "800" }}
                              >
                                ${totalPrice}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs="12" py={1} container>
                            <Grid
                              item
                              xs="6"
                              container
                              justifyContent={"start"}
                            >
                              <Typography
                                sx={{ fontSize: "15px", fontWeight: "800" }}
                              >
                                Shipping:
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs="6"
                              container
                              justifyContent={"flex-end"}
                            >
                              <Typography
                                sx={{ fontSize: "15px", fontWeight: "800" }}
                              >
                                free
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          item
                          xs="12"
                          p={2}
                          sx={{ height: "fit-content" }}
                          container
                          alignContent={"center"}
                        >
                          <Paper
                            sx={{
                              height: "80px",
                              width: "100%",
                              boxShadow: "none",
                              background: "#f4fcfc",
                              borderRadius: "20px",
                              paddingX: "20px",
                            }}
                          >
                            <Grid
                              container
                              sx={{ height: "100%", paddingX: "20px" }}
                              alignContent={"center"}
                            >
                              <Grid
                                item
                                xs="6"
                                container
                                justifyContent={"start"}
                              >
                                <Typography
                                  sx={{ fontSize: "15px", fontWeight: "800" }}
                                >
                                  Total:
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs="6"
                                container
                                justifyContent={"flex-end"}
                              >
                                <Typography
                                  sx={{ fontSize: "15px", fontWeight: "800" }}
                                >
                                  ${totalPrice}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  {!!(orderedCategories?.length)&&<Grid
                    item
                    xs="12"
                    p={1}
                    py={3}
                    container
                    justifyContent={"end"}
                  >
                    <AnimButton0001
                      label={"cancel order"}
                      color={App_Primary_Color}
                    />
                  </Grid>}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>}
    </React.Fragment>
  );
}

export default Order;
