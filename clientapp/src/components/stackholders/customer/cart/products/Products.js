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
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert } from "@mui/icons-material";

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
    paddingRight: 4,
    paddingLeft: 5,
  },
  rowTablecell: {
    border: "1px solid #c4c4c4",
    paddingRight: 4,
    paddingLeft: 5,
  },
  fitContentHeight: {
    height: "fit-content",
  },
  fullHeight: {
    height: "100%",
  },
  productInfoContainer: {
    height: { lg: "100px", xs: "50px" },
    overflowY: "auto",
  },
  optionListContainer: {
    height: { lg: "100px", xs: "50px" },
    overflowY: "auto",
  },
  productNum: {
    width: { lg: "100px", xs: "60px" },

    "& .MuiOutlinedInput-root": {
      fontSize: { lg: "20px", xs: "10px" },
      fontWeight: { lg: "800", xs: "600" },
      "& fieldset": {
        border: `3px solid ${App_Second_Color}`,
        borderRadius: "10px",
      },
      "&:hover fieldset": {
        border: `3px solid ${App_Second_Color}`,
        borderRadius: "10px",
      },
      "&.Mui-focused fieldset": {
        border: `3px solid ${App_Second_Color}`,
        borderRadius: "10px",
      },
    },
  },
  price: {
    fontSize: { lg: "20px", xs: "10px" },
    fontWeight: "800",
  },
  actionsRow: {
    background: "#f4fcfc",
    border: "1px solid #c4c4c4",
  },
  menuBtn: {
    background: App_Primary_Color,
    padding: { lg: "20px 40px", xs: "15px 18px" },
    borderRadius: "10px",
    ":hover": {
      background: "#000",
    },
  },
  menuBtnLabel: {
    textTransform: "capitalize",
    fontSize: { lg: "18px", xs: "12px" },
  },
  discardBtn: {
    background: "#000",
    padding: { lg: "20px 40px", xs: "15px 18px" },
    borderRadius: "10px",
    ":hover": {
      background: App_Primary_Color,
    },
  },
  discardBtnLabel: {
    textTransform: "capitalize",
    fontSize: { lg: "18px", xs: "12px" },
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

function Products({
  orderedCategories,
  onChangeQuantity,
  removeOrderProduct,
  handleCartDiscard,
  lang,
  appState,
  dir,
}) {
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
  const actionItemNavList = [
    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
  ];
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
          {!!orderedCategories?.length &&
            (rowsPerPage > 0
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
                    minWidth: { xs: "350px", lg: "600px" },
                    width: { xs: "350px", lg: "600px" },
                  }}
                  align="left"
                  component="th"
                  scope="row"
                >
                  <Grid
                    container
                    sx={{ height: "fit-content" }}
                    alignContent={"center"}
                  >
                    <Grid
                      item
                      xs="1"
                      container
                      justifyContent={"end"}
                      alignContent={"center"}
                      alignSelf={"flex-start"}
                      sx={styles.optionListContainer}
                    >
                      <OptionList
                        nav={""}
                        navList={actionItemNavList.map((nav) => ({
                          ...nav,
                          onClick: () => {
                            if (objAppActions["Delete"] === nav.bigNavID) {
                              removeOrderProduct(item);
                            }
                          },
                        }))}
                        endIcon={<MoreVert />}
                        lang={appState.clientInfo.strLanguage}
                      />
                    </Grid>
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
                  <TextField
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    defaultValue={item.intQuantity}
                    sx={styles.productNum}
                    onChange={(e) => {
                      onChangeQuantity(item, e.target.value);
                    }}
                  />
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
                      appState?.userInfo?.userCart?.lstProduct[index]?.strPrice
                    ) *
                      appState?.userInfo?.userCart?.lstProduct[index]
                        ?.intQuantity}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          <TableRow sx={styles.actionsRow}>
            <TableCell colSpan={2} align="left" component="th" scope="row">
              <Button sx={styles.menuBtn}>
                <Typography color={"#fff"} sx={styles.menuBtnLabel}>
                  Back To Menu
                </Typography>
              </Button>
            </TableCell>
            <TableCell colSpan={3} align="right" component="th" scope="row">
              <Button sx={styles.discardBtn} onClick={handleCartDiscard}>
                <Typography color={"#fff"} sx={styles.discardBtnLabel}>
                  Discard
                </Typography>
              </Button>
            </TableCell>
          </TableRow>
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
                return <Typography
                sx={{
                  fontSize: {
                    lg: "16px",
                    xs: "14px",
                  },
                  fontWeight: "600",
                }}
              >
                Page: {page + 1}
              </Typography>;
              }}
              backIconButtonProps={{
                color: "#fff",
              }}
              nextIconButtonProps={{ color: "#fff" }}
              showFirstButton={true}
              showLastButton={true}
              labelRowsPerPage={<Typography
                sx={{
                  fontSize: {
                    lg: "16px",
                    xs: "14px",
                  },
                  fontWeight: "600",
                }}
              >
                Rows:
              </Typography>}
              sx={styles.tablePagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Grid>
  );
}

export default Products;
