import React from "react";
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
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";

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

function EditOwner({
  openEdit,
  handleEditClose,
  jsnOwnerSection,
  lang,
  dir,
  onSave,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const {
      titleEng,
      titleArb,
      subtitleEng,
      subtitleArb,
      ownerSpecializationEng,
      ownerSpecializationArb,
      ownerCommentEng,
      ownerCommentArb,
    } = formJson;
    onSave({
      ...jsnOwnerSection,
      jsnTitle: {
        eng: titleEng,
        arb: titleArb,
      },
      jsnSubtitle: {
        eng: subtitleEng,
        arb: subtitleArb,
      },
      jsnOwnerComment: {
        eng: ownerCommentEng,
        arb: ownerCommentArb,
      },
      jsnOwnerSpecialization: {
        eng: ownerSpecializationEng,
        arb: ownerSpecializationArb,
      },
    });
    handleEditClose();
  };
  return (
    <React.Fragment>
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
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
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.editOwnerSection.title[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
                  required
                  name="titleEng"
                  dir="ltr"
                  label={dictionary.labels.titleEng[lang]}
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={2}
                  defaultValue={jsnOwnerSection.jsnTitle["eng"]}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
                  required
                  dir="rtl"
                  name="titleArb"
                  label={dictionary.labels.titleArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  defaultValue={jsnOwnerSection.jsnTitle["arb"]}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.editOwnerSection.subtitle[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
                  required
                  name="subtitleEng"
                  dir="ltr"
                  label={dictionary.labels.subtitleEng[lang]}
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={2}
                  defaultValue={jsnOwnerSection.jsnSubtitle["eng"]}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
                  required
                  dir="rtl"
                  name="subtitleArb"
                  label={dictionary.labels.subtitleArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  defaultValue={jsnOwnerSection.jsnSubtitle["arb"]}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.editOwnerSection.ownerSpecialization[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
                  required
                  dir="ltr"
                  name="ownerSpecializationEng"
                  label={dictionary.labels.ownerSpecializationEng[lang]}
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={2}
                  defaultValue={jsnOwnerSection.jsnOwnerSpecialization["eng"]}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
                  required
                  dir="rtl"
                  name="ownerSpecializationArb"
                  label={dictionary.labels.ownerSpecializationArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  defaultValue={jsnOwnerSection.jsnOwnerSpecialization["arb"]}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.editOwnerSection.ownerComment[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
                  required
                  name="ownerCommentEng"
                  dir="ltr"
                  label={dictionary.labels.ownerCommentEng[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  defaultValue={jsnOwnerSection.jsnOwnerComment["eng"]}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
                  required
                  dir="rtl"
                  name="ownerCommentArb"
                  label={dictionary.labels.ownerCommentArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                  defaultValue={jsnOwnerSection.jsnOwnerComment["arb"]}
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
            <Grid item xs={6}>
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

export default EditOwner;
