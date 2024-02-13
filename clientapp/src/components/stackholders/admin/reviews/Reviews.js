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
// import { ctrlReview } from "./controller/CtrlReview";

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

function Reviews() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const initialReviews = useMemo(() => {
    return appState?.systemInfo?.lstSystemReviews || [];
  });

  const [reviews, setReviews] = useState(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reviews.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

  //   const [intRating, setIntRating] = useState(userReview?.intRating);
  //   const reviewTextEng = useRef();
  //   const reviewTextArb = useRef();

  //   const handleAdd = () => {
  //     const review = {
  //       bigUserID: appState.userInfo.bigUserID,
  //       jsnUserName: appState.userInfo.jsnFullName,
  //       intRating: Number(intRating),
  //       jsnComment: {
  //         eng: reviewTextEng.current.value,
  //         arb: reviewTextArb.current.value,
  //       },
  //       strImgPath: appState.userInfo.strImgPath,
  //       dtmReviewDate: moment(new Date()).format("YYYY-MM-DD"),
  //     };
  //     ctrlReview.addReview({
  //       appState: appState,
  //       appDispatch: appDispatch,
  //       isLoading: isLoading,
  //       setIsLoading: setIsLoading,
  //       reviews: reviews,
  //       setReviews: setReviews,
  //       review: review,
  //     });
  //   };

  //   const handleEdit = () => {
  //     const review = {
  //       bigUserID: appState.userInfo.bigUserID,
  //       jsnUserName: appState.userInfo.jsnFullName,
  //       intRating: Number(intRating),
  //       jsnComment: {
  //         eng: reviewTextEng.current.value,
  //         arb: reviewTextArb.current.value,
  //       },
  //       strImgPath: appState.userInfo.strImgPath,
  //       dtmReviewDate: moment(new Date()).format("YYYY-MM-DD"),
  //     };
  //     ctrlReview.editReview({
  //       appState: appState,
  //       appDispatch: appDispatch,
  //       isLoading: isLoading,
  //       setIsLoading: setIsLoading,
  //       reviews: reviews,
  //       setReviews: setReviews,
  //       review: review,
  //     });
  //   };

  //   const handleDelete = () => {
  //     ctrlReview.deleteReview({
  //       appState: appState,
  //       appDispatch: appDispatch,
  //       setIsLoading:setIsLoading,
  //       reviews:reviews,
  //       setReviews:setReviews,
  //       bigUserID:appState.userInfo.bigUserID,
  //     });
  //   };

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
            <Grid item xs="12">
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
                      Restaurant Reviews !
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="12" container>
              {(rowsPerPage > 0
                ? reviews.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : reviews
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
                          // color={"primary"}
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
              {!!reviews.length && (
                <Grid item xs="12" container justifyContent={"center"}>
                  <TablePagination
                    rowsPerPageOptions={[3, 5, 10, 25]}
                    count={reviews.length}
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

export default Reviews;
