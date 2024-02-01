import { lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, {
  useContext,
  useMemo,
  useState,
} from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/optionList/OptionList";
import { MoreVert } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import Checkout from "../checkout/Checkout";

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

function Cart() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const [openCheckout,setOpenCheckout] = useState(false);
  const onChangeQuantity = (product, quantity) => {
    const productIndex = appState.userInfo.userOrder.lstProduct.findIndex(
      ({ bigID }) => `${product.bigID}` === `${bigID}`
    );
    appState.userInfo.userOrder.lstProduct[productIndex] = {
      ...appState.userInfo.userOrder.lstProduct[productIndex],
      intQuantity: quantity,
    };
    appDispatch({ ...appState });
  };

  const objAppActions = {
    Edit: 7244446400,
    Delete: 8324222478,
  };
  const actionItemNavList = [
    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
  ];

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

  const totalPrice = appState?.userInfo?.userOrder?.lstProduct.reduce(
    (total, { strPrice, intQuantity }) => {
      return total + Number(strPrice) * intQuantity;
    },
    0
  );

  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ];

  const removeOrderProduct = (product) => {
    appState.userInfo.userOrder.lstProduct =
      appState.userInfo.userOrder.lstProduct.filter(
        ({ bigID }) => `${bigID}` !== `${product.bigID}`
      );
    setOrderedCategories([
      ...orderedCategories.filter(
        ({ bigID }) => `${bigID}` !== `${product.bigID}`
      ),
    ]);
    appDispatch({ ...appState });
  };

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={lstWebsiteNav}
        userNavList={userNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
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
                {orderedCategories?.map((item, index) => (
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
                        <Grid
                          item
                          xs="1"
                          container
                          justifyContent={"end"}
                          alignContent={"center"}
                          alignSelf={"flex-start"}
                          // py={2}
                          sx={{ height: "100px" }}
                        >
                          <OptionList
                            nav={""}
                            navList={actionItemNavList.map((nav) => ({
                              ...nav,
                              onClick: () => {
                                if (objAppActions["Delete"] === nav.bigNavID) {
                                  removeOrderProduct(item);
                                }
                              },
                            }))}
                            endIcon={<MoreVert />}
                            lang={appState.clientInfo.strLanguage}
                          />
                        </Grid>
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
                          xs="8"
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
                      <TextField
                        type="number"
                        InputProps={{ inputProps: { min: 1, max: 10 } }}
                        defaultValue={item.intQuantity}
                        sx={{
                          width: "100px",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: `3px solid ${App_Second_Color}`,
                              borderRadius: "10px",
                            },
                            "&:hover fieldset": {
                              border: `3px solid ${App_Second_Color}`,
                              borderRadius: "10px",
                            },
                            "&.Mui-focused fieldset": {
                              border: `3px solid ${App_Second_Color}`,
                              borderRadius: "10px",
                            },
                          },
                        }}
                        onChange={(e) => {
                          onChangeQuantity(item, e.target.value);
                        }}
                      />
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
                <TableRow
                  sx={{
                    background: "#f4fcfc",
                  }}
                >
                  <TableCell align="left" component="th" scope="row">
                    <Button
                      sx={{
                        background: "#000",
                        padding: "20px 40px",
                        borderRadius: "10px",
                        ":hover": {
                          background: App_Primary_Color,
                        },
                      }}
                    >
                      <Typography
                        color={"#fff"}
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        Apply Coupon
                      </Typography>
                    </Button>
                  </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="right">
                    <Button
                      sx={{
                        background: App_Primary_Color,
                        padding: "20px 40px",
                        borderRadius: "10px",
                        ":hover": {
                          background: "#000",
                        },
                      }}
                    >
                      <Typography
                        color={"#fff"}
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        Update Cart
                      </Typography>
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
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
                  <Grid item xs="12" p={1}>
                    <Typography
                      sx={{
                        fontSize: "25px",
                        fontWeight: "800",
                      }}
                    >
                      Apply Coupon
                    </Typography>
                  </Grid>
                  <Grid item xs="12" p={1}>
                    <TextField
                      type="text"
                      aria-readonly
                      label="Coupon Code"
                      fullWidth
                      sx={{ background: "#fff", borderRadius: "8px" }}
                    />
                  </Grid>
                  <Grid item xs="12" p={1}>
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
                    >
                      <Typography
                        color={"#fff"}
                        sx={{
                          textTransform: "capitalize",
                        }}
                      >
                        Apply Coupon
                      </Typography>
                    </Button>
                  </Grid>
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
                      Cart Totals
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
                  <Grid
                    item
                    xs="12"
                    p={1}
                    py={3}
                    container
                    justifyContent={"end"}
                  >
                    <AnimButton0001
                      label={"proceed to checkout"}
                      color={App_Primary_Color}
                      onClick={()=>setOpenCheckout(true)}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Checkout
      open={openCheckout}
      handleClose={()=>setOpenCheckout(false)}
      />
    </React.Fragment>
  );
}

export default Cart;
