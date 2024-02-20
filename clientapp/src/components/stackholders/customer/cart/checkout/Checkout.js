import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
} from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ctrlCart } from "../controller/CtrlCart";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";

const styles = {
  dialogTitle: {
    height: "fit-content",
  },
  closeIcon:{
    cursor: "pointer"
  },
  dialogContent: {
    py: "0" 
  },
  dialogActions: {
    py: "0" 
  },
};

function Checkout({ open, handleClose, lang, dir }) {
  const { appState, appDispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { cardNumber, cvv, cardName } = formJson;
    ctrlCart.checkout({
      appState: appState,
      cardNumber: cardNumber,
      cvv: cvv,
      cardName: cardName,
      appDispatch: appDispatch,
      navigate: navigate,
    });
    handleClose();
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
        maxWidth="md"
      >
        <DialogTitle sx={styles.dialogTitle}>
          <Grid container justifyContent={"end"}>
            <Close sx={styles.closeIcon} onClick={handleClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid container py={1} justifyContent={"center"}>
            <Grid item container xs="12">
              <Grid item xs="12" p={1}>
                <Title0001 title={'Checkout'} dir={dir} />
              </Grid>
              <Grid item xs="12" p={1}>
                <TextField
                  color="warning"
                  required
                  name="cardNumber"
                  label="Card Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={
                    appState?.userInfo?.jsnClientPayment?.strCardNumber
                  }
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  name="cvv"
                  label="CVV Code"
                  type="text"
                  fullWidth
                  defaultValue={appState?.userInfo?.jsnClientPayment?.strCVV}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  name="cardName"
                  label="Name On Card"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={
                    appState?.userInfo?.jsnClientPayment?.strNameOnCard
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Grid
            container
            p={2}
            px={5}
            justifyItems={"flex-end"}
            justifyContent={"flex-end"}
          >
            <Grid item xs="2">
              <AnimButton0001
                label={"Checkout"}
                color={App_Primary_Color}
                fullWidth={true}
                type="submit"
              />
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default Checkout;
