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
import { ctrlReview } from "./controller/CtrlReview";

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

function Review() {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const lang = appState.clientInfo.strLanguage;
  const initialReviews = useMemo(() => {
    return appState?.systemInfo?.lstSystemReviews || [];
  });
  const userReview = useMemo(() => {
    return (
      appState?.systemInfo?.lstSystemReviews?.find(
        (review) => review.bigUserID === appState.userInfo.bigUserID
      ) || null
    );
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

  const [intRating, setIntRating] = useState(userReview?.intRating);
  const reviewTextEng = useRef();
  const reviewTextArb = useRef();

  useEffect(()=>{
    setIntRating(userReview?.intRating);
  },[userReview])

  const handleAdd = () => {
    const review = {
      bigUserID: appState.userInfo.bigUserID,
      jsnUserName: appState.userInfo.jsnFullName,
      intRating: Number(intRating),
      jsnComment: {
        eng: reviewTextEng.current.value,
        arb: reviewTextArb.current.value,
      },
      strImgPath: appState.userInfo.strImgPath,
      dtmReviewDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    ctrlReview.addReview({
      appState: appState,
      appDispatch: appDispatch,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      reviews: reviews,
      setReviews: setReviews,
      review: review,
    });
  };

  const handleEdit = () => {
    const review = {
      bigUserID: appState.userInfo.bigUserID,
      jsnUserName: appState.userInfo.jsnFullName,
      intRating: Number(intRating),
      jsnComment: {
        eng: reviewTextEng.current.value,
        arb: reviewTextArb.current.value,
      },
      strImgPath: appState.userInfo.strImgPath,
      dtmReviewDate: moment(new Date()).format("YYYY-MM-DD"),
    };
    ctrlReview.editReview({
      appState: appState,
      appDispatch: appDispatch,
      isLoading: isLoading,
      setIsLoading: setIsLoading,
      reviews: reviews,
      setReviews: setReviews,
      review: review,
    });
  };

  const handleDelete = () => {
    ctrlReview.deleteReview({
      appState: appState,
      appDispatch: appDispatch,
      setIsLoading:setIsLoading,
      reviews:reviews,
      setReviews:setReviews,
      bigUserID:appState.userInfo.bigUserID,
    });
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
                  height: "380px",
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
                      Your Review !
                    </Typography>
                  </Grid>
                  <Grid item xs="12" container justifyContent={"start"}>
                    <Grid item xs="12" container py={3}>
                      <Grid item xs="6" pb={2} px={2}>
                        <Rating
                          value={intRating}
                          onChange={(e) => setIntRating(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs="12" container>
                        <Grid item xs="6" px={2}>
                          <TextField
                            sx={{ background: "#fff", borderRadius: "5px" }}
                            variant="outlined"
                            fullWidth
                            type="text"
                            multiline
                            rows={4}
                            inputRef={reviewTextEng}
                            defaultValue={userReview?.jsnComment["eng"]}
                            label="Review English"
                          />
                        </Grid>
                        <Grid item xs="6" px={2}>
                          <TextField
                            sx={{ background: "#fff", borderRadius: "5px" }}
                            variant="outlined"
                            fullWidth
                            type="text"
                            multiline
                            rows={4}
                            defaultValue={userReview?.jsnComment["arb"]}
                            dir="rtl"
                            inputRef={reviewTextArb}
                            label="Review Arabic"
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs="12" container justifyContent={"end"} p={2}>
                        {!(userReview)&&<AnimButton0001
                          onClick={handleAdd}
                          label={"Add Review"}
                          color={App_Primary_Color}
                        />}
                        {(userReview)&&<AnimButton0001
                          onClick={handleDelete}
                          label={"Delete Review"}
                          color={App_Second_Color}
                        />}
                        {(userReview)&&<AnimButton0001
                          onClick={handleEdit}
                          label={"Edit Review"}
                          color={App_Primary_Color}
                        />}
                        
                      </Grid>
                    </Grid>
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

export default Review;
