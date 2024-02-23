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

function EditCity({
  open,
  handleClose,
  jsnName,
  bigID,
  bigParentID,
  lang,
  dir,
  onSave,
}) {
  const { appState } = useContext(AppContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const { nameEng, nameArb } = formJson;
    const city = {
      bigID: bigID,
      bigParentID: bigParentID,
      jsnName: {
        eng: nameEng,
        arb: nameArb,
      },
      bigSystemID: appState.systemInfo.bigSystemID,
      bigCategoryTypeID: objCategoriesType.DeliveryAddress,
    };
    onSave(city);
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
                <Title0001 title={dictionary.systemDeliveryAddress.editCity[lang]} dir={dir} />
              </Grid>
              <Grid item lg="6" xs='12' p={1}>
                <TextField
                  color="warning"
                  required
                  dir="ltr"
                  sx={styles.textField}
                  name="nameEng"
                  label={dictionary.labels.cityNameEng[lang]}
                  defaultValue={jsnName?.eng}
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item lg="6" xs='12' p={1}>
                <TextField
                  color="warning"
                  required
                  name="nameArb"
                  sx={styles.textField}
                  label={dictionary.labels.cityNameArb[lang]}
                  defaultValue={jsnName?.arb}
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
            <Grid item xs='5' lg="3">
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

export default EditCity;
