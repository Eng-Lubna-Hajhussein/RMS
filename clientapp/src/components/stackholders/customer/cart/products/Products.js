import { objAppActions } from "appHelper/appVariables";
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@basetoolkit/ui";
import { textFieldClasses } from "@basetoolkit/ui/classes";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/optionList/OptionList";
import { MoreVert } from "@mui/icons-material";
import { dictionary } from "appHelper/appDictionary";

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
    background: App_Primary_Color,
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
    paddingRight: 4,
    paddingLeft: 5,
  },
  rowTablecell: {
    border: "1px solid #c4c4c4 !important",
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
    overflowY: "auto",
    lg: { maxHeight: "120px" },
    xs: { maxHeight: "50px" },
  },
  optionListContainer: {
    overflowY: "auto",
    lg: { height: "100px" },
    xs: { height: "50px" },
  },
  productNum: {
    lg: {
      width: "100px !important",
      fontSize: "20px !important",
      fontWeight: 800,
    },
    xs: {
      width: "60px !important",
      fontSize: "10px  !important",
      fontWeight: 800,
    },
    [`& .${textFieldClasses.wrapper}`]: {
      border: (theme) => `3px solid ${theme.palette.secondary.main} !important`,
      borderRadius: "10px !important",
    },
  },
  price: {
    fontWeight: "800",
    lg: { fontSize: "20px" },
    xs: { fontSize: "10px" },
  },
  actionsRow: {
    background: "#f4fcfc",
    border: "1px solid #c4c4c4",
  },
  menuBtn: {
    background: App_Primary_Color,
    lg: { p: "20px 40px !important" },
    xs: { p: "15px 18px !important" },
    borderRadius: "10px",
    "&:hover": {
      background: "#000 !important",
    },
  },
  menuBtnLabel: {
    textTransform: "capitalize",
    lg: { fontSize: "18px" },
    xs: { fontSize: "12px" },
  },
  discardBtn: {
    background: "#000",
    lg: { p: "20px 40px !important" },
    xs: { p: "15px 18px !important" },
    borderRadius: "10px !important",
    "&:hover": {
      background: App_Primary_Color + " !important",
    },
  },
  discardBtnLabel: {
    textTransform: "capitalize",
    lg: { fontSize: "18px" },
    xs: { fontSize: "12px" },
  },
  tablePagination: {},
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

  const handleChangeRowsPerPage = ({ value }) => {
    setRowsPerPage(+value);
    setPage(0);
  };

  const actionItemNavList = [
    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
  ];
  // const columns = ["Product", "Quantity", "Total"];
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
                    lg: {
                      width: "600px",
                      minWidth: "600px",
                    },
                    xs: { width: "350px", minWidth: "350px" },
                  }}
                  align={dir === "ltr" ? "left" : "right"}
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
                      xs={1}
                      container
                      justifyContent={"end"}
                      alignContent={"center"}
                      alignSelf={"start"}
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
                  <TextField
                    type="number"
                    inputProps={{ min: 1, max: 10 }}
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
            <TableCell
              colSpan={2}
              align={dir === "ltr" ? "left" : "right"}
              component="th"
              scope="row"
            >
              <Button sx={styles.menuBtn} variant="contained">
                <Typography color={"#fff"} sx={styles.menuBtnLabel}>
                  {dictionary.buttons.backToMenu[lang]}
                </Typography>
              </Button>
            </TableCell>
            <TableCell
              colSpan={3}
              align={dir === "ltr" ? "right" : "left"}
              component="th"
              scope="row"
            >
              <Button
                sx={styles.discardBtn}
                color="black"
                variant="contained"
                onClick={handleCartDiscard}
              >
                <Typography color={"#fff"} sx={styles.discardBtnLabel}>
                  {dictionary.buttons.discard[lang]}
                </Typography>
              </Button>
            </TableCell>
          </TableRow>
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
