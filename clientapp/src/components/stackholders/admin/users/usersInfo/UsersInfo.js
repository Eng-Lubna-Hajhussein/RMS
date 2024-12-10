import { objIDRole } from "appHelper/appVariables";
import React, { useState } from "react";
import {
  Avatar,
  Chip,
  Grid,
  TablePagination,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from "@basetoolkit/ui";
import { Link } from "react-router-dom";
import { dictionary } from "appHelper/appDictionary";

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
    color: "primary",
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
    border: "1px solid #c4c4c4 !important",
    bgcolor: "primary",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 800,
    xs: { width: "150px", minWidth: "150px" },
  },
  rowTablecell: {
    border: "1px solid #c4c4c4 !important",
  },
  tableContainer: {
    marginBottom: "50px",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  username: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "10px", fontWeight: 600 },
    textTransform: "capitalize",
  },
  userRole: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "10px", fontWeight: 600 },
    fontWeight: "800",
  },
  userEmail: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "10px", fontWeight: 600 },
    fontWeight: "800",
  },
  userAddress: {
    lg: { fontSize: "14px", fontWeight: 800 },
    xs: { fontSize: "10px", fontWeight: 600 },
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
  tablePagination: {},
};

function UsersInfo({ users, handleUserDetails, appState, lang, dir }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = ({ value }) => {
    setRowsPerPage(+value);
    setPage(0);
  };

  const columns = [
    { eng: "account", arb: "الحساب" },
    { eng: "role", arb: "الوظيفة" },
    { eng: "email", arb: "الايميل" },
    { eng: "address", arb: "العنوان" },
    { eng: "status", arb: "الحالة" },
    { eng: "activity", arb: "نشاط الحساب" },
  ];

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
                ? users.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
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
                        <Avatar
                          src={user?.strImgPath || "broken"}
                          height="50px"
                          width="50px"
                        />
                      </Grid>
                      <Grid item>
                        {appState.userInfo.bigUserID === user.bigUserID && (
                          <Typography color={"primary"} sx={styles.username}>
                            ({dictionary.users.owner[lang]})
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
                      {objIDRole[user.bigUserRoleID] === "Admin"
                        ? dictionary.users.admin[lang]
                        : dictionary.users.customer[lang]}
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
                        (dir === "rtl" ? "، " : ", ") +
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
                          <Typography sx={styles.status}>
                            {dictionary.users.banned[lang]}
                          </Typography>
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
                          {user.blnIsActive
                            ? dictionary.users.active[lang]
                            : dictionary.users.deactivated[lang]}
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
          </Table>
          <Grid item xs={12} container justifyContent="end">
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

export default UsersInfo;
