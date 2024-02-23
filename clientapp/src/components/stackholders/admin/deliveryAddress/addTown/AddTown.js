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
import { dictionary } from "appHelper/appDictionary";
import { generateRandomID } from "appHelper/appFunctions";
import { objCategoriesType } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import { AppContext } from "contextapi/context/AppContext";
import React, { useContext } from "react";

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
  textField: {
    textTransform: "capitalize",
  },
};

function AddTown({ open, handleClose, bigParentID, lang, dir, onSave }) {
  const { appState } = useContext(AppContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { nameEng, nameArb } = formJson;
    const bigID = generateRandomID(10);
    const town = {
      bigID: Number(bigID),
      bigParentID: Number(bigParentID),
      jsnName: {
        eng: nameEng,
        arb: nameArb,
      },
      bigSystemID: appState.systemInfo.bigSystemID,
      bigCategoryTypeID: objCategoriesType.DeliveryAddress,
    };
    onSave(town);
    handleClose();
  }
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit
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
                <Title0001 title={dictionary.systemDeliveryAddress.addTown[lang]} dir={dir} />
              </Grid>
              <Grid item xs='12' lg="6" p={1}>
                <TextField
                  color="warning"
                  required
                  sx={styles.textField}
                  dir="ltr"
                  name="nameEng"
                  label={dictionary.labels.townNameEng[lang]}
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs='12' lg="6" p={1}>
                <TextField
                  color="warning"
                  required
                  sx={styles.textField}
                  name="nameArb"
                  label={dictionary.labels.townNameEng[lang]}
                  type="text"
                  dir="rtl"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={styles.dialogActions}>
          <Grid
            container
            p={2}
            // px={5}
            justifyItems={"flex-end"}
            justifyContent={"flex-end"}
          >
            <Grid item lg="3" xs='5'>
              <AnimButton0001
                label={dictionary.buttons.saveBtn[lang]}
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

export default AddTown;
