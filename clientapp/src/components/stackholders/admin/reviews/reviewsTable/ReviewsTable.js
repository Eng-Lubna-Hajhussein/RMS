import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const styles = {
  reviewBox: {
    width: "100%",
    height: "150px",
    border: `3px solid ${App_Second_Color}`,
    borderRadius: "10px",
  },
  username: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  fullHeight: {
    height: "100%",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  reviewDate: {
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "capitalize",
    color: "#555",
  },
  reviewComment: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  tablePagination: {
    ".MuiTablePagination-toolbar": {
      textAlign: "center",
      border: `4px solid ${App_Primary_Color}`,
      borderRadius: "10px",
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
  },
};

function ReviewsTable({ reviews, lang, dir }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reviews.length) : 0;

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
        ? reviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : reviews
      )?.map((review, index) => (
        <Grid item xs="12" container py={1}>
          <Box sx={styles.reviewBox}>
            <Grid container sx={styles.fullHeight} p={2}>
              <Grid item xs="12" container>
                <Grid item xs="8">
                  <Grid
                    container
                    sx={styles.fitContentHeight}
                    alignItems={"center"}
                    alignContent={"center"}
                  >
                    <Grid item xs={1} sx={styles.fitContentHeight}>
                      <Avatar
                        src={review?.strImgPath}
                        height="50px"
                        width="50px"
                      />
                    </Grid>
                    <Grid item xs={11} container>
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
              return <Typography>Page: {page + 1}</Typography>;
            }}
            backIconButtonProps={{
              color: "#fff",
            }}
            nextIconButtonProps={{ color: "#fff" }}
            showFirstButton={true}
            showLastButton={true}
            labelRowsPerPage={<Typography>Rows:</Typography>}
            sx={styles.tablePagination}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default ReviewsTable;
