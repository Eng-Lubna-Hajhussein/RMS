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
import UserDetails from "./userDetails/UserDetails";
import arrowImg from "assets/image/arrow-2.png";
import AnimationBox from "components/sharedUI/AnimationBox/AnimationBox";

const styles = {
  container: {
    marginY: "50px",
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
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  userRole: {
    fontSize: "14px",
    fontWeight: "800",
  },
  userEmail: {
    fontSize: "14px",
    fontWeight: "800",
  },
  userAddress: {
    fontSize: "14px",
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
};

function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const [users, setUsers] = useState([]);
  const { systemID, systemName } = useParams();
  const [userOnAction, setUserOnAction] = useState();
  const [openUserDetails, setOpenUserDetails] = useState(false);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const userNavList = [
    { bigNavID: 6774846478, nav: { eng: "upload picture", arb: "حسابي" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ];

  const adminNavList = [
    { bigNavID: 1234146400, nav: { eng: "upload logo", arb: "صورة اللوغو" } },
    {
      bigNavID: 3234146150,
      nav: { eng: "dashboard", arb: "داشبورد" },
    },
    { bigNavID: 7764142478, nav: { eng: "settings", arb: "الاعدادات" } },
  ];

  const navList = [
    {
      bigNavID: 1342146478,
      nav: { eng: "home", arb: "الرئيسية" },
      path: `/admin/${systemName}/${systemID}`,
    },

    {
      bigNavID: 8944146478,
      nav: { eng: "orders", arb: "تسوق" },
      path: `/admin/orders/${systemName}/${systemID}`,
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "tables", arb: "الاخبار" },
      path: `/admin/tables/${systemName}/${systemID}`,
    },

    { bigNavID: 2344146478, nav: { eng: "users", arb: "المنيو" } },
    { bigNavID: 2344146478, nav: { eng: "reviews", arb: "المنيو" } },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const instalData = async () => {
    setIsLoading(true);
    const systemUsers = await findUsers(appState.systemInfo.bigSystemID);
    if (systemUsers.length) {
      const parsedUsers = systemUsers.map((user) => ({
        ...user,
        jsnFullName: JSON.parse(user?.jsnFullName),
        jsnLocation: JSON.parse(user?.jsnLocation),
        jsnAddress: JSON.parse(user?.jsnAddress),
        jsnClientPayment: JSON.parse(user?.jsnClientPayment),
      }));
      setUsers([...parsedUsers]);
    }
    // console.log({ systemUsers });
    setIsLoading(false);
  };

  useEffect(() => {
    instalData();
  }, []);

  const columns = ["Account", "Role", "Email", "Address", "Status", "Activity"];

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
        adminNavList={adminNavList}
        jsnSystemContact={appState.systemInfo.jsnSystemContact}
        editable={false}
        userImg={appState.userInfo.strImgPath}
        websiteLogo={appState?.systemInfo?.strLogoPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item xs="10" container>
            <Grid item xs="12" sx={styles.tableContainer} px={1}>
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
                        {column}
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
                        sx={styles.rowTablecell}
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
                              src={user?.strImgPath}
                              height="50px"
                              width="50px"
                            />
                          </Grid>
                          <Grid item>
                            {appState.userInfo.bigUserID === user.bigUserID && (
                              <Typography
                                color={"primary"}
                                sx={styles.username}
                              >
                                Me (Owner)
                              </Typography>
                            )}
                            {!(
                              appState.userInfo.bigUserID === user.bigUserID
                            ) && (
                              <Link>
                                <Typography
                                  color={"primary"}
                                  onClick={() => {
                                    setUserOnAction(user);
                                    setOpenUserDetails(true);
                                  }}
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
                              <Typography sx={styles.status}>
                                {"Banned"}
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
          </Grid>
        </Grid>
      )}
      <UserDetails
        open={openUserDetails}
        handleClose={() => setOpenUserDetails(false)}
        user={userOnAction}
        users={users}
        setUsers={setUsers}
        lang={lang}
      />
    </React.Fragment>
  );
}

export default Users;
