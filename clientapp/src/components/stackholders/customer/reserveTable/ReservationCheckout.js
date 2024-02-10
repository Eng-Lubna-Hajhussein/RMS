import {
    Close,
  } from "@mui/icons-material";
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Grid,
    Typography,
  } from "@mui/material";
  import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
  import { generateRandomID } from "appHelper/appFunctions";
  import { createOrder } from "appHelper/fetchapi/tblOrder/tblOrder";
import { reserveTable } from "appHelper/fetchapi/tblReservation/tblReservation";
  import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
  import { AppContext } from "contextapi/context/AppContext";
  import moment from "moment";
  import React, { useContext, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  
  function ReservationCheckout({ open, handleClose,table, lang, dir, startDate,
    startTime,
    endDate,
    endTime,setTables ,tables}) {
    const { appState, appDispatch } = useContext(AppContext);
    const navigate = useNavigate();
  
    return (
      <React.Fragment>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: async(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const {cardNumber,cvv,cardName} = formJson;
              const dtmReservationStart = (startDate.current.value+' '+startTime.current.value+':00')
              const dtmReservationEnd = (endDate.current.value+' '+endTime.current.value+':00')
              console.log(dtmReservationStart)
              console.log(dtmReservationEnd)
              const objInput = {
                bigTableID:table.bigTableID,
                bigUserID:appState.userInfo.bigUserID,
                jsnClientInfo:{
                  strEmail:appState.userInfo.strEmail,
                  strImgPath:appState.userInfo.strImgPath,
                  jsnFullName:appState.userInfo.jsnFullName
                 },
                 jsnClientPayment:{
                  strCardNumber: cardNumber,
                  strCVV: cvv,
                  strNameOnCard: cardName,
                 },
                 dtmReservationStart:dtmReservationStart,
                 dtmReservationEnd:dtmReservationEnd,
                 blnTableAvailable:false
                }
              const reservedTable = await reserveTable(objInput);
              if(reservedTable){
                  const unreservedTables = tables.filter((table)=>table.bigTableID!==reservedTable.bigTableID);
                  setTables(unreservedTables);
              }
              handleClose();
            },
          }}
          maxWidth="md"
        >
          <DialogTitle sx={{ height: "fit-content" }}>
            <Grid container justifyContent={"end"}>
              <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
            </Grid>
          </DialogTitle>
          <DialogContent sx={{ py: "0" }}>
            <Grid container py={1} justifyContent={"center"}>
              <Grid item container xs="12">
                <Grid item xs="12" p={1}>
                  <Typography
                    sx={{
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "600",
                      px: "3px",
                    }}
                  >
                    Checkout
                  </Typography>
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
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ py: "0" }}>
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
  
  export default ReservationCheckout;
  