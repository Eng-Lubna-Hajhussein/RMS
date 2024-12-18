import React, { useContext } from "react";
import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
} from "@basetoolkit/ui";
import { App_Primary_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { AppContext } from "contextapi/context/AppContext";
import { ctrlReserveTable } from "../controller/ctrlReserveTable";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";

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
};

function Checkout({
  open,
  handleClose,
  table,
  lang,
  dir,
  startDate,
  startTime,
  endDate,
  endTime,
  setTables,
  tables,
}) {
  const { appState } = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { cardNumber, cvv, cardName } = formJson;
    ctrlReserveTable.reserveTable({
      appState: appState,
      cardName: cardName,
      cardNumber: cardNumber,
      cvv: cvv,
      endDate: endDate,
      setTables: setTables,
      startDate: startDate,
      table: table,
      tables: tables,
      startTime: startTime,
      endTime: endTime,
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
                <Title0001 title={"Checkout"} dir={dir} />
              </Grid>
              <Grid item xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  name="cardNumber"
                  label="Card Number"
                  type="text"
                  fullWidth
                  defaultValue={
                    appState?.userInfo?.jsnClientPayment?.strCardNumber
                  }
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} p={1}>
                <TextField
                  color="warning"
                  required
                  name="cvv"
                  label="CVV Code"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={appState?.userInfo?.jsnClientPayment?.strCVV}
                />
              </Grid>
              <Grid item xs={6} p={1}>
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
          <Grid container p={2} justifyItems={"end"} justifyContent={"end"}>
            <Grid item lg={4} xs={5}>
              <AnimButton0001
                label={"Checkout"}
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
