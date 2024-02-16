import React from "react";
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
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  title: {
    fontWeight: "600",
    px: "3px",
    textTransform: "capitalize",
  },
  textfield:{
    textTransform:"capitalize"
  }
};

function EditReservation({
  openEdit,
  handleEditClose,
  jsnReservation,
  lang,
  dir,
  onSave,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const { titleEng, titleArb, descEng, descArb } = formJson;
            onSave({
              ...jsnReservation,
              jsnTitle: {
                eng: titleEng,
                arb: titleArb,
              },
              jsnDescription: {
                eng: descEng,
                arb: descArb,
              },
            });
            handleEditClose();
          },
        }}
        maxWidth="md"
      >
        <DialogTitle sx={{ height: "fit-content" }}>
          <Grid container justifyContent={"end"}>
            <Close sx={{ cursor: "pointer" }} onClick={handleEditClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ py: "0" }}>
          <Grid container py={1} justifyContent={"center"}>
            <Grid item container xs="12">
              <Grid item xs="12" p={1}>
                <Typography
                  sx={{
                    ...styles.title,
                    borderLeft:dir==='ltr'&&`5px solid ${App_Second_Color}`,
                    borderRight:dir==='rtl'&&`5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.editReservationSection.title[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={styles.textfield}
                  required
                  name="titleEng"
                  label={dictionary.labels.titleEng[lang]}
                  dir="ltr"
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={2}
                  defaultValue={jsnReservation.jsnTitle["eng"]}
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={styles.textfield}
                  required
                  dir="rtl"
                  name="titleArb"
                  label={dictionary.labels.titleArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  defaultValue={jsnReservation.jsnTitle["arb"]}
                />
              </Grid>
            </Grid>
            <Grid item container xs="12">
              <Grid item xs="12" p={1}>
                <Typography
                   sx={{
                    ...styles.title,
                    borderLeft:dir==='ltr'&&`5px solid ${App_Second_Color}`,
                    borderRight:dir==='rtl'&&`5px solid ${App_Second_Color}`,
                  }}
                >
                   {dictionary.editReservationSection.description[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={styles.textfield}
                  required
                  name="descEng"
                  label={dictionary.labels.descriptionEng[lang]}
                  dir="ltr"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  defaultValue={jsnReservation.jsnDescription["eng"]}
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={styles.textfield}
                  required
                  dir="rtl"
                  name="descArb"
                  label={dictionary.labels.descriptionArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  defaultValue={jsnReservation.jsnDescription["arb"]}
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

export default EditReservation;
