import React from "react";
import {
  Button,
  Grid,
  Typography,
  Paper
} from "@basetoolkit/ui";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { TimeToLeave } from "@mui/icons-material";
import DeliveryTimer from "./deliveryTimer/DeliveryTimer";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  paper: {
    width: "100%",
    boxShadow: "none",
    lg:{height:"300px",p:"50px"},
    xs:{height:"fit-content",p:"15px"}
  },
  fullHeight: {
    height: "100%",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  title: {
    lg: {fontSize:"25px"}, xs: {fontSize:"20px"} ,
    fontWeight: "800",
    textTransform: "capitalize",
  },
  deliveredBtn: {
    background: "#000",
    padding: "20px 40px",
    borderRadius: "10px",
    "&:hover": {
      background:t=>t.palette.primary.main +" !important" ,
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
    <Paper sx={styles.paper} bgcolor="secondary" borderRadius={3} py={3}>
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
            <Typography sx={styles.title}>{dictionary.order.deliveryTime[lang]}</Typography>
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
              color="black"
              onClick={handleOrderDelivered}
              variant="contained"
            >
              <Typography color={"#fff"} sx={styles.deliveredBtnLabel}>
                {dictionary.buttons.delivered[lang]}
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}

export default DeliveryTime;
