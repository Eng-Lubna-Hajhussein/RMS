import { objIDRole } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Avatar,
  Box,
  Chip,
  Grid,
  TableFooter,
  TablePagination,
  Typography,
} from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { Link, useParams } from "react-router-dom";
import { findUsers } from "appHelper/fetchapi/tblUser/tblUser";
import arrowImg from "assets/image/arrow-2.png";
import AnimationBox from "components/sharedUI/AnimationBox/AnimationBox";

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
  usersNum: {
    fontWeight: "800",
    textTransform: "capitalize",
  },
  arrowImg: {
    transform: "rotate(180deg)",
    height: "80px",
    width: "100%",
  },
  columnTablecell: {
    border: "1px solid #c4c4c4",
    background: App_Primary_Color,
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
    minWidth: { xs: "150px" },
    width: { xs: "150px" },
  },
  rowTablecell: {
    border: "1px solid #c4c4c4",
  },
  tableContainer: {
    marginBottom: "50px",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  username: {
    fontSize: { lg: "14px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
    textTransform: "capitalize",
  },
  userRole: {
    fontSize: { lg: "14px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
    fontWeight: "800",
  },
  userEmail: {
    fontSize: { lg: "14px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
    fontWeight: "800",
  },
  userAddress: {
    fontSize: { lg: "14px", xs: "10px" },
    fontWeight: { lg: "800", xs: "600" },
    fontWeight: "800",
    textTransform: "capitalize",
  },
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
  },
  activity: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
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

function UsersInfo({ users, handleUserDetails, appState, lang, dir }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = ["Account", "Role", "Email", "Address", "Status", "Activity"];
  return (
    <Grid item xs="12" sx={styles.container} px={1}>
      <Table
        aria-label="simple table"
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell sx={styles.columnTablecell} align="center">
               <Typography
                  sx={{
                    fontSize: { lg: "15px", xs: "12px" },
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
            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : users
          )?.map((user, index) => (
            <TableRow>
              <TableCell
                sx={{
                  ...styles.rowTablecell,
                  minWidth: { xs: "200px", lg: "250px" },
                  width: { xs: "200px", lg: "250px" },
                  overflowX: "auto",
                }}
                align="center"
                component="th"
                scope="row"
              >
                <Grid
                  container
                  sx={styles.fitContentHeight}
                  alignItems={"center"}
                  alignContent={"center"}
                >
                  <Grid item px={1} sx={styles.fitContentHeight}>
                    <Avatar src={user?.strImgPath} height="50px" width="50px" />
                  </Grid>
                  <Grid item>
                    {appState.userInfo.bigUserID === user.bigUserID && (
                      <Typography color={"primary"} sx={styles.username}>
                        Me (Owner)
                      </Typography>
                    )}
                    {!(appState.userInfo.bigUserID === user.bigUserID) && (
                      <Link>
                        <Typography
                          color={"primary"}
                          onClick={() => handleUserDetails(user)}
                          sx={styles.username}
                        >
                          {user?.jsnFullName[lang]}
                        </Typography>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography color={"#000"} sx={styles.userRole}>
                  {objIDRole[user.bigUserRoleID]}
                </Typography>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography color={"#000"} sx={styles.userEmail}>
                  {user.strEmail}
                </Typography>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Typography color={"#000"} sx={styles.userAddress}>
                  {user.jsnAddress.jsnCity[lang] +
                    ", " +
                    user.jsnAddress.jsnCountry[lang]}
                </Typography>
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                {user.blnIsDeleted ? (
                  <Chip
                    color={"error"}
                    label={
                      <Typography sx={styles.status}>{"Banned"}</Typography>
                    }
                  />
                ) : (
                  ""
                )}
              </TableCell>
              <TableCell
                sx={styles.rowTablecell}
                align="center"
                component="th"
                scope="row"
              >
                <Chip
                  color={user.blnIsActive ? "success" : "error"}
                  label={
                    <Typography sx={styles.activity}>
                      {user.blnIsActive ? "Active" : "Deactivated"}
                    </Typography>
                  }
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
              count={users.length}
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
    </Grid>
  );
}

export default UsersInfo;
