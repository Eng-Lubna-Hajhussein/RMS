import {
  CITIES,
  COUNTRIES,
  initialAppState,
  lstWebsiteNav,
  objAppActions,
} from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import menuIcon from "assets/image/menu-icon.svg";

import { Avatar, Box, Grid, Typography } from "@mui/material";
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
import { useNavigate, useParams } from "react-router-dom";
import { findUserOrders } from "appHelper/fetchapi/tblOrder/tblOrder";

const style = {
  box: {
    width: "100%",
    background: "#f4fcfc !important",
    height: "100px",
    borderRadius: "20px",
    paddingX: "20px",
  },
  title: {
    textTransform: "capitalize",
    color: "#555",
    fontSize: "14px !important",
  },
  description: {
    textTransform: "capitalize",
    color: "#000",
    fontSize: "25px !important",
    fontWeight: "800 !important",
  },
  icon: {
    padding: "18px",
    background: "#ffd40d",
    borderRadius: "10px",
  },
};

function Activities({user,lang}) {
  const { appState, appDispatch } = useContext(AppContext);
  const { systemID, systemName } = useParams();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [tables, setTables] = useState([]);

  const instalData = async () => {
    setIsLoading(true);
    const objInputOrder = {
      bigUserID: user?.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnOrdersData = await findUserOrders(objInputOrder);
    if (jsnOrdersData?.length) {
      const ordersData = jsnOrdersData.map((order) => ({
        ...order,
        lstProduct: JSON.parse(order?.lstProduct || []),
        jsnAddress: JSON.parse(order?.jsnAddress || {}),
        jsnLocation: JSON.parse(order?.jsnLocation || {}),
        jsnClientPayment: JSON.parse(order?.jsnClientPayment || {}),
      }));
      setOrders([...ordersData]);
    }
    const objInputTables = {
      bigUserID: user?.bigUserID,
      bigSystemID: appState.systemInfo.bigSystemID,
    };
    const jsnUserTables = await findUserTables(objInputTables);
    console.log({ jsnUserTables });
    if (jsnUserTables?.length) {
      const userTables = jsnUserTables.map((table) => ({
        ...table,
        jsnClientPayment: JSON.parse(table?.jsnClientPayment || {}),
      }));
      setTables([...userTables]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    instalData();
  }, []);

  const lastOrder = useMemo(() => {
    const ascOrders = orders.sort((a, b) => {
      return Number(b.dtmOrderDate) - Number(a.dtmOrderDate);
    });
    return ascOrders[0];
  }, [orders]);

  const lastReservation = useMemo(() => {
    const ascTables = tables.sort((a, b) => {
      return new Date(b.dtmReservationStart) - new Date(a.dtmReservationStart);
    });
    return ascTables[0];
  }, [tables]);

  console.log({ lastReservation });

  const [isLoading, setIsLoading] = useState(false);
  return (
    <React.Fragment>
      {isLoading && <Typography>Loading...</Typography>}
      {!isLoading && (
        <Grid container justifyContent={"center"}>
            <Grid item xs="12" py={2} container justifyContent={"center"}>
            <Grid
                item
                xs="6"
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ height: "fit-content" }}
                px={2}
                pb={3}
              >
                <Box sx={style.box}>
                  <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                    sx={{ height: "100%" }}
                  >
                    <Grid item xs="10">
                      <Grid container>
                        <Grid item xs="12">
                          <Typography sx={style.title}>
                            {"Last Order"}
                          </Typography>
                        </Grid>
                        <Grid item xs="12">
                          <Typography sx={style.description}>
                            {moment(
                              new Date(Number(lastOrder?.dtmOrderDate))
                            ).format("MMM DD,YYYY")}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs="2">
                      <img src={menuIcon} style={style.icon} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs="6"
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ height: "fit-content" }}
                px={2}
                pb={3}
              >
                <Box sx={style.box}>
                  <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                    sx={{ height: "100%" }}
                  >
                    <Grid item xs="10">
                      <Grid container>
                        <Grid item xs="12">
                          <Typography sx={style.title}>
                            {"Last Reservation"}
                          </Typography>
                        </Grid>
                        <Grid item xs="12">
                          <Typography sx={style.description}>
                            {moment(
                              new Date(lastReservation?.dtmReservationStart)
                            ).format("MMM DD,YYYY")}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs="2">
                      <img src={menuIcon} style={style.icon} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs="6"
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ height: "fit-content" }}
                px={2}
                pb={3}
              >
                <Box sx={style.box}>
                  <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                    sx={{ height: "100%" }}
                  >
                    <Grid item xs="10">
                      <Grid container>
                        <Grid item xs="12">
                          <Typography sx={style.title}>
                            {"Total Orders"}
                          </Typography>
                        </Grid>
                        <Grid item xs="12">
                          <Typography sx={style.description}>
                            {orders?.length}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs="2">
                      <img src={menuIcon} style={style.icon} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid
                item
                xs="6"
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ height: "fit-content" }}
                px={2}
                pb={3}
              >
                <Box sx={style.box}>
                  <Grid
                    container
                    alignContent={"center"}
                    justifyContent={"center"}
                    sx={{ height: "100%" }}
                  >
                    <Grid item xs="10">
                      <Grid container>
                        <Grid item xs="12">
                          <Typography sx={style.title}>
                            {"Total Reservations"}
                          </Typography>
                        </Grid>
                        <Grid item xs="12">
                          <Typography sx={style.description}>
                            {tables.length}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs="2">
                      <img src={menuIcon} style={style.icon} />
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

export default Activities;
