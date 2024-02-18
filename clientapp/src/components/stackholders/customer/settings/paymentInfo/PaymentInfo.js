import React from "react";
import {
  Grid,
  TextField,
} from "@mui/material";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";

const styles = {
  textfield: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
};

function PaymentInfo({ register, trigger, appState, errors, lang, dir }) {
  return (
    <Grid item container xs={12}>
      <Grid item xs={12} p={2}>
        <Title0001 title={"Payment Info"} dir={dir} />
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12} p={2}>
          <TextField
            sx={styles.textfield}
            variant="outlined"
            fullWidth
            type="text"
            label="Card Number"
            defaultValue={appState?.userInfo?.jsnClientPayment?.strCardNumber}
            className={`form-control ${errors.cardNumber && "invalid"}`}
            {...register("cardNumber")}
            onKeyUp={() => {
              trigger("cardNumber");
            }}
          />
        </Grid>
        <Grid item xs={6} p={2}>
          <TextField
            sx={styles.textfield}
            variant="outlined"
            fullWidth
            type="text"
            label="CVV Code"
            defaultValue={appState?.userInfo?.jsnClientPayment?.strCVV}
            className={`form-control ${errors.cvv && "invalid"}`}
            {...register("cvv")}
            onKeyUp={() => {
              trigger("cvv");
            }}
          />
        </Grid>
        <Grid item xs={6} p={2}>
          <TextField
            sx={styles.textfield}
            variant="outlined"
            fullWidth
            type="text"
            label="Name On Card"
            defaultValue={appState?.userInfo?.jsnClientPayment?.strNameOnCard}
            className={`form-control ${errors.cardName && "invalid"}`}
            {...register("cardName")}
            onKeyUp={() => {
              trigger("cardName");
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default PaymentInfo;
