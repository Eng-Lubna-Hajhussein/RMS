import React, { useState } from "react";
import {
  Button,
  Chip,
  Grid,
  TableFooter,
  TablePagination,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@basetoolkit/ui";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { Visibility } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    overflowX: "auto",
    marginRight: "auto",
    marginLeft: "auto",
  },
  columnTablecell: {
    border: "1px solid #c4c4c4 !important",
    background: App_Primary_Color,
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
    xs: { minWidth: "150px", width: "150px" },
  },
  rowTablecell: {
    border: "1px solid #c4c4c4 !important",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  fullHeight: {
    height: "100%",
  },
  tableID: {
    lg: { fontSize: "17px", fontWeight: 800 },
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
    fontWeight: 700,
    lg: { fontSize: "17px" },
    xs: { fontSize: "12px" },
  },
  viewBtnLabel: {
    fontSize: "15px",
    textTransform: "uppercase",
  },
  tablePagination: {},
};

function TablesInfo({ tables, handleCancelTable, lang, dir }) {
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
    <Grid item xs="12" container sx={styles.container}>
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
                  <Grid item xs={12}>
                    <Typography color={"#000"} sx={styles.tableID}>
                      #{table?.bigTableID}
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
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <AnimButton0001
                  label={dictionary.buttons.cancelReservation[lang]}
                  color={App_Second_Color}
                  disabled={table.blnTableAvailable}
                  onClick={() => {
                    handleCancelTable(table.bigTableID, index);
                  }}
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
  );
}

export default TablesInfo;
