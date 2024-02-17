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
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert, Visibility } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { findTables } from "appHelper/fetchapi/tblReservation/tblReservation";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { ctrlTables } from "./controller/CtrlTables";
import EditTable from "./editTable/EditTable";

const styles = {
  container: {
    marginY: "5px",
  },
  itemContainer: {
    background: "#f4fcfc",
    height: "250px",
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
  form: {
    width: "100%",
  },
  textfield: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  tableContainer: {
    marginBottom: "50px",
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
  fitContentHeight: {
    height: "fit-content",
  },
  tableID: {
    fontSize: "18px",
    fontWeight: "800",
  },
  seatsNum: {
    fontSize: "18px",
    fontWeight: "800",
  },
  price: {
    fontSize: "20px",
    fontWeight: "800",
  },
  status: {
    color: "#fff",
    textTransform: "capitalize",
    fontWeight: "700",
  },
  viewBtnLabel: {
    fontSize: "15px",
    textTransform: "uppercase",
  },
};

function Tables() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const [tables, setTables] = useState([]);
  const { systemID, systemName } = useParams();
  const [tableOnAction, setTableOnAction] = useState();
  const [openEditTable, setOpenEditTable] = useState(false);

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

    {
      bigNavID: 2344146478,
      nav: { eng: "users", arb: "المنيو" },
      path: `/admin/users/${systemName}/${systemID}`,
    },
    { bigNavID: 2344146478, nav: { eng: "reviews", arb: "المنيو" } },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const instalData = async () => {
    setIsLoading(true);
    const systemTables = await findTables(appState.systemInfo.bigSystemID);
    if (systemTables.length) {
      setTables([...systemTables]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    instalData();
  }, []);

  const actionItemNavList = [
    { bigNavID: objAppActions.Edit, nav: { eng: "edit", arb: "حذف" } },

    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (formData) => {
    ctrlTables.addTable({
      appState,
      isLoading,
      setIsLoading,
      formData,
      tables,
      setTables,
      reset,
    });
  };

  const columns = [
    "Table ID",
    " Seats Number",
    "Price Per Hour",
    "Status",
    "Reservation Info",
    "Actions",
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
        websiteLogo={appState?.systemInfo?.strLogoPath}
        userImg={appState.userInfo.strImgPath}
        userName={appState.userInfo.jsnFullName}
        intCartProduct={appState.userInfo.userOrder?.lstProduct?.length}
        blnUserLogin={appState.clientInfo.blnUserLogin}
      />
      {isLoading && <Typography>loading</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"} sx={styles.container}>
          <Grid item xs="10" container>
            <Grid
              item
              xs="12"
              px={1}
              pb={10}
              justifyContent={"center"}
              sx={styles.itemContainer}
            >
              <Grid container>
                <Grid item xs="12" container px={2} justifyContent={"start"}>
                  <Typography sx={styles.title}>Add A TABLE !</Typography>
                </Grid>
                <Grid item xs="12" container justifyContent={"start"}>
                  <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
                    <Grid item xs="12" container py={3}>
                      <Grid item xs="6" px={2}>
                        <TextField
                          sx={styles.textfield}
                          variant="outlined"
                          fullWidth
                          type="number"
                          label="Seats Number"
                          className={`form-control ${
                            errors.seatsNum && "invalid"
                          }`}
                          {...register("seatsNum", {
                            required: "Seats Number is Required",
                          })}
                          onKeyUp={() => {
                            trigger("seatsNum");
                          }}
                        />
                      </Grid>
                      <Grid item xs="6" px={2}>
                        <TextField
                          sx={styles.textfield}
                          variant="outlined"
                          fullWidth
                          type="text"
                          label="Price Per Hour"
                          className={`form-control ${
                            errors.pricePerHour && "invalid"
                          }`}
                          {...register("pricePerHour", {
                            required: "Price Per Hour is Required",
                          })}
                          onKeyUp={() => {
                            trigger("pricePerHour");
                          }}
                        />
                      </Grid>
                      <Grid item xs="12" container justifyContent={"end"} p={2}>
                        <AnimButton0001
                          label={"Add Table"}
                          color={App_Primary_Color}
                          type="submit"
                        />
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs="12" container sx={styles.tableContainer} px={1}>
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
                    {columns.map((column) => (
                      <TableCell sx={styles.columnTablecell} align="center">
                        {column}
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
                            <Grid item xs="1">
                              <OptionList
                                nav={""}
                                navList={actionItemNavList.map((nav) => ({
                                  ...nav,
                                  onClick: () => {
                                    if (
                                      objAppActions["Delete"] === nav.bigNavID
                                    ) {
                                      ctrlTables.deleteTable({
                                        bigTableID: table.bigTableID,
                                        isLoading: isLoading,
                                        setIsLoading: setIsLoading,
                                        setTables: setTables,
                                        tables: tables,
                                      });
                                    }
                                    if (
                                      objAppActions["Edit"] === nav.bigNavID
                                    ) {
                                      setTableOnAction(table);
                                      setOpenEditTable(true);
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
                              {table.blnTableAvailable
                                ? "Available"
                                : "Reserved"}
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
                          <Typography sx={styles.viewBtnLabel}>view</Typography>
                        </Button>
                      </TableCell>
                      <TableCell
                        sx={styles.rowTablecell}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <AnimButton0001
                          label={"free table"}
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
                          <Typography>
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
                        <Typography>Rows:</Typography>
                      }
                      sx={styles.tablePagination}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </Grid>
          </Grid>
        </Grid>
      )}
      <EditTable
        open={openEditTable}
        handleClose={() => setOpenEditTable(false)}
        table={tableOnAction}
        lang={lang}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        tables={tables}
        setTables={setTables}
      />
    </React.Fragment>
  );
}

export default Tables;
