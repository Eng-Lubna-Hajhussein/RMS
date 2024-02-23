import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  Avatar,
  Box,
  Grid,
  Rating,
  TablePagination,
  Typography,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import arrowImg from "assets/image/arrow-2.png";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  reviewBox: {
    width: "100%",
    height: "150px",
    border: `3px solid ${App_Second_Color}`,
    borderRadius: "10px",
  },
  fullHeight: {
    height: "100%",
  },
  heightFitContent: {
    height: "fit-content",
  },
  username: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  reviewDate: {
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "capitalize",
    color: "#555",
  },
  reviewComment: {
    fontSize: { lg: "14px", xs: "9px" },
    fontWeight: "800",
    textTransform: "capitalize",
    height: "80px",
    overflowX: "auto",
    paddingTop: "10px",
  },
  tablePagination: {
    // width: "fit-content",
    // padding: "0 !important",
    // margin: "0 !important",
    borderBottom: "none !important",
    "&": {
      // marginTop: theme.spacing(2),
      justifyContent: "center",
      display: "flex",
      borderBottom: "none !important",
    },
    ".MuiTablePagination-toolbar": {
      textAlign: "center",
      // border: `4px solid ${App_Primary_Color}`,
      width: "fit-content",
      padding: "2px !important",
      margin: "0 !important",
      borderRadius: "10px",
      borderBottom: "none !important",
    },
    ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
      fontWeight: "800",
    },
    ".MuiTablePagination-input": {
      fontWeight: "bold",
      background: "#fff",
      borderRadius: "10px",
      border: `3px solid ${App_Second_Color}`,
    },
    ".css-16c50h-MuiInputBase-root-MuiTablePagination-select": {
      margin: "2px",
    },
    ".MuiTablePagination-actions": {
      background: App_Primary_Color,
      borderRadius: "10px",
      margin: "4px",
    },
  },
};

function ProductReviews({ product, lang, dir }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
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
  return (
    <Grid item xs="12" container>
      {(rowsPerPage > 0
        ? product?.jsnCategoryInfo?.lstReviews?.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : product?.jsnCategoryInfo?.lstReviews
      )?.map((review, index) => (
        <Grid item xs="12" container py={1}>
          <Box sx={styles.reviewBox}>
            <Grid container sx={styles.fullHeight} p={2}>
              <Grid item xs="12" container>
                <Grid item xs="8">
                  <Grid
                    container
                    sx={styles.heightFitContent}
                    alignItems={"center"}
                    alignContent={"center"}
                  >
                    <Grid item lg={1} xs={3} sx={styles.heightFitContent}>
                      <Avatar
                        src={review?.strImgPath}
                        height="50px"
                        width="50px"
                      />
                    </Grid>
                    <Grid item lg={11} xs={9} container>
                      <Grid item xs="12">
                        <Link>
                          <Typography color={"primary"} sx={styles.username}>
                            {review?.jsnUserName[lang]}
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid item xs="12">
                        <Typography sx={styles.reviewDate}>
                          {moment(new Date(review?.dtmReviewDate)).format(
                            "MMM DD,YYYY"
                          )}
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
                <Typography sx={styles.reviewComment}>
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
              return (
                <Typography
                  dir={dir}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      xs: "14px",
                    },
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {dictionary.tablePagination.page[lang]}: {page + 1}
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
              <Typography
                dir={dir}
                sx={{
                  fontSize: {
                    lg: "16px",
                    xs: "14px",
                  },
                  fontWeight: "600",
                  textTransform: "capitalize",
                }}
              >
                {dictionary.tablePagination.rows[lang]}:
              </Typography>
            }
            sx={{...styles.tablePagination,    ".css-16c50h-MuiInputBase-root-MuiTablePagination-select": {
              marginRight: { xs: "5px", lg: dir==="rtl"? "5px":"15px" },
              marginLeft: { xs: "5px", lg:dir==="rtl"? "15px":"5px" },
            },

          }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default ProductReviews;
