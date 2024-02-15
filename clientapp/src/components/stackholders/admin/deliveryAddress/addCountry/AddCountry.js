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
import { objCategoriesType } from "appHelper/appVariables";
  import { createOrder } from "appHelper/fetchapi/tblOrder/tblOrder";
  import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
  import { AppContext } from "contextapi/context/AppContext";
  import moment from "moment";
  import React, { useContext } from "react";
  import { useNavigate } from "react-router-dom";
  
  function AddCountry({ open, handleClose, lang, dir, onSave }) {
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
              const {nameEng,nameArb} = formJson;
              const bigID = generateRandomID(10);
              const country = {
                  bigID:Number(bigID),
                  bigParentID:0,
                  jsnName:{
                    eng:nameEng,
                    arb:nameArb
                  },
                  bigSystemID:appState.systemInfo.bigSystemID,
                  bigCategoryTypeID:objCategoriesType['DeliveryAddress'],
              }
              onSave(country);
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
                    Add Country
                  </Typography>
                </Grid>
                <Grid item xs="6" p={1}>
                  <TextField
                    color="warning"
                    required
                    name="nameEng"
                    label="Country Name English"
                    type="text"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs="6" p={1}>
                  <TextField
                    color="warning"
                    required
                    name="nameArb"
                    label="Country Name Arabic"
                    type="text"
                    dir="rtl"
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
              <Grid item xs="3">
                <AnimButton0001
                  label={"save"}
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
  
  export default AddCountry;