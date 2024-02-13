import {
  lstWebsiteNav,
  objAppActions,
  objIDRole,
  objRoleID,
} from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import {
  MoreVert,
  TimeToLeave,
  ViewAgenda,
  Visibility,
} from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import {
  findAvailableTables,
  findTables,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import bgImg from "assets/image/patron.jpg";
import { useForm } from "react-hook-form";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
// import { ctrlTables } from "./controller/CtrlTables";
// import EditTable from "./editTable/EditTable";
import { findUsers } from "appHelper/fetchapi/tblUser/tblUser";
import UserDetails from "./userDetails/UserDetails";

function Users() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const [users, setUsers] = useState([]);
  const { systemID, systemName } = useParams();
  const [userOnAction, setUserOnAction] = useState();
  const [openUserDetails, setOpenUserDetails] = useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
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
      path:`/admin/orders/${systemName}/${systemID}`
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

  const actionItemNavList = [
    { bigNavID: objAppActions.Edit, nav: { eng: "edit", arb: "حذف" } },

    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
  ];

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
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={{ marginY: "5px" }}>
          <Grid item xs="10" container>
          <Grid
              item
              xs="12"
              px={1}
              pb={10}
              justifyContent={"center"}
              sx={{
                background: "#f4fcfc",
                height: "100px",
                marginY: "50px",
                borderRadius: "20px",
                padding: "20px",
              }}
            >
              <Grid container>
                <Grid item xs="12" container px={2} justifyContent={"start"}>
                  <Typography
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "28px",
                      fontWeight: "800",
                      color: App_Primary_Color,
                      borderBottom: "3px solid #ffd40d",
                      width: "fit-content",
                    }}
                  >
                    System Users !
                  </Typography>
                </Grid>
                <Grid item xs="12" container justifyContent={"start"}>
                  <form
                    
                    style={{ width: "100%" }}
                  >
                    <Grid item xs="12" container py={3}>
                      <Grid item xs="6" px={2}>
                       
                      </Grid>
                      <Grid item xs="6" px={2}>
                       
                      </Grid>
                    
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="12" sx={{ marginBottom: "50px" }} px={1}>
              <Table
                sx={{ minWidth: 650, border: "1px solid #c4c4c4" }}
                aria-label="simple table"
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Account
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Role
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Email
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Address
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        border: "1px solid #c4c4c4",
                        background: App_Primary_Color,
                        color: "#fff",
                        fontSize: "15px",
                        fontWeight: 800,
                      }}
                      align="center"
                    >
                      Activity
                    </TableCell>
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
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Grid
                          container
                          sx={{ height: "fit-content" }}
                          alignItems={"center"}
                          alignContent={"center"}
                        >
                          <Grid item px={1} sx={{ height: "fit-content" }}>
                            <Avatar
                              src={user?.strImgPath}
                              height="50px"
                              width="50px"
                            />
                          </Grid>
                          <Grid item>
                          {appState.userInfo.bigUserID === user.bigUserID&&<Typography
                          color={"primary"}
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                            textTransform: "capitalize",
                          }}
                        >
                            Me (Owner)
                        </Typography>}
                        {!(appState.userInfo.bigUserID === user.bigUserID)&&<Link>
                            <Typography
                          color={"primary"}
                          onClick={()=>{
                            setUserOnAction(user);
                            setOpenUserDetails(true);
                        }}
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                            textTransform: "capitalize",
                          }}
                        >
                            {user?.jsnFullName[lang]}
                        </Typography> 
                        </Link>}
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography
                          color={"#000"}
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                          }}
                        >
                          {objIDRole[user.bigUserRoleID]}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography
                          color={"#000"}
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                          }}
                        >
                          {user.strEmail}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography
                          color={"#000"}
                          sx={{
                            fontSize: "14px",
                            fontWeight: "800",
                            textTransform: "capitalize",
                          }}
                        >
                          {user.jsnAddress.jsnCity[lang] +
                            ", " +
                            user.jsnAddress.jsnCountry[lang]}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {user.blnIsDeleted ? (
                          <Chip
                            color={"error"}
                            label={
                              <Typography
                                sx={{
                                  color: "#fff",
                                  textTransform: "capitalize",
                                  fontWeight: "700",
                                }}
                              >
                                {"Banned"}
                              </Typography>
                            }
                          />
                        ) : (
                          ""
                        )}
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Chip
                          color={user.blnIsActive ? "success" : "error"}
                          label={
                            <Typography
                              sx={{
                                color: "#fff",
                                textTransform: "capitalize",
                                fontWeight: "700",
                              }}
                            >
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
                        return (
                          <Typography sx={{ color: "#000" }}>
                            Page: {page + 1}
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
                        <Typography sx={{ color: "#000" }}>Rows:</Typography>
                      }
                      sx={{
                        ".MuiTablePagination-toolbar": {
                          backgroundColor: "#f4fcfc",
                          textAlign: "center",
                        },
                        ".MuiTablePagination-selectLabel, .MuiTablePagination-input":
                          {
                            fontWeight: "800",
                          },
                        ".MuiTablePagination-input": {
                          fontWeight: "bold",
                          background: "#fff",
                          borderRadius: "10px",
                          border: "1px solid #000",
                        },
                      }}
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
      handleClose={()=>setOpenUserDetails(false)}
      user={userOnAction}
      lang={lang}
      />
    </React.Fragment>
  );
}

export default Users;
