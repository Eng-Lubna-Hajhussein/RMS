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
  import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
  import AnimationBG from "components/sharedUI/AnimationBG/AnimationBG";
  import TextEditor from "components/sharedUI/TextEditor/TextEditor";
  import useUpload from "hooks/useUpload/useUpload";
  import React, { useEffect, useRef, useState } from "react";
  
  function Edit({
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
                  jsnTitle:{
                      eng:titleEng,
                      arb:titleArb
                  },
                  jsnSubtitle:{
                      eng:subtitleEng,
                      arb:subtitleArb
                  }
              })
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
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "600",
                      px: "3px",
                    }}
                  >
                   Section Title
                  </Typography>
                </Grid>
                <Grid item xs="6" p={1}>
                  <TextField
                    color="warning"
                    autoFocus
                    required
                    name="titleEng"
                    label="Title English"
                    type="text"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={2}
                    defaultValue={jsnAboutSection.jsnTitle["eng"]}
                  />
                </Grid>
                <Grid item xs="6" p={1}>
                  <TextField
                    color="warning"
                    autoFocus
                    required
                    dir="rtl"
                    name="titleArb"
                    label="Title Arabic"
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
                      borderLeft: `5px solid ${App_Second_Color}`,
                      fontWeight: "600",
                      px: "3px",
                    }}
                  >
                    Section Subtitle
                  </Typography>
                </Grid>
                <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  name="subtitleEng"
                  label="Subtitle English"
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  defaultValue={jsnAboutSection.jsnSubtitle["eng"]}
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  dir="rtl"
                  name="subtitleArb"
                  label="Subtitle Arabic"
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
  
  export default Edit;
  