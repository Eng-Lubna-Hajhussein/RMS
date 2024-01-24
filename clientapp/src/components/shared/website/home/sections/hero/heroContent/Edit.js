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
import React, { useEffect, useState } from "react";

function Edit({
  openEdit,
  handleEditClose,
  lstHeroSlides,
  titleDefaultStyle,
  subtitleDefaultStyle,
  content,
  lang,
  dir,
  onSave,
}) {
  const bgAnimationTypes = ["squareTriangleCircleCross",
   "square", 
   "cross",
   "circle",
   "triangle",
  ];
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();
  const [slide, setSlide] = useState({ ...content });
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const handleTextEditorOpen = () => {
    setOpenTextEditor(true);
  };
  const handleTextEditorClose = () => setOpenTextEditor(false);

  const onImgChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({ intTotalFiles: [...e.target.files].length });
  };

  useEffect(() => {
    if (!!data && data[0]?.strFileFullPath) {
      setSlide({ ...slide, strImgPath: data[0]?.strFileFullPath });
    }
  }, [data]);
  const onChangeTextEditor = (style) => {
    slide[slide.onStyleKey].style = style;
    setSlide({ ...slide });
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
            const updatedSlides = JSON.parse(JSON.stringify(lstHeroSlides));
            updatedSlides[content.index] = {
              ...updatedSlides[content.index],
              jsnTitle: {
                eng: titleEng,
                arb: titleArb,
                style: slide.jsnTitle.style,
                strAnimationType: slide.jsnTitle.strAnimationType,
              },
              jsnSubtitle: {
                eng: subtitleEng,
                arb: subtitleArb,
                style: slide.jsnSubtitle.style,
                strAnimationType: slide.jsnSubtitle.strAnimationType,
              },
              strBgAnimationType: slide.strBgAnimationType,
              strImgPath: slide.strImgPath,
              strVideoPath: slide.strVideoPath,
            };
            onSave(updatedSlides);
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
                  Slide Image
                </Typography>
              </Grid>
              <Grid item xs="12" container>
                <Grid item xs="6" p={1} container justifyContent={"start"}>
                  <label htmlFor="upload-photo" style={{ width: "100%" }}>
                    <input
                      style={{ display: "none", width: "100%" }}
                      id="upload-photo"
                      name="upload-photo"
                      type="file"
                      onChange={onImgChange}
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
                        boxShadow: "none",
                        width: "100%",
                        height: "55px",
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
                <Grid item xs="6" p={1} container justifyContent={"end"}>
                  <FormControl fullWidth>
                    <InputLabel>Background Animation</InputLabel>
                    <Select
                      value={slide?.strBgAnimationType || "none"}
                      required
                      autoFocus
                      variant="outlined"
                      onChange={(e) =>
                        setSlide({
                          ...slide,
                          strBgAnimationType: e.target.value,
                        })
                      }
                      sx={{ background: "#fff", borderRadius: "5px" }}
                    >
                      <MenuItem value={"none"}>{"none"}</MenuItem>
                      {bgAnimationTypes.map((type, index) => (
                        <MenuItem value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs="12" container p={1}>
                <AnimationBG type={slide?.strBgAnimationType || "none"}>
                  <Box
                    component={"img"}
                    height="240px"
                    width={"100%"}
                    src={slide.strImgPath}
                    sx={{
                      backgroundSize: "100% 100%",
                      height: "280px",
                      borderRadius: "20px",
                      background: "red",
                    }}
                  />
                </AnimationBG>
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
              <Grid container item xs="12">
                <Grid item xs="6" p={1}>
                  <Button
                    color="secondary"
                    fullWidth
                    sx={{ height: "55px", boxShadow: "none" }}
                    variant="contained"
                    startIcon={<StyleOutlined />}
                    onClick={() => {
                      setSlide({
                        ...slide,
                        onStyleKey: "jsnTitle",
                        defaultStyle: titleDefaultStyle,
                      });
                      handleTextEditorOpen();
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: "800",
                        textTransform: "capitalize",
                      }}
                    >
                      Text Editor
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs="6" p={1}>
                  <Button
                    color="secondary"
                    fullWidth
                    sx={{ height: "55px", boxShadow: "none" }}
                    variant="contained"
                    startIcon={<AnimationOutlined />}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: "800",
                        textTransform: "capitalize",
                      }}
                    >
                      Text Animation
                    </Typography>
                  </Button>
                </Grid>
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
                  defaultValue={slide.jsnTitle["eng"]}
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
                  defaultValue={slide.jsnTitle["arb"]}
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
              <Grid container item xs="12">
                <Grid item xs="6" p={1}>
                  <Button
                    color="secondary"
                    fullWidth
                    sx={{ height: "55px", boxShadow: "none" }}
                    variant="contained"
                    startIcon={<StyleOutlined />}
                    onClick={() => {
                      setSlide({
                        ...slide,
                        onStyleKey: "jsnSubtitle",
                        defaultStyle: subtitleDefaultStyle,
                      });
                      handleTextEditorOpen();
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: "800",
                        textTransform: "capitalize",
                      }}
                    >
                      Text Editor
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs="6" p={1}>
                  <Button
                    color="secondary"
                    fullWidth
                    sx={{ height: "55px", boxShadow: "none" }}
                    variant="contained"
                    startIcon={<AnimationOutlined />}
                  >
                    <Typography
                      sx={{
                        color: "#fff",
                        fontWeight: "800",
                        textTransform: "capitalize",
                      }}
                    >
                      Text Animation
                    </Typography>
                  </Button>
                </Grid>
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
                  defaultValue={slide.jsnSubtitle["eng"]}
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
                  defaultValue={slide.jsnSubtitle["arb"]}
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
          objText={slide}
          onChange={onChangeTextEditor}
          open={openTextEditor}
        />
      </Dialog>
    </React.Fragment>
  );
}

export default Edit;
