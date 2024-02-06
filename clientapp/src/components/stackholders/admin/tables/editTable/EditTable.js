import { Close } from "@mui/icons-material";
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
import { ctrlTables } from "../controller/CtrlTables";

function EditTable({
  open,
  handleClose,
  table,
  isLoading,
  setIsLoading,
  tables,
  setTables,
  lang,
  dir,
}) {
  const { appState, appDispatch } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ table });
  }, [table]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            // const { seatsNum, pricePerHour } = formJson;
            ctrlTables.updateTable({
              bigTableID: table.bigTableID,
              formData: formJson,
              isLoading:isLoading,
              setIsLoading:setIsLoading,
              tables:tables,
              setTables:setTables
            });
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
                  Edit Table Info
                </Typography>
              </Grid>
              <Grid item xs="12" p={1}>
                <TextField
                  color="warning"
                  required
                  name="seatsNum"
                  label="Seats Number"
                  type="number"
                  fullWidth
                  defaultValue={table?.intSeatsNumber}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  name="pricePerHour"
                  label="Price Per Hour"
                  type="text"
                  defaultValue={table?.strTablePrice}
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
                label={"Save"}
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

export default EditTable;
