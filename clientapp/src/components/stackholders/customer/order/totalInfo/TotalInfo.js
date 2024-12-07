import React from "react";
import { Grid, Typography, Paper } from "@basetoolkit/ui";
import { App_Second_Color } from "appHelper/appColor";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  paper: {
    height: "fit-content",
    boxShadow: "none",
    border: `4px solid ${App_Second_Color} !important`,
    borderRadius: "20px",
    lg: { p: "45px" },
    xs: { p: "15px" },
  },
  fullHeight: {
    height: "100%",
  },
  orderTotals: {
    lg: { fontSize: "25px" },
    xs: { fontSize: "20px" },
    fontWeight: "800",
    textTransform:"capitalize"
  },
  subPaper: {
    lg: { height: "250px" },
    xs: { height: "200px" },
    boxShadow: "none",
    border: `4px solid #e4e4e4 !important`,
  },
  container: {
    lg: { paddingX: "50px" },
    xs: { paddingX: "10px" },
  },
  font: {
    lg: { fontSize: "15px" },
    xs: { fontSize: "14px" },
    fontWeight: "800",
  },
  totalPaper: {
    width: "100%",
    boxShadow: "none",
    lg: { paddingX: "20px",height:"80px" },
    xs: { paddingX: "10px",height:"60px" },
  },
  fitContentHeight: {
    height: "fit-content",
  },
  totalContainer: {
    height: "100%",
    lg: { paddingX: "20px" },
    xs: { paddingX: "10px" },
  },
};

function TotalInfo({ totalPrice, lang, dir }) {
  return (
    <Paper sx={styles.paper} borderRadius={3}>
      <Grid container sx={styles.fullHeight} alignContent={"start"}>
        <Grid item xs={12} px={1} pb={2} pt={0} container alignSelf={"start"}>
          <Typography sx={styles.orderTotals}> {dictionary.order.title[lang]}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={styles.subPaper} borderRadius={3}>
            <Grid container sx={styles.fullHeight} alignContent={"center"}>
              <Grid container item xs={12} sx={styles.container}>
                <Grid item xs={12} py={1} container>
                  <Grid item xs={6} container justifyContent={"start"}>
                    <Typography sx={styles.font}>{dictionary.order.subtotal[lang]}:</Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent={"end"}>
                    <Typography sx={styles.font}>${totalPrice}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} py={1} container>
                  <Grid item xs={6} container justifyContent={"start"}>
                    <Typography sx={styles.font}>{dictionary.order.shipping[lang]}:</Typography>
                  </Grid>
                  <Grid item xs={6} container justifyContent={"end"}>
                    <Typography sx={styles.font}>{dictionary.order.free[lang]}</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                p={2}
                sx={styles.fitContentHeight}
                container
                alignContent={"center"}
              >
                <Paper sx={styles.totalPaper} bgcolor={"#f4fcfc"} borderRadius={3}>
                  <Grid
                    container
                    sx={styles.totalContainer}
                    alignContent={"center"}
                    
                  >
                    <Grid item xs={6} container justifyContent={"start"}>
                      <Typography sx={styles.font}>{dictionary.order.total[lang]}:</Typography>
                    </Grid>
                    <Grid item xs={6} container justifyContent={"end"}>
                      <Typography sx={styles.font}>${totalPrice}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TotalInfo;
