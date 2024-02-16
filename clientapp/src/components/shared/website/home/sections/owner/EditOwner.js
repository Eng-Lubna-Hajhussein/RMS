import {
  AnimationOutlined,
  Close,
  StyleOutlined,
  Upload,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  Typography,
  Box,
  Fab,
  Divider,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { dictionary } from "appHelper/appDictionary";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import AnimationBG from "components/sharedUI/AnimationBG/AnimationBG";
import TextEditor from "components/sharedUI/TextEditor/TextEditor";
import useUpload from "hooks/useUpload/useUpload";
import React, { useEffect, useState } from "react";

const styles = {
  title: {
    fontWeight: "600",
    px: "3px",
    textTransform: "capitalize",
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
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();

  const onImgChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({ intTotalFiles: [...e.target.files].length });
  };

  useEffect(() => {
    if (!!data && data[0]?.strFileFullPath) {
    }
  }, [data]);

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
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.editOwnerSection.title[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
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
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
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
                  {dictionary.editOwnerSection.subtitle[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
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
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
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
                  {dictionary.editOwnerSection.ownerSpecialization[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
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
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
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
                  {dictionary.editOwnerSection.ownerComment[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
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
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
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

export default EditOwner;
