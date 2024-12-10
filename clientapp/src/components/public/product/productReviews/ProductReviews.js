import React, { useState } from "react";
import {
  Avatar,
  Box,
  Grid,
  Rating,
  TablePagination,
  Typography,
  TableCell,
  TableRow,
} from "@basetoolkit/ui";
import moment from "moment";
import { Link } from "react-router-dom";

const styles = {
  reviewBox: {
    width: "100%",
    border: (theme) => `3px solid ${theme.palette.secondary.main}`,
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
    lg: { fontSize: "14px" },
    xs: { fontSize: "9px" },
    fontWeight: "800",
    textTransform: "capitalize",
    maxHeight: "80px",
    overflowY: "auto",
  },
  tablePagination: {},
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

  const handleChangeRowsPerPage = ({ value }) => {
    setRowsPerPage(+value);
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
            <Grid container sx={styles.fullHeight} p={1}>
              <Grid item xs="12" container m={0} p={0}>
                <Grid item xs="8">
                  <Grid
                    container
                    sx={styles.heightFitContent}
                    alignItems={"center"}
                    alignContent={"center"}
                    m={0}
                    p={0}
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
                <Typography sx={styles.reviewComment} px={3}>
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
            rowsPerPageOptions={[5, 10, 25]}
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
            showFirstButton={true}
            showLastButton={true}
            sx={{
              ...styles.tablePagination,
            }}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default ProductReviews;
