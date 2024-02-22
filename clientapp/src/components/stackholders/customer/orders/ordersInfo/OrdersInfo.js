import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Grid,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { Visibility } from "@mui/icons-material";
import moment from "moment";

const styles = {
  container: {
    overflowX: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
  columnTablecell: {
    border: "1px solid #c4c4c4",
    background: App_Primary_Color,
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
    minWidth: { xs: "150px" },
    width: { xs: "150px" },
  },
  rowTablecell: {
    border: "1px solid #c4c4c4",
  },
  orderID: {
    fontSize: { lg: "14px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
  },
  orderAddress: {
    fontSize: { lg: "14px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
    textTransform: "capitalize",
  },
  price: {
    fontSize: { lg: "14px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
    textTransform: "capitalize",
  },
  date: {
    fontSize: { lg: "14px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
  },
  time: {
    fontSize: { lg: "14px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
  },
  view: {
    fontSize: { lg: "15px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
    textTransform: "uppercase",
  },
  tablePagination: {
    border: "1px solid #c4c4c4",
    ".MuiTablePagination-toolbar": {
      backgroundColor: "#f4fcfc",
    },
    ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
      fontWeight: "800",
    },
    ".MuiTablePagination-input": {
      fontWeight: "bold",
      background: "#fff",
      borderRadius: "10px",
      border: "1px solid #000",
      fontSize: {
        lg: "16px",
        xs: "14px",
      },
    },
  },
};

function OrdersInfo({ orders, lang, dir }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orders.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = [
    "Order ID",
    "Address",
    "Total Price",
    "Order Date",
    "Order Time",
    "Order Details",
  ];
  return (
    <Grid item xs="12" container sx={styles.container}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={styles.columnTablecell} align="center">
                <Typography
                  sx={{
                    fontSize: { lg: "15px", xs: "12px" },
                    fontWeight: { lg: "800", xs: "800" },
                  }}
                >
                  {column}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : orders
          )?.map((order) => (
            <TableRow>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography sx={styles.orderID}>#{order.bigOrderID}</Typography>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography sx={styles.orderAddress}>
                  {order?.jsnAddress?.jsnCity[lang] +
                    ", " +
                    order?.jsnAddress?.jsnCountry[lang]}
                </Typography>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography sx={styles.price}>
                  ${order?.strTotalPrice}
                </Typography>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography sx={styles.date}>
                  {moment(new Date(order?.dtmOrderDate)).format("MMM DD,YYYY")}
                </Typography>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography sx={styles.time}>
                  {moment(new Date(order?.dtmOrderDate)).format("hh:mm A")}
                </Typography>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Button endIcon={<Visibility />}>
                  <Typography sx={styles.view}>view</Typography>
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
              rowsPerPageOptions={[3, 5, 10, 25]}
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
                return (
                  <Typography
                    sx={{
                      fontSize: {
                        lg: "16px",
                        xs: "14px",
                      },
                      fontWeight: "600",
                    }}
                  >
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
                <Typography
                  sx={{
                    fontSize: {
                      lg: "16px",
                      xs: "14px",
                    },
                    fontWeight: "600",
                  }}
                >
                  Rows:
                </Typography>
              }
              sx={styles.tablePagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Grid>
  );
}

export default OrdersInfo;
