import React from "react";
import Paper from "@mui/material/Paper";
import { Button, Grid, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { PersonPinCircle } from "@mui/icons-material";

const styles = {
  locationIframe: {
    borderRadius: "10px",
  },
  paper: {
    height: "fit-content",
    width: "100%",
    background: App_Second_Color,
    borderRadius: "20px",
    padding: "15px",
    boxShadow: "none",
  },
  fullHeight: {
    height: "100%",
  },
  address: {
    fontSize: "15px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  upgradeBtn: {
    background: "#000",
    padding: "20px 40px",
    borderRadius: "10px",
    ":hover": {
      background: App_Primary_Color,
    },
  },
  upgradeBtnLabel: {
    textTransform: "capitalize",
  },
};

function DeliveryInfo({ appState, lang, dir }) {
  return (
    <Paper sx={styles.paper}>
      <Grid container sx={styles.fullHeight} alignContent={"start"}>
        <Grid item xs="12" p={1}>
          <iframe
            src={`https://maps.google.com/maps?q=${appState?.userInfo?.jsnLocation?.lat}, ${appState?.userInfo?.jsnLocation?.long}&z=15&output=embed`}
            width="100%"
            height="150"
            frameborder="0"
            style={styles.locationIframe}
          />
        </Grid>
        <Grid item xs="12" container p={1}>
          <Grid item>
            <PersonPinCircle />
          </Grid>
          <Grid item>
            <Typography sx={styles.address}>
              {`${appState?.userInfo?.jsnAddress?.jsnCity[lang]}${
                appState?.userInfo?.jsnAddress?.jsnTown
                  ? ` (${appState?.userInfo?.jsnAddress?.jsnTown[lang]})`
                  : ""
              }, ${appState?.userInfo?.jsnAddress?.jsnCountry[lang]}`}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs="12" p={1}>
          <Button sx={styles.upgradeBtn} fullWidth>
            <Typography color={"#fff"} sx={styles.upgradeBtnLabel}>
              Upgrade Delivery
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default DeliveryInfo;
