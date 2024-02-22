import { objAppActions } from "appHelper/appVariables";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Grid,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";

const styles = {
  container: {
    overflowX: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
  dishName: {
    fontSize: { lg: "16px !important", xs: "10px" },
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
  fitContentHeight: {
    height: "fit-content",
  },
  productInfoContainer: {
    height: { lg: "100px", xs: "50px" },
    overflowY: "auto",
  },
  price: {
    fontSize: { lg: "20px", xs: "10px" },
    fontWeight: "800",
  },
  tablePagination: {
    backgroundColor: "#f4fcfc",
    width:"100%",
    ".MuiTablePagination-toolbar": {
      backgroundColor: "#f4fcfc",
      width:"100%"
    },
    ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
      fontWeight: "800",
      fontSize: {
        lg: "16px",
        xs: "14px",
      },
    },
    ".MuiTablePagination-input": {
      fontWeight: "bold",
      background: "#fff",
      borderRadius: "10px",
      border: "1px solid #000",
    },
  },
  quantity: {
    fontSize: { lg: "18px", xs: "12px" },
    fontWeight: "800",
  },
};

function Products({ appState, orderedCategories, lang, dir }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - orderedCategories.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = ["Product", "Quantity", "Total"];
  return (
    <Grid item xs="12" container sx={styles.container}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={styles.columnTablecell} align="center">
                <Typography
                  sx={{
                    fontSize: { lg: "20px", xs: "12px" },
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
            ? orderedCategories.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : orderedCategories
          )?.map((item, index) => (
            <TableRow key={item.bigID}>
              <TableCell
                sx={{
                  ...styles.rowTablecell,
                  minWidth: { xs: "300px", lg: "500px" },
                  width: { xs: "300px", lg: "500px" },
                }}
                align="left"
                component="th"
                scope="row"
              >
                <Grid
                  container
                  item
                  xs={12}
                  sx={styles.fitContentHeight}
                  alignContent={"center"}
                >
                  <Grid item xs="2">
                    <Box
                      component={"img"}
                      src={item.jsnCategoryInfo.strImgPath}
                      sx={{ height: { lg: "100px", xs: "50px" } }}
                      width="100%"
                    />
                  </Grid>
                  <Grid
                    item
                    xs="9"
                    px={2}
                    container
                    justify={"start"}
                    alignContent={"center"}
                    sx={styles.productInfoContainer}
                    alignSelf={"flex-start"}
                  >
                    <Grid item xs="12">
                      <Typography sx={styles.dishName}>
                        {item.jsnName[lang]}
                      </Typography>
                    </Grid>
                    <Grid item xs="12">
                      <Typography sx={styles.dishDescription}>
                        {item.jsnCategoryInfo.jsnDescription[lang]}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography color={"#000"} sx={styles.quantity}>
                  {item.intQuantity}
                </Typography>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography color={App_Primary_Color} sx={styles.price}>
                  $
                  {Number(
                    appState.userInfo.userOrder.lstProduct[index].strPrice
                  ) * appState.userInfo.userOrder.lstProduct[index].intQuantity}
                </Typography>
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
              count={orderedCategories.length}
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

export default Products;
