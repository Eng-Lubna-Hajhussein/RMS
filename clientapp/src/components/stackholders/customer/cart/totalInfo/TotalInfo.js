import React from "react";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";

const styles = {
  paper: {
    height: "fit-content",
    boxShadow: "none",
    border: `4px solid ${App_Second_Color}`,
    borderRadius: "20px",
    padding: { lg: "45px", xs: "15px" },
  },
  fullHeight: {
    height: "100%",
  },
  cartTotals: {
    fontSize: { lg: "25px", xs: "20px" },
    fontWeight: "800",
  },
  subPaper: {
    height: { lg: "250px", xs: "200px" },
    boxShadow: "none",
    border: `4px solid #e4e4e4`,
    borderRadius: "20px",
  },
  container: {
    paddingX: { lg: "50px", xs: "10px" },
  },
  font: {
    fontSize: { lg: "15px", xs: "14px" },
    fontWeight: "800",
  },
  totalPaper: {
    height: { lg: "80px", xs: "60px" },
    width: "100%",
    boxShadow: "none",
    background: "#f4fcfc",
    borderRadius: "20px",
    paddingX: {lg:"20px",xs:"10px"},
  },
  fitContentHeight: {
    height: "fit-content",
  },
  totalContainer: {
    height: "100%",
    paddingX: {lg:"20px",xs:"10px"},
  },
};

function TotalInfo({ handleCheckoutOpen, totalPrice, lang, dir }) {
  return (
    <Paper sx={styles.paper}>
      <Grid container sx={styles.fullHeight} alignContent={"start"}>
        <Grid item xs="12" p={1} pb={2}>
          <Typography sx={styles.cartTotals}>Cart Totals</Typography>
        </Grid>
        <Grid item xs="12">
          <Paper sx={styles.subPaper}>
            <Grid container sx={styles.fullHeight} alignContent={"center"}>
              <Grid container item xs="12" sx={styles.container}>
                <Grid item xs="12" py={1} container>
                  <Grid item xs="6" container justifyContent={"start"}>
                    <Typography sx={styles.font}>Sub total:</Typography>
                  </Grid>
                  <Grid item xs="6" container justifyContent={"flex-end"}>
                    <Typography sx={styles.font}>${totalPrice}</Typography>
                  </Grid>
                </Grid>
                <Grid item xs="12" py={1} container>
                  <Grid item xs="6" container justifyContent={"start"}>
                    <Typography sx={styles.font}>Shipping:</Typography>
                  </Grid>
                  <Grid item xs="6" container justifyContent={"flex-end"}>
                    <Typography sx={styles.font}>free</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs="12"
                p={2}
                sx={styles.fitContentHeight}
                container
                alignContent={"center"}
              >
                <Paper sx={styles.totalPaper}>
                  <Grid container sx={styles.totalContainer} alignContent={"center"}>
                    <Grid item xs="6" container justifyContent={"start"}>
                      <Typography sx={styles.font}>Total:</Typography>
                    </Grid>
                    <Grid item xs="6" container justifyContent={"flex-end"}>
                      <Typography sx={styles.font}>${totalPrice}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs="12" p={1} pt={3} container justifyContent={"end"}>
          <AnimButton0001
            label={<Typography
            sx={{
              fontSize:{xs:"16px"}
            }}
            >
              proceed to checkout
            </Typography>}
            color={App_Primary_Color}
            onClick={handleCheckoutOpen}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TotalInfo;
