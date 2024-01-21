import { Close, Upload } from "@mui/icons-material";
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
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import TextEditor from "components/sharedUI/TextEditor/TextEditor";
import useUpload from "hooks/useUpload/useUpload";
import React, { useState } from "react";

function Edit({
  openEdit,
  handleEditClose,
  lstHeroSlides,
  titleDefaultStyle,
  content,
  lang,
  dir,
  onSave,
}) {
  const [slideImg, setSlideImg] = useState(content.strImgPath);
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();
  const [lstSlides, setLstSlides] = useState(
    JSON.parse(JSON.stringify(lstHeroSlides))
  );
  const [activeEl, setActiveEl] = useState({});
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const handleTextEditorOpen = () => {
    // handleEditClose();
    setOpenTextEditor(true);
  };
  const handleTextEditorClose = () => setOpenTextEditor(false);
  // const [slides,setSlides] = useState(JSON.parse(JSON.stringify(lstHeroSlides)));
  const onLogoChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({ intTotalFiles: [...e.target.files].length });
    if (!!data && data[0]?.strFileFullPath) {
      setSlideImg(data[0].strFileFullPath);
    }
  };
  const onSaveTextEditor = (style) => {
    // setActiveEl({...activeEl,style:style})
    lstSlides[content.index][activeEl.type].style = style;
    setLstSlides([...lstSlides]);
    onSave(lstSlides);
  };
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
            lstSlides[content.index] = {
              ...lstSlides[content.index],
              jsnTitle: { eng: titleEng, arb: titleArb },
              jsnSubtitle: { eng: subtitleEng, arb: subtitleArb },
            };
            setLstSlides([...lstSlides]);
            onSave(lstSlides);
            handleEditClose();
          },
        }}
        maxWidth="lg"
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
                  Slide Image
                </Typography>
              </Grid>
              <Grid
                item
                container
                sx={{
                  background: `url(${slideImg})`,
                  height: "200px",
                  backgroundColor: "#ffffffaa",
                  backgroundSize: "100% 100%",
                  borderRadius: "20px",
                }}
                xs="12"
              >
                <Grid
                  item
                  container
                  sx={{
                    height: "200px",
                    backgroundColor: "#ffffffaa",
                    borderRadius: "20px",
                  }}
                  xs="12"
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  <label htmlFor="upload-photo">
                    <input
                      style={{ display: "none" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={onLogoChange}
                    />

                    <Fab
                      size="large"
                      component="span"
                      aria-label="add"
                      variant="extended"
                      sx={{
                        borderRadius: "5px",
                        background: App_Second_Color,
                        ":hover": { background: App_Second_Color },
                        width: "100%",
                      }}
                    >
                      <Upload />
                      <Typography
                        px={2}
                        sx={{
                          textTransform: "capitalize",
                          color: "#fff",
                          fontWeight: "800",
                        }}
                      >
                        Change Slide Image
                      </Typography>
                    </Fab>
                  </label>
                </Grid>
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
                  Slide Title
                </Typography>
              </Grid>
              <Grid item xs="12">
                <Button>AnimationBox</Button>
              </Grid>
              <Grid item xs="12">
                <Button
                  onClick={() => {
                    setActiveEl({
                      ...content.jsnTitle,
                      type: "jsnTitle",
                      defaultStyle: titleDefaultStyle,
                      bgImg: content.strImgPath,
                    });
                    handleTextEditorOpen();
                  }}
                >
                  TextEditor
                </Button>
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
                  defaultValue={content.jsnTitle["eng"]}
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
                  defaultValue={content.jsnTitle["arb"]}
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
                  Slide Subtitle
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
                  defaultValue={content.jsnSubtitle["eng"]}
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
                  defaultValue={content.jsnSubtitle["arb"]}
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
      <TextEditor
        dir={dir}
        lang={lang}
        handleClose={handleTextEditorClose}
        objText={activeEl}
        onSave={onSaveTextEditor}
        open={openTextEditor}
      />
      </Dialog>
    </React.Fragment>
  );
}

export default Edit;
