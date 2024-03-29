import React from "react";
import {
  Grid,
  TextField,
} from "@mui/material";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import { dictionary } from "appHelper/appDictionary";

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
        <Title0001 title={dictionary.customerSettings.paymentInfo[lang]} dir={dir} />
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={12} p={2}>
          <TextField
            sx={styles.textfield}
            variant="outlined"
            fullWidth
            type="text"
            dir="ltr"
            label={dictionary.labels.cardNumber[lang]}
            defaultValue={appState?.userInfo?.jsnClientPayment?.strCardNumber}
            className={`form-control ${errors.cardNumber && "invalid"}`}
            {...register("cardNumber")}
            onKeyUp={() => {
              trigger("cardNumber");
            }}
          />
        </Grid>
        <Grid item lg={6} xs={12} p={2}>
          <TextField
            sx={styles.textfield}
            variant="outlined"
            fullWidth
            type="text"
            dir="ltr"
            label={dictionary.labels.cvv[lang]}
            defaultValue={appState?.userInfo?.jsnClientPayment?.strCVV}
            className={`form-control ${errors.cvv && "invalid"}`}
            {...register("cvv")}
            onKeyUp={() => {
              trigger("cvv");
            }}
          />
        </Grid>
        <Grid item lg={6} xs={12} p={2}>
          <TextField
            sx={styles.textfield}
            variant="outlined"
            fullWidth
            type="text"
            dir="ltr"
            label={dictionary.labels.nameOnCard[lang]}
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
