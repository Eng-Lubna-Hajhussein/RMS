import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Chip,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { Visibility } from "@mui/icons-material";
import moment from "moment";

const styles = {
  container: {
    marginY: "5px",
  },
  itemContainer: {
    background: "#f4fcfc",
    height: "140px",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
  title: {
    textTransform: "uppercase",
    fontSize: "28px",
    fontWeight: "800",
    color: App_Primary_Color,
    borderBottom: "3px solid #ffd40d",
    width: "fit-content",
  },
  subtitle: {
    fontWeight: "800",
    textTransform: "capitalize",
  },
  arrowImg: {
    transform: "rotate(180deg)",
    height: "80px",
    width: "100%",
  },
  table: {
    minWidth: 650,
    border: "1px solid #c4c4c4",
  },
  columnTableCell: {
    border: "1px solid #c4c4c4",
    background: App_Primary_Color,
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
  },
  rowTableCell: {
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
  totalPrice: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  orderDate: {
    fontSize: "14px",
    fontWeight: "800",
  },
  orderTime: {
    fontSize: "14px",
    fontWeight: "800",
  },
  tableDetails: {
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
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
  },
  tableContainer: {
    marginBottom: "50px",
  },
};

function OrdersTable({ orders, lang, dir }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    "Status",
    "Order Details",
  ];
  return (
    <Table sx={styles.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns.map((column, index) => (
            <TableCell sx={styles.columnTableCell} align="center">
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
              sx={styles.rowTableCell}
              align="center"
              component="th"
              scope="row"
            >
              <Typography sx={styles.orderID}>#{order.bigOrderID}</Typography>
            </TableCell>
            <TableCell
              sx={styles.rowTableCell}
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
              sx={styles.rowTableCell}
              align="center"
              component="th"
              scope="row"
            >
              <Typography sx={styles.totalPrice}>
                ${order?.strTotalPrice}
              </Typography>
            </TableCell>
            <TableCell
              sx={styles.rowTableCell}
              align="center"
              component="th"
              scope="row"
            >
              <Typography sx={styles.orderDate}>
                {moment(new Date(Number(order?.dtmOrderDate))).format(
                  "MMM DD,YYYY"
                )}
              </Typography>
            </TableCell>
            <TableCell
              sx={styles.rowTableCell}
              align="center"
              component="th"
              scope="row"
            >
              <Typography sx={styles.orderTime}>
                {moment(new Date(Number(order?.dtmOrderDate))).format(
                  "hh:mm A"
                )}
              </Typography>
            </TableCell>
            <TableCell>
              <Chip
                color={order.blnDelivered ? "success" : "error"}
                label={
                  <Typography sx={styles.status}>
                    {order.blnDelivered ? "Delivered" : "On Delivery"}
                  </Typography>
                }
              />
            </TableCell>
            <TableCell
              sx={styles.rowTableCell}
              align="center"
              component="th"
              scope="row"
            >
              <Button endIcon={<Visibility />}>
                <Typography sx={styles.tableDetails}>view</Typography>
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
            rowsPerPageOptions={[5, 10, 25]}
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

export default OrdersTable;
