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
import { useParams } from "react-router-dom";
import { ctrlTables } from "./controller/CtrlTables";
import EditTable from "./editTable/EditTable";

function Tables() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const [tables, setTables] = useState([]);
  const { systemID, systemName } = useParams();
  const [tableOnAction, setTableOnAction] = useState();
  const [openEditTable, setOpenEditTable] = useState(false);

  const userNavList = [
    { bigNavID: 6774846478, nav: { eng: "upload picture", arb: "حسابي" } },
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
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
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "tables", arb: "الاخبار" },
      path: `/admin/tables/${systemName}/${systemID}`,
    },

    { bigNavID: 2344146478, nav: { eng: "users", arb: "المنيو" } },
    { bigNavID: 941116478, nav: { eng: "contact", arb: "تواصل معنا" } },
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
                <Grid item xs="12" container justifyContent={"start"}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ width: "100%" }}
                  >
                    <Grid item xs="12" container py={3}>
                      <Grid item xs="6" px={2}>
                        <TextField
                          sx={{ background: "#fff", borderRadius: "5px" }}
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
                          sx={{ background: "#fff", borderRadius: "5px" }}
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
                  {tables?.map((table, index) => (
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
                                      // ctrlTables.updateTable(table.bigTableID);
                                    }
                                  },
                                }))}
                                endIcon={<MoreVert />}
                                lang={appState.clientInfo.strLanguage}
                              />
                            </Grid>
                          )}
                          <Grid item xs={table.blnTableAvailable ? "11" : "12"}>
                            <Typography
                              color={"#000"}
                              sx={{
                                fontSize: "18px",
                                fontWeight: "800",
                              }}
                            >
                              #{table.bigTableID}
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
                </TableBody>
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
