import { lstWebsiteNav, objAppActions } from "appHelper/appVariables";
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
  Tooltip,
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
  findUserTables,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import bgImg from "assets/image/patron.jpg";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useParams } from "react-router-dom";
import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";
import { ctrlTables } from "./controller/CtrlTables";

function Tables() {

  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const [tables, setTables] = useState([]);
  const { systemID, systemName } = useParams();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tables.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" },
    path: `/customer/profile/${systemName}/${systemID}`,
  },
    { bigNavID: 1234846478, nav: { eng: "settings", arb: "حسابي" },
    path: `/customer/settings/${systemName}/${systemID}`,
  },
  ];

  const navList = [
    {
      bigNavID: 1342146478,
      nav: { eng: "home", arb: "الرئيسية" },
      path: `/customer/${systemName}/${systemID}`,
    },

    {
      bigNavID: 8944146478,
      nav: { eng: "shop", arb: "تسوق" },
      navList: [
        {
          bigNavID: 8944146400,
          nav: { eng: "shop cart", arb: "كرت التسوق" },
          path: `/customer/cart/${systemName}/${systemID}`,
        },
        {
          bigNavID: 7644146400,
          nav: {
            eng: "menu",
            arb: "كرت التسوق",
            path: `/customer/${systemName}/${systemID}`,
          },
        },
      ],
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "order", arb: "الاخبار" },
      navList: [
        {
          nav: { eng: "undelivered order", arb: "مدونتنا" },
          path: `/customer/order/${systemName}/${systemID}`,
        },
        {
          nav: { eng: "delivered orders", arb: "تفاصيل المدونة" },
          path: `/customer/orders/${systemName}/${systemID}`,
        },
      ],
    },
    {
      bigNavID: 948246478,
      nav: { eng: "table", arb: "الصفحات" },
      navList: [
        { bigNavID: 341246078, nav: { eng: "reserve table", arb: "عنا" },
      path:`/customer/reserve-table/${systemName}/${systemID}`
      },
        {
          bigNavID: 968341478,
          nav: { eng: "reserved tables", arb: "خدماتنا" },
          path:`/customer/tables/${systemName}/${systemID}`
        },
      ],
    },
    { bigNavID: 941116478, nav: { eng: "contact", arb: "تواصل معنا" } },
    { bigNavID: 2344146478, nav: { eng: "review", arb: "المنيو" },
    path:`/customer/review/${systemName}/${systemID}`
  },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const instalData = async () => {
    setIsLoading(true);
    const objInput = {
        bigUserID:appState.userInfo.bigUserID,
        bigSystemID:appState.systemInfo.bigSystemID
    }
    const jsnUserTables = await findUserTables(objInput);
    console.log({jsnUserTables})
    if (jsnUserTables?.length) {
      const userTables = jsnUserTables.map((table)=>({
        ...table,
      jsnClientPayment:JSON.parse(table?.jsnClientPayment||{})
      }))
      setTables([...userTables]);
    }
    setIsLoading(false);
  };

  useEffect(()=>{
    console.log(tables[0])
  },[tables])

  useEffect(() => {
    instalData();
  }, []);  

  return (
    <React.Fragment>
      <WebsiteHeader
        lang={appState.clientInfo.strLanguage}
        dir={appState.clientInfo.strDir}
        navList={navList}
        userNavList={userNavList}
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
                height: "250px",
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
                    Add A TABLE !
                  </Typography>
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
                      Table ID
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
                      Seats Number
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
                      Price Per Hour
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
                      State
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
                      Reservation Info
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
                      Actions
                    </TableCell>
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
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Grid
                          container
                          alignContent={"center"}
                          alignItems={"center"}
                          sx={{ height: "fit-content" }}
                        >
                          <Grid item xs={"12"}>
                            <Typography
                              color={"#000"}
                              sx={{
                                fontSize: "18px",
                                fontWeight: "800",
                              }}
                            >
                              #{table?.bigTableID}
                            </Typography>
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
                            fontSize: "18px",
                            fontWeight: "800",
                          }}
                        >
                          {table.intSeatsNumber}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Typography
                          color={App_Primary_Color}
                          sx={{ fontSize: "20px", fontWeight: "800" }}
                        >
                          ${table.strTablePrice}
                        </Typography>
                      </TableCell>

                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Chip
                          color={table.blnTableAvailable ? "success" : "error"}
                          label={
                            <Typography
                              sx={{
                                color: "#fff",
                                textTransform: "capitalize",
                                fontWeight: "700",
                              }}
                            >
                              {table.blnTableAvailable
                                ? "Available"
                                : "Reserved"}
                            </Typography>
                          }
                        />
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <Button
                          endIcon={<Visibility />}
                          disabled={table.blnTableAvailable}
                        >
                          <Typography
                            sx={{
                              fontSize: "15px",
                              textTransform: "uppercase",
                            }}
                          >
                            view
                          </Typography>
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={{ border: "1px solid #c4c4c4" }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <AnimButton0001
                          label={"cancel"}
                          color={App_Second_Color}
                          disabled={table.blnTableAvailable}
                          onClick={() => {
                            ctrlTables.freeTable({
                              bigTableID: table.bigTableID,
                              index: index,
                              isLoading: isLoading,
                              setIsLoading: setIsLoading,
                              tables: tables,
                              setTables: setTables,
                            });
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
    </React.Fragment>
  );
}

export default Tables;
