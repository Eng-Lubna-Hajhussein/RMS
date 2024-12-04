import { objAppActions } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Chip,
  Grid,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
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
    minWidth: { xs: "150px", lg: "160px" },
    width: { xs: "150px", lg: "160px" },
  },
  rowTablecell: {
    border: "1px solid #c4c4c4",
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
      ".MuiTablePagination-actions": {
        marginLeft: { xs: "5px", lg: "15px" },
        marginRight: { xs: "5px", lg: "15px" },
      },
    },
  },
  fitContentHeight: {
    height: "fit-content",
  },
  tableID: {
    fontSize: { lg: "17px", xs: "12px" },
    fontWeight: { lg: "800", xs: "600" },
  },
  seatsNum: {
    fontSize: { lg: "17px", xs: "12px" },
    fontWeight: { lg: "800", xs: "600" },
  },
  price: {
    fontSize: { lg: "17px", xs: "12px" },
    fontWeight: { lg: "800", xs: "600" },
  },
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
    fontSize: { lg: "17px", xs: "12px" },
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = [
    {eng:"Table ID",arb:"معرف الطاولة"},
    {eng:"Seats Number",arb:"عدد المقاعد"},
    {eng:"Price Per Hour",arb:"السعر لكل ساعة"},
    {eng:"Status",arb:"الحالة"},
    {eng:"Reservation Info",arb:"معلومات الحجز"},
    {eng:"Actions",arb:"الاجراءات"},
  ];

  return (
    <Grid item xs="12" container sx={styles.tableContainer} px={1}>
      <Table
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell sx={styles.columnTablecell} align="center">
                <Typography
                  sx={{
                    fontSize: { lg: "15px", xs: "12px" },
                    fontWeight: { lg: "800", xs: "800" },
                    textTransform:"capitalize"
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
            ? tables.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                    <Grid item xs="1">
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
                  <Grid item xs={table.blnTableAvailable ? "11" : "12"}>
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
                      {table.blnTableAvailable ? dictionary.tables.available[lang] : dictionary.tables.reserved[lang]}
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
                  minWidth: { xs: "180px", lg: "200px" },
                  width: { xs: "180px", lg: "200px" },
                }}
                align="center"
                component="th"
                scope="row"
              >
                <AnimButton0001
                  label={dictionary.buttons.freeTable[lang]}
                  color={App_Second_Color}
                  disabled={table.blnTableAvailable}
                  onClick={() => handleFreeTable(table,index)}
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
        <TableFooter>
          <TableRow>
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
              labelDisplayedRows={({ page }) => {
                return (
                  <Typography
                  dir={dir}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      xs: "14px",
                    },
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {dictionary.tablePagination.page[lang]}: {page + 1}
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
                  dir={dir}
                  sx={{
                    fontSize: {
                      lg: "16px",
                      xs: "14px",
                    },
                    fontWeight: "600",
                    textTransform: "capitalize",
                  }}
                >
                  {dictionary.tablePagination.rows[lang]}:
                </Typography>
              
              }
              sx={{...styles.tablePagination,    ".css-16c50h-MuiInputBase-root-MuiTablePagination-select": {
                marginRight: { xs: "5px", lg: dir==="rtl"? "5px":"15px" },
                marginLeft: { xs: "5px", lg:dir==="rtl"? "15px":"5px" },
              },

            }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Grid>
  );
}

export default TablesInfo;
