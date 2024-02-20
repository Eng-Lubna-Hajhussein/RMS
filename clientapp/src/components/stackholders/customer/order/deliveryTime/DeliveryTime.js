import { lstWebsiteNav } from "appHelper/appVariables";
import WebsiteHeader from "components/sharedUI/websiteHeader/WebsiteHeader";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Grid,
  Icon,
  TableFooter,
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import OptionList from "components/sharedUI/OptionList/OptionList";
import { MoreVert, TimeToLeave } from "@mui/icons-material";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import DeliveryTimer from "./deliveryTimer/DeliveryTimer";
import { useParams } from "react-router-dom";
import { calculateZDirection } from "appHelper/appFunctions";

const styles = {
  paper: {
    height: "300px",
    width: "100%",
    background: App_Second_Color,
    borderRadius: "20px",
    padding: "50px",
    boxShadow: "none",
  },
  fullHeight: {
    height: "100%",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  title: {
    fontSize: "25px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  deliveredBtn: {
    background: "#000",
    padding: "20px 40px",
    borderRadius: "10px",
    ":hover": {
      background: App_Primary_Color,
    },
  },
  deliveredBtnLabel: {
    textTransform: "capitalize",
  },
};

function DeliveryTime({
  handleOrderDelivered,
  deliveryTime,
  orderedCategories,
  appState,
  lang,
  dir,
}) {
  return (
    <Paper sx={styles.paper}>
      <Grid container sx={styles.fullHeight} alignContent={"start"}>
        <Grid
          item
          xs="12"
          container
          alignContent={"center"}
          justifyContent={"center"}

        >
          <Grid item px={1}>
            <TimeToLeave fontSize="large" />
          </Grid>
          <Grid item px={1}>
            <Typography sx={styles.title}>Delivery Time</Typography>
          </Grid>
        </Grid>
        <Grid item xs="12" p={1}>
          <DeliveryTimer
            deliveryTime={deliveryTime}
            order={appState.userInfo.userOrder}
          />
        </Grid>
        {!!orderedCategories?.length && (
          <Grid item xs="12" p={1}>
            <Button
              sx={styles.deliveredBtn}
              fullWidth
              onClick={handleOrderDelivered}
            >
              <Typography color={"#fff"} sx={styles.deliveredBtnLabel}>
                Delivered
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

export default DeliveryTime;
