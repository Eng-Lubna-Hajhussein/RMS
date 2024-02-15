import { lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert, TimeToLeave } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import {
  findAvailableTables,
  findTables,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import bgImg from "assets/image/patron.jpg";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import arrowImg from "assets/image/arrow-2.png";
// import { ctrlReview } from "./controller/CtrlProduct";

const styles = {
  dishName: {
    fontSize: { lg: "16px !important", xs: "9px" },
    fontWeight: "800 !important",
    color: "#000",
    fontFamily: "sans-serif",
  },
  saleBox: {
    backgroundColor: "#ffd40d !important",
    borderRadius: "50% !important",
    width: "60px",
    height: "60px",
    // position: "absolute",
    // textAlign: "center",
    // top: "9px",
    // left: "15px",
    // zIndex: "111",
  },
  saleTitle: {
    color: "#000",
    fontSize: "18px !important",
    fontWeight: "800 !important",
  },
  dishDescription: {
    fontSize: { lg: "18px !important", xs: "9px" },
    fontWeight: "400 !important",
    color: "#555",
    fontFamily: "Epilogue",
    lineHeight: { lg: "30px !important", xs: "20px" },
  },
  price: {
    fontSize: "32px",
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "#555",
  },
  salePrice: {
    textDecoration: "line-through",
    fontSize: "24px",
    fontWeight: "800",
    fontFamily: "sans-serif",
    color: "#555",
  },
};

function Product() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const { productID } = useParams();
  const productInitial = useMemo(() => {
    return appState.systemInfo.systemMenu.find(
      ({ bigID }) => Number(bigID) === Number(productID)
    );
  }, []);
  const [product, setProduct] = useState(productInitial);

  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            product?.jsnCategoryInfo?.lstReviews?.length
        )
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    { bigNavID: 5674846478, nav: { eng: "settings", arb: "الاعدادات" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ];
  const navList = [
    { bigNavID: 1342146478, nav: { eng: "home", arb: "الرئيسية" } },

    {
      bigNavID: 8944146478,
      nav: { eng: "shop", arb: "تسوق" },
      navList: [
        { bigNavID: 8944146400, nav: { eng: "shop cart", arb: "كرت التسوق" } },
        { bigNavID: 6944146478, nav: { eng: "cart checkout", arb: "الحساب" } },
      ],
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "order", arb: "الاخبار" },
      navList: [
        { nav: { eng: "undelivered order", arb: "مدونتنا" } },
        { nav: { eng: "delivered orders", arb: "تفاصيل المدونة" } },
      ],
    },
    {
      bigNavID: 948246478,
      nav: { eng: "table", arb: "الصفحات" },
      navList: [
        { bigNavID: 341246078, nav: { eng: "reserve table", arb: "عنا" } },
        {
          bigNavID: 968341478,
          nav: { eng: "reserved tables", arb: "خدماتنا" },
        },
      ],
    },
    { bigNavID: 941116478, nav: { eng: "contact", arb: "تواصل معنا" } },
    { bigNavID: 2344146478, nav: { eng: "review", arb: "المنيو" } },
  ];

  const userReview = useMemo(() => {
    return (
      product?.jsnCategoryInfo?.lstReviews?.find(
        (review) => review.bigUserID === appState.userInfo.bigUserID
      ) || null
    );
  }, [product]);
  const [intRating, setIntRating] = useState(userReview?.intRating);
  const reviewTextEng = useRef();
  const reviewTextArb = useRef();

  useEffect(() => {
    setIntRating(userReview?.intRating);
  }, [userReview]);

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
        <Grid container justifyContent={"center"} sx={{ marginY: "5px" }}>
          <Grid item xs="10" container>
            <Grid item xs="12" container sx={{ marginY: "50px" }}>
              <Grid item xs="4" px={4}>
                <Box
                  sx={{
                    height: "430px",
                    width: "100%",
                    border: `4px solid ${App_Second_Color}`,
                    borderRadius: "20px",
                  }}
                >
                  <Grid
                    container
                    sx={{ height: "100%" }}
                    justifyContent={"center"}
                    p={2}
                  >
                    <Grid item xs="12">
                      {product?.jsnCategoryInfo?.blnOnSale && (
                        <Box sx={styles.saleBox}>
                          <Grid
                            container
                            sx={{ height: "100%" }}
                            justifyContent={"center"}
                            alignContent={"center"}
                          >
                            <Typography sx={styles.saleTitle}>Sale</Typography>
                          </Grid>
                        </Box>
                      )}
                    </Grid>
                    <Grid item xs="12" container justifyContent={"center"}>
                      <Box
                        src={product?.jsnCategoryInfo?.strImgPath}
                        component={"img"}
                        sx={{
                          height: "300px",
                          width: "250px",
                          padding: "50px 30px",
                          background: App_Primary_Color,
                          borderRadius: "20px",
                          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs="8"
                px={4}
                container
                alignContent={"start"}
                justifyContent={"end"}
              >
                <Grid item xs="12" container>
                  <Grid item>
                    <Rating
                      readOnly
                      value={Number(product?.jsnCategoryInfo?.intRating)}
                    />
                  </Grid>
                  <Grid item px={3}>
                    <Typography sx={{ fontWeight: "800" }}>{`( ${
                      product?.jsnCategoryInfo?.lstReviews?.length || 0
                    } Reviews ) `}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs="12" container>
                  <Grid
                    item
                    xs="12"
                    px={1}
                    pb={10}
                    justifyContent={"center"}
                    sx={{
                      background: "#f4fcfc",
                      height: "345px",
                      marginY: "50px",
                      borderRadius: "20px",
                      padding: "20px",
                    }}
                  >
                    <Grid item xs="12">
                      <Typography
                        sx={{
                          color: "#000",
                          fontSize: "40px",
                          fontWeight: "800",
                        }}
                      >
                        {product?.jsnName[lang]}
                      </Typography>
                    </Grid>
                    <Grid item xs="12">
                      <Typography
                        sx={{
                          fontWeight: "800",
                        }}
                      >
                        {product?.jsnCategoryInfo?.jsnDescription[lang]}
                      </Typography>
                    </Grid>
                    <Grid item xs="12" container>
                      <Grid item>
                        <Typography sx={styles.price}>
                          $
                          {product?.jsnCategoryInfo?.blnOnSale
                            ? product?.jsnCategoryInfo?.strSalePrice
                            : product?.jsnCategoryInfo?.strPrice}
                        </Typography>
                      </Grid>
                      <Grid item>
                        {product?.jsnCategoryInfo?.blnOnSale && (
                          <Typography
                            component={"caption"}
                            px-1
                            sx={styles.salePrice}
                          >
                            ${product?.jsnCategoryInfo?.strPrice}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Grid item xs="12" container p={2}>
                      <Box
                        component={"img"}
                        sx={{
                          transform: "rotate(180deg)",
                          height: "150px",
                          width: "200px",
                        }}
                        src={arrowImg}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs="12" container>
              {(rowsPerPage > 0
                ? product?.jsnCategoryInfo?.lstReviews?.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : product?.jsnCategoryInfo?.lstReviews
              )?.map((review, index) => (
                <Grid item xs="12" container py={1}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "150px",
                      border: `3px solid ${App_Second_Color}`,
                      borderRadius: "10px",
                    }}
                  >
                    <Grid container sx={{ height: "100%" }} p={2}>
                      <Grid item xs="12" container>
                        <Grid item xs="8">
                          <Grid
                            container
                            sx={{ height: "fit-content" }}
                            alignItems={"center"}
                            alignContent={"center"}
                          >
                            <Grid item xs={1} sx={{ height: "fit-content" }}>
                              <Avatar
                                src={review?.strImgPath}
                                height="50px"
                                width="50px"
                              />
                            </Grid>
                            <Grid item xs={11} container>
                              <Grid item xs="12">
                                <Link>
                                  <Typography
                                    color={"primary"}
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: "800",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {review?.jsnUserName[lang]}
                                  </Typography>
                                </Link>
                              </Grid>
                              <Grid item xs="12">
                                <Typography
                                  // color={"inherit"}
                                  sx={{
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    textTransform: "capitalize",
                                    color: "#555",
                                  }}
                                >
                                  {moment(
                                    new Date(review?.dtmReviewDate)
                                  ).format("MMM DD,YYYY")}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs="4" container justifyContent={"end"}>
                          <Rating value={review?.intRating} readOnly />
                        </Grid>
                      </Grid>
                      <Grid item xs="12" px={1} container>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                            textTransform: "capitalize",
                          }}
                        >
                          {review?.jsnComment[lang]}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
              {!!product?.jsnCategoryInfo?.lstReviews?.length && (
                <Grid item xs="12" container justifyContent={"center"}>
                  <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25]}
                    count={product?.jsnCategoryInfo?.lstReviews?.length}
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
                        // backgroundColor: "#f4fcfc",
                        textAlign: "center",
                        border: `4px solid ${App_Primary_Color}`,
                        borderRadius: "10px",
                      },
                      ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                        {
                          fontWeight: "800",
                        },
                      ".MuiTablePagination-input": {
                        fontWeight: "bold",
                        background: "#fff",
                        borderRadius: "10px",
                        border: `3px solid ${App_Second_Color}`,
                      },
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Product;
