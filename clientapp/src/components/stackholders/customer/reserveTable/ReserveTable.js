import { lstWebsiteNav } from "appHelper/appVariables";
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
  FormControl,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert, TimeToLeave } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import {
  findAvailableTables,
  findTables,
} from "appHelper/fetchapi/tblReservation/tblReservation";
import bgImg from "assets/image/patron.jpg";
import { useForm } from "react-hook-form";
import moment from "moment";
import ReservationCheckout from "./ReservationCheckout";

const styles = {
  dishName: {
    fontSize: { lg: "16px !important", xs: "9px" },
    fontWeight: "800 !important",
    color: "#000",
    fontFamily: "sans-serif",
  },
  dishDescription: {
    fontSize: { lg: "18px !important", xs: "9px" },
    fontWeight: "400 !important",
    color: "#555",
    fontFamily: "Epilogue",
    lineHeight: { lg: "30px !important", xs: "20px" },
  },
};

function ReserveTable() {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const [tables, setTables] = useState([]);
  const [openCheckout, setOpenCheckout] = useState(false);
  const [tableOnAction,setTableOnAction] = useState();

  const userNavList = [
    { bigNavID: 9974846478, nav: { eng: "profile", arb: "حسابي" } },
    { bigNavID: 5674846478, nav: { eng: "settings", arb: "الاعدادات" } },
    { bigNavID: 1166046478, nav: { eng: "logout", arb: "تسجيل الخروج" } },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const instalData = async () => {
    setIsLoading(true);
    const systemTables = await findAvailableTables(
      appState.systemInfo.bigSystemID
    );
    if (systemTables.length) {
      setTables([...systemTables]);
    }
    setIsLoading(false);
  };
  const allowedReservationHours = [1, 2, 3, 4, 5, 6];
  const [reservationHours, setReservationHours] = useState(1);
  const startDate = useRef();
  const startTime = useRef();
  const endDate = useRef();
  const endTime = useRef();

  useEffect(() => {
    instalData();
  }, []);

  const navList = [
    { bigNavID: 1342146478, nav: { eng: "home", arb: "الرئيسية" } },
    
    {
      bigNavID: 8944146478,
      nav: { eng: "shop", arb: "تسوق" },
      navList: [
        { bigNavID: 8944146400, nav: { eng: "shop cart", arb: "كرت التسوق" } },
        { bigNavID: 6944146478, nav: { eng: "cart checkout", arb: "الحساب" } },
      ],
    },
    {
      bigNavID: 7943146478,
      nav: { eng: "order", arb: "الاخبار" },
      navList: [
        { nav: { eng: "undelivered order", arb: "مدونتنا" } },
        { nav: { eng: "delivered orders", arb: "تفاصيل المدونة" } },
      ],
    },
    {
      bigNavID: 948246478,
      nav: { eng: "table", arb: "الصفحات" },
      navList: [
        { bigNavID: 341246078, nav: { eng: "reserve table", arb: "عنا" } },
        { bigNavID: 968341478, nav: { eng: "reserved tables", arb: "خدماتنا" } },
      ],
    },
    { bigNavID: 941116478, nav: { eng: "contact", arb: "تواصل معنا" } },
    { bigNavID: 2344146478, nav: { eng: "review", arb: "المنيو" } },
  ]

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
                  RESERVE A TABLE !
                </Typography>
              </Grid>
              <Grid item xs="6" container p={2}>
                <FormControl fullWidth>
                  <InputLabel>Reservation Time</InputLabel>
                  <Select
                    defaultValue={reservationHours}
                    required
                    label="Reservation Time"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setReservationHours(e.target.value);
                    }}
                    fullWidth
                    sx={{ background: "#fff", borderRadius: "5px" }}
                  >
                    {allowedReservationHours.map((hoursNum) => (
                      <MenuItem value={hoursNum}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            textTransform: "capitalize",
                          }}
                        >
                          {`reserve for ${hoursNum} ${
                            hoursNum === 1 ? "hour" : "hours"
                          }`}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs="6" container p={2}></Grid>
              <Grid item xs="6" container>
                <Grid item xs="6" p={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="date"
                    disabled
                    inputRef={startDate}
                    label="Start Date"
                    value={moment(new Date()).format("YYYY-MM-DD")}
                  />
                </Grid>
                <Grid item xs="6" p={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="time"
                    inputRef={startTime}
                    label="Start Time"
                    disabled
                    value={moment(new Date()).format("HH:mm")}
                  />
                </Grid>
              </Grid>
              <Grid item xs="6" container>
                <Grid item xs="6" p={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="date"
                    disabled
                    inputRef={endDate}
                    autoFocus
                    label="End Date"
                    value={moment(
                      new Date(
                        new Date().setHours(
                          new Date().getHours() + reservationHours
                        )
                      )
                    ).format("YYYY-MM-DD")}
                  />
                </Grid>
                <Grid item xs="6" p={2}>
                  <TextField
                    sx={{ background: "#fff", borderRadius: "5px" }}
                    variant="outlined"
                    fullWidth
                    type="time"
                    disabled
                    autoFocus
                    inputRef={endTime}
                    label="End Time"
                    value={moment(
                      new Date(
                        new Date().setHours(
                          new Date().getHours() + reservationHours
                        )
                      )
                    ).format("HH:mm")}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs="12" px={1}>
            <Table
              sx={{ minWidth: 650, border: "1px solid #c4c4c4" }}
              aria-label="simple table"
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
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tables?.map((table) => (
                  <TableRow>
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
                      #{table.bigTableID}
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
                      <AnimButton0001
                        label={"Reserve"}
                        color={App_Second_Color}
                        onClick={() => {
                          setTableOnAction({...table});
                          setOpenCheckout(true);
                          // const date = (startDate.current.value+' '+startTime.current.value)
                          // console.log(moment(new Date(date)).format('YYYY-MM-DD HH:mm:ss'))
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
      <ReservationCheckout
        open={openCheckout}
        table={tableOnAction}
        startDate={startDate}
        startTime={startTime}
        endDate={endDate}
        endTime={endTime}
        handleClose={() => setOpenCheckout(false)}
      />
    </React.Fragment>
  );
}

export default ReserveTable;
