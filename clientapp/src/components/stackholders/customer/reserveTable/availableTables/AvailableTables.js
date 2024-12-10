import React, { useState } from "react";
import {
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
  tablePagination: {},
};

function AvailableTables({ tables, handleReverseTable, lang, dir }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tables.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ({ value }) => {
    setRowsPerPage(+value);
    setPage(0);
  };
  // const columns = ["Table ID", "Seats Number", "Price Per Hour", "Actions"];
  const columns = [
    { eng: "Table ID", arb: "معرف الطاولة" },
    { eng: "Seats Number", arb: "عدد المقاعد" },
    { eng: "Price Per Hour", arb: "السعر لكل ساعة" },
    { eng: "Actions", arb: "الاجراءات" },
  ];
  return (
    <Grid item xs={12} container sx={styles.container} px={1}>
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
          )?.map((table) => (
            <TableRow>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography color={"#000"} sx={styles.tableID}>
                  #{table.bigTableID}
                </Typography>
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
                <AnimButton0001
                  label={dictionary.buttons.reserve[lang]}
                  color={App_Second_Color}
                  onClick={() => handleReverseTable(table)}
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

export default AvailableTables;
