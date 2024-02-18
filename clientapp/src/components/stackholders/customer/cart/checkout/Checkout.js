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
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { AppContext } from "contextapi/context/AppContext";
import moment from "moment";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ open, handleClose, lang, dir, onSave }) {
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
            const totalPrice = appState?.userInfo?.userCart?.lstProduct.reduce(
              (total, { strPrice, intQuantity }) => {
                return total + Number(strPrice) * intQuantity;
              },
              0
            );
            const bigOrderID = Number(generateRandomID(10));          
            const orderDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            const objInputOrder = {
               bigOrderID:bigOrderID,
               bigSystemID:appState.systemInfo.bigSystemID,
               bigUserID:appState.userInfo.bigUserID,
               lstProduct:appState.userInfo.userCart.lstProduct,
               strTotalPrice:`${totalPrice}`,
               jsnAddress:appState.userInfo.jsnAddress,
               jsnLocation:appState.userInfo.jsnLocation,
               dtmOrderDate:orderDate,
               jsnClientInfo:{
                bigUserID:appState.userInfo.bigUserID,
                strEmail:appState.userInfo.strEmail,
                strImgPath:appState.userInfo.strImgPath,
                jsnFullName:appState.userInfo.jsnFullName
               },
               jsnClientPayment:{
                strCardNumber: cardNumber,
                strCVV: cvv,
                strNameOnCard: cardName,
               },
               blnDelivered:false
            }
            const order = await createOrder(objInputOrder);
            if(order.bigOrderID){
              appState.userInfo.userCart = {
                lstProduct:[],
                strTotalPrice:""
              }
              appState.userInfo.userOrder = {
                ...objInputOrder
              }
              appDispatch({...appState});
              if(appState.userInfo.userOrder.bigOrderID){
                navigate(`/customer/dashboard/order/${appState.systemInfo.strSystemPathURL}`);
              }
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

export default Checkout;
