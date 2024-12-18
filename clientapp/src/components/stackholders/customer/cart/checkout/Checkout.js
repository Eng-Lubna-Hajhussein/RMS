import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  Typography,
} from "@basetoolkit/ui";
import { App_Primary_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ctrlCart } from "../controller/CtrlCart";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  dialogTitle: {
    height: "fit-content",
  },
  closeIcon: {
    cursor: "pointer",
  },
  dialogContent: {
    py: "0",
  },
  dialogActions: {
    py: "0",
  },
  textField:{
    textTransform:"capitalize"
  }
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
      >
        <DialogTitle sx={styles.dialogTitle}>
          <Grid container justifyContent={"end"}>
            <Close sx={styles.closeIcon} onClick={handleClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid container py={1} justifyContent={"center"}>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001 title={dictionary.shared.checkout[lang]} dir={dir} />
              </Grid>
              <Grid item xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  name="cardNumber"
                  label={dictionary.labels.cardNumber[lang]}
                  type="text"
                  dir="ltr"
                  fullWidth
                  variant="outlined"
                  defaultValue={
                    appState?.userInfo?.jsnClientPayment?.strCardNumber
                  }
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  name="cvv"
                  label={dictionary.labels.cvv[lang]}
                  sx={styles.textField}
                  type="text"
                  dir="ltr"
                  fullWidth
                  defaultValue={appState?.userInfo?.jsnClientPayment?.strCVV}
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  name="cardName"
                  label={dictionary.labels.nameOnCard[lang]}
                  type="text"
                  sx={styles.textField}
                  dir="ltr"
                  fullWidth
                  variant="outlined"
                  defaultValue={
                    appState?.userInfo?.jsnClientPayment?.strNameOnCard
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            p={2}
            justifyItems={"end"}
            justifyContent={"end"}
          >
            <Grid item lg={4} xs={8}>
              <AnimButton0001
                label={dictionary.buttons.checkout[lang]
                }
                color={App_Primary_Color}
                fullWidth={true}
                type="submit"
              />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default Checkout;
