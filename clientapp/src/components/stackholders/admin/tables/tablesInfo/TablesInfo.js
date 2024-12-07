import { objAppActions } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Chip,
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
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/optionList/OptionList";
import { MoreVert, Visibility } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { findTables } from "appHelper/fetchapi/tblReservation/tblReservation";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  tableContainer: {
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
    lg: { width: "160px", minWidth: "160px" },
    xs: { width: "150px", minWidth: "150px" },
  },
  rowTablecell: {
    border: "1px solid #c4c4c4",
  },
  tablePagination: {
    // border: "1px solid #c4c4c4",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  tableID: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "12px", fontWeight: 600 },
  },
  seatsNum: {
    lg: { fontSize: "17px", fontWeight: 800 },
    xs: { fontSize: "12px", fontWeight: 600 },
  },
  price: {
    lg: { fontSize: "17px", fontWeight: 800 },
    xs: { fontSize: "12px", fontWeight: 600 },
  },
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
    lg: { fontSize: "17px" },
    xs: { fontSize: "12px" },
  },
  viewBtnLabel: {
    fontSize: "15px",
    textTransform: "uppercase",
  },
};

function TablesInfo({
  handleFreeTable,
  lang,
  dir,
  tables,
  appState,
  handleDeleteTable,
  handleEditTable,
}) {
  const actionItemNavList = [
    { bigNavID: objAppActions.Edit, nav: { eng: "edit", arb: "حذف" } },

    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tables.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ({ value }) => {
    setRowsPerPage(+value);
    setPage(0);
  };
  const columns = [
    { eng: "Table ID", arb: "معرف الطاولة" },
    { eng: "Seats Number", arb: "عدد المقاعد" },
    { eng: "Price Per Hour", arb: "السعر لكل ساعة" },
    { eng: "Status", arb: "الحالة" },
    { eng: "Reservation Info", arb: "معلومات الحجز" },
    { eng: "Actions", arb: "الاجراءات" },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Grid item xs="12" container sx={styles.tableContainer} px={1}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell sx={styles.columnTablecell} align="center">
                    <Typography
                      sx={{
                        lg: { fontSize: "15px" },
                        xs: { fontSize: "12px" },
                        fontWeight: 800,
                        textTransform: "capitalize",
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
                ? tables.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : tables
              )?.map((table, index) => (
                <TableRow>
                  <TableCell
                    sx={styles.rowTablecell}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    <Grid
                      container
                      alignContent={"center"}
                      alignItems={"center"}
                      sx={styles.fitContentHeight}
                    >
                      {table.blnTableAvailable && (
                        <Grid item xs={1}>
                          <OptionList
                            nav={""}
                            navList={actionItemNavList.map((nav) => ({
                              ...nav,
                              onClick: () => {
                                if (objAppActions["Delete"] === nav.bigNavID) {
                                  handleDeleteTable(table);
                                }
                                if (objAppActions["Edit"] === nav.bigNavID) {
                                  handleEditTable(table);
                                }
                              },
                            }))}
                            endIcon={<MoreVert />}
                            lang={appState.clientInfo.strLanguage}
                          />
                        </Grid>
                      )}
                      <Grid item mx={"3px"} xs={table.blnTableAvailable ? 10 : 12}>
                        <Typography color={"#000"} sx={styles.tableID}>
                          #{table.bigTableID}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell
                    sx={styles.rowTablecell}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    <Typography color={"#000"} sx={styles.seatsNum}>
                      {table.intSeatsNumber}
                    </Typography>
                  </TableCell>
                  <TableCell
                    sx={styles.rowTablecell}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    <Typography color={App_Primary_Color} sx={styles.price}>
                      ${table.strTablePrice}
                    </Typography>
                  </TableCell>

                  <TableCell
                    sx={styles.rowTablecell}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    <Chip
                      color={table.blnTableAvailable ? "success" : "error"}
                      label={
                        <Typography sx={styles.status}>
                          {table.blnTableAvailable
                            ? dictionary.tables.available[lang]
                            : dictionary.tables.reserved[lang]}
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
                    <Button
                      endIcon={<Visibility />}
                      disabled={table.blnTableAvailable}
                    >
                      <Typography sx={styles.viewBtnLabel} px={1}>
                        {dictionary.buttons.view[lang]}
                      </Typography>
                    </Button>
                  </TableCell>
                  <TableCell
                    sx={{
                      ...styles.rowTablecell,
                      lg: { minWidth: "200px", width: "200px" },
                      xs: { minWidth: "180px", width: "180px" },
                    }}
                    align="center"
                    component="th"
                    scope="row"
                  >
                    <AnimButton0001
                      label={dictionary.buttons.freeTable[lang]}
                      color={App_Second_Color}
                      disabled={table.blnTableAvailable}
                      onClick={() => handleFreeTable(table, index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {/* <TableFooter>
          <TableRow> */}
            {/* </TableRow>
        </TableFooter> */}
          </Table>
          <Grid item xs={12} container justifyContent="end">
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={tables.length}
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
      </TableContainer>
    </Paper>
  );
}

export default TablesInfo;
