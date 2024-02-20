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
    height: "100px",
  },
  price: {
    fontSize: "20px",
    fontWeight: "800",
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
  quantity: {
    fontSize: "18px",
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
          ? orderedCategories.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
          : orderedCategories
        )?.map((item, index) => (
          <TableRow key={item.bigID}>
            <TableCell
              sx={styles.rowTablecell}
              align="left"
              component="th"
              scope="row"
            >
              <Grid
                container
                sx={styles.fitContentHeight}
                alignContent={"center"}
              >
                <Grid item xs="2">
                  <Box
                    component={"img"}
                    src={item.jsnCategoryInfo.strImgPath}
                    height="100px"
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
            rowsPerPageOptions={[3,5, 10, 25]}
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

export default Products;
