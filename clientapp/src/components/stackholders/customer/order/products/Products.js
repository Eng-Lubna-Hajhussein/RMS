import React, { useState } from "react";
import {
  Box,
  Grid,
  TablePagination,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@basetoolkit/ui";

const styles = {
  container: {
    overflowX: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
  dishName: {
    lg: { fontSize: "16px !important" },
    xs: { fontSize: "10px" },
    fontWeight: "800 !important",
    color: "#000",
    fontFamily: "sans-serif",
  },
  dishDescription: {
    fontWeight: "400 !important",
    color: "#555",
    fontFamily: "Epilogue",
    lg: { fontSize: "18px !important", lineHeight: "30px !important" },
    xs: { fontSize: "9px", lineHeight: "20px" },
  },
  columnTablecell: {
    border: "1px solid #c4c4c4 !important",
    bgcolor: "primary",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
  },
  rowTablecell: {
    border: "1px solid #c4c4c4 !important",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  productInfoContainer: {
    lg: { maxHeight: "120px" },
    xs: { maxHeight: "50px" },
    overflowY: "auto",
  },
  price: {
    lg: { fontSize: "20px" },
    xs: { fontSize: "10px" },
    fontWeight: "800",
  },
  tablePagination: {},
  quantity: {
    lg: { fontSize: "18px" },
    xs: { fontSize: "12px" },
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

  const handleChangeRowsPerPage = ({ value }) => {
    setRowsPerPage(+value);
    setPage(0);
  };

  const columns = [
    { eng: "product", arb: "الطلب" },
    { eng: "quantity", arb: "الكمية" },
    { eng: "total", arb: "المجموع" },
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
                    lg: { fontSize: "20px" },
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
                  lg: {
                    width: "500px",
                    minWidth: "500px",
                  },
                  xs: { width: "300px", minWidth: "300px" },
                }}
                align={dir === "ltr" ? "left" : "right"}
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
                  <Grid item xs={2}>
                    <Box
                      component={"img"}
                      src={item.jsnCategoryInfo.strImgPath}
                      sx={{
                        lg: { height: "100px" },
                        xs: { height: "50px" },
                      }}
                      width="100%"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={9}
                    px={2}
                    container
                    justify={"start"}
                    alignContent={"center"}
                    sx={styles.productInfoContainer}
                    alignSelf={"start"}
                  >
                    <Grid item xs={12} p={0} m={0}>
                      <Typography sx={styles.dishName}>
                        {item.jsnName[lang]}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} p={0} m={0}>
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
                <Typography color={"primary"} sx={styles.price}>
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
      </Table>
      <Grid item xs={12} container justifyContent="end">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
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

export default Products;
