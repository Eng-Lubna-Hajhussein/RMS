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
  dialogTitle: {
    height: "fit-content",
  },
  closeIcon: {
    cursor: "pointer",
  },
  dialogContent: {
    py: "0",
  },
  textField: {
    textTransform: "capitalize",
  },
  dialogActions: {
    py: "0",
  },
};

function EditAbout({
  openEdit,
  handleEditClose,
  jsnAboutSection,
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
            const { titleEng, titleArb, subtitleEng, subtitleArb } = formJson;
            onSave({
              ...jsnAboutSection,
              jsnTitle: {
                eng: titleEng,
                arb: titleArb,
              },
              jsnSubtitle: {
                eng: subtitleEng,
                arb: subtitleArb,
              },
            });
            handleEditClose();
          },
        }}
        maxWidth="md"
      >
        <DialogTitle sx={styles.dialogTitle}>
          <Grid container justifyContent={"end"}>
            <Close sx={styles.closeIcon} onClick={handleEditClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={styles.dialogContent}>
          <Grid container py={1} justifyContent={"center"}>
            <Grid item container xs="12">
              <Grid item xs="12" p={1}>
                <Typography
                  sx={{
                    ...styles.title,
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.editAboutSection.title[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  name="titleEng"
                  label={dictionary.labels.titleEng[lang]}
                  type="text"
                  fullWidth
                  sx={styles.textField}
                  variant="outlined"
                  multiline
                  rows={2}
                  defaultValue={jsnAboutSection.jsnTitle["eng"]}
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  dir="rtl"
                  sx={styles.textField}
                  name="titleArb"
                  label={dictionary.labels.titleArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  defaultValue={jsnAboutSection.jsnTitle["arb"]}
                />
              </Grid>
            </Grid>
            <Grid item container xs="12">
              <Grid item xs="12" p={1}>
                <Typography
                  sx={{
                    ...styles.title,
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.editAboutSection.subtitle[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  name="subtitleEng"
                  label={dictionary.labels.subtitleEng[lang]}
                  type="text"
                  fullWidth
                  sx={styles.textField}
                  multiline
                  rows={2}
                  variant="outlined"
                  defaultValue={jsnAboutSection.jsnSubtitle["eng"]}
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  dir="rtl"
                  sx={styles.textField}
                  name="subtitleArb"
                  label={dictionary.labels.subtitleArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  defaultValue={jsnAboutSection.jsnSubtitle["arb"]}
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

export default EditAbout;