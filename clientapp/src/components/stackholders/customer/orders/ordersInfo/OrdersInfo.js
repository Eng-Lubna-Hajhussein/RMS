import React, { useState } from "react";
import {
  Button,
  Chip,
  Grid,
  TablePagination,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@basetoolkit/ui";
import { App_Primary_Color } from "appHelper/appColor";
import { Visibility } from "@mui/icons-material";
import moment from "moment";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    overflowX: "auto",
    marginRight: "auto",
    marginLeft: "auto",
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
  table: {},
  columnTablecell: {
    border: "1px solid #c4c4c4 !important",
    bgcolor: "primary",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
    lg: { minWidth: "160px", width: "160px" },
    xs: { minWidth: "150px", width: "150px" },
  },
  rowTablecell: {
    border: "1px solid #c4c4c4 !important",
  },
  orderID: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "10px", fontWeight: 600 },
  },
  orderAddress: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "10px", fontWeight: 600 },
    textTransform: "capitalize",
  },
  price: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "10px", fontWeight: 600 },
    textTransform: "capitalize",
  },
  date: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "10px", fontWeight: 600 },
  },
  time: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "10px", fontWeight: 600 },
  },
  view: {
    fontWeight: 800,
    lg: { fontSize: "15px" },
    xs: { fontSize: "12px" },
    textTransform: "uppercase",
  },
  tablePagination: {},
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: 800,
    lg: { fontSize: "15px" },
    xs: { fontSize: "12px" },
  },
  tableContainer: {
    marginBottom: "50px",
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

  const handleChangeRowsPerPage = ({ value }) => {
    setRowsPerPage(+value);
    setPage(0);
  };

  const columns = [
    { eng: "order id", arb: "معرف الطلب" },
    { eng: "address", arb: "العنوان" },
    { eng: "total price", arb: "السعر الكلي" },
    { eng: "order date", arb: "تاريخ الطلب" },
    { eng: "order time", arb: "وقت الطلب" },
    { eng: "status", arb: "الحالة" },
    { eng: "order details", arb: "تفاصيل الطلب" },
  ];
  return (
    <Grid item xs={12} container sx={styles.container}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={styles.columnTablecell} align="center">
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 800,
                    lg: { fontSize: "15px" },
                    xs: { fontSize: "12px" },
                  }}
                >
                  {column[lang]}
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
                    (dir === "rtl" ? "، " : ", ") +
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
              <TableCell align="center">
                <Chip
                  color={order.blnDelivered ? "success" : "error"}
                  label={
                    <Typography sx={styles.status}>
                      {order.blnDelivered
                        ? dictionary.orders.delivered[lang]
                        : dictionary.orders.onDelivery[lang]}
                    </Typography>
                  }
                />
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Button endIcon={<Visibility />}>
                  <Typography sx={styles.view} px={1}>
                    {dictionary.buttons.view[lang]}
                  </Typography>
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
      </Table>
      <Grid item xs={12} container justifyContent="end">
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
          showFirstButton={true}
          showLastButton={true}
          sx={{
            ...styles.tablePagination,
          }}
        />
      </Grid>
    </Grid>
  );
}

export default OrdersInfo;
