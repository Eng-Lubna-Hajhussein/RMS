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
  columnTablecell: {
    border: "1px solid #c4c4c4",
    background: App_Primary_Color,
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
  },
  rowTablecell: {
    border: "1px solid #c4c4c4",
  },
  orderID: {
    fontSize: "14px",
    fontWeight: "800",
  },
  orderAddress: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  price: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  date: {
    fontSize: "14px",
    fontWeight: "800",
  },
  time: {
    fontSize: "14px",
    fontWeight: "800",
  },
  view: {
    fontSize: "15px",
    textTransform: "uppercase",
  },
  tablePagination: {
    ".MuiTablePagination-toolbar": {
      backgroundColor: "#f4fcfc",
      textAlign: "center",
    },
    ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
      fontWeight: "800",
    },
    ".MuiTablePagination-input": {
      fontWeight: "bold",
      background: "#fff",
      borderRadius: "10px",
      border: "1px solid #000",
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
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableCell sx={styles.columnTablecell} align="center">
              {column}
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
              <Typography sx={styles.price}>${order?.strTotalPrice}</Typography>
            </TableCell>
            <TableCell
              sx={styles.rowTablecell}
              align="center"
              component="th"
              scope="row"
            >
              <Typography sx={styles.date}>
                {moment(new Date(order?.dtmOrderDate)).format(
                  "MMM DD,YYYY"
                )}
              </Typography>
            </TableCell>
            <TableCell
              sx={styles.rowTablecell}
              align="center"
              component="th"
              scope="row"
            >
              <Typography sx={styles.time}>
                {moment(new Date(order?.dtmOrderDate)).format(
                  "hh:mm A"
                )}
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
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default OrdersInfo;
