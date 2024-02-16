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
import AnimationEditor from "components/sharedUI/AnimationEditor/AnimationEditor";
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

function EditHeroContent({
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
  const bgAnimationTypes = [
    "squareTriangleCircleCross",
    "square",
    "cross",
    "circle",
    "triangle",
  ];
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();
  const [slide, setSlide] = useState({ ...content });
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const [openAnimationEditor, setOpenAnimationEditor] = useState(false);
  const handleTextEditorOpen = () => {
    setOpenTextEditor(true);
  };
  const handleTextEditorClose = () => setOpenTextEditor(false);

  const handleAnimationEditorOpen = () => {
    setOpenAnimationEditor(true);
  };
  const handleAnimationEditorClose = () => setOpenAnimationEditor(false);

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
  const onChangeAnimationEditor = (animationType) => {
    slide[slide.onAnimationKey].strAnimationType = animationType;
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
                    ...styles.title,
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.editHeroSection.slideImg[lang]}
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
                        {dictionary.buttons.changeSlideImg[lang]}
                      </Typography>
                    </Fab>
                  </label>
                </Grid>
                <Grid item xs="6" p={1} container justifyContent={"end"}>
                  <FormControl fullWidth>
                    <InputLabel sx={{ textTransform: "capitalize" }}>
                      {dictionary.labels.backgroundAnimation[lang]}
                    </InputLabel>
                    <Select
                      label={dictionary.labels.backgroundAnimation[lang]}
                      value={slide?.strBgAnimationType || "none"}
                      required
                      dir="ltr"
                      variant="outlined"
                      onChange={(e) =>
                        setSlide({
                          ...slide,
                          strBgAnimationType: e.target.value,
                        })
                      }
                      sx={{
                        background: "#fff",
                        borderRadius: "5px",
                        textTransform: "capitalize",
                      }}
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
                    ...styles.title,
                    borderLeft:
                      dir === "ltr" && `5px solid ${App_Second_Color}`,
                    borderRight:
                      dir === "rtl" && `5px solid ${App_Second_Color}`,
                  }}
                >
                  {dictionary.editHeroSection.title[lang]}
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
                      px={1}
                      sx={{
                        color: "#fff",
                        fontWeight: "800",
                        textTransform: "capitalize",
                      }}
                    >
                      {dictionary.buttons.textEditor[lang]}
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
                    onClick={() => {
                      setSlide({
                        ...slide,
                        onAnimationKey: "jsnTitle",
                        defaultStyle: titleDefaultStyle,
                      });
                      handleAnimationEditorOpen();
                    }}
                  >
                    <Typography
                      px={1}
                      sx={{
                        color: "#fff",
                        fontWeight: "800",
                        textTransform: "capitalize",
                      }}
                    >
                      {dictionary.buttons.textAnimation[lang]}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
                  required
                  name="titleEng"
                  label={dictionary.labels.titleEng[lang]}
                  dir="ltr"
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
                  defaultValue={slide.jsnTitle["arb"]}
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
                  {dictionary.editHeroSection.subtitle[lang]}
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
                      px={1}
                      sx={{
                        color: "#fff",
                        fontWeight: "800",
                        textTransform: "capitalize",
                      }}
                    >
                      {dictionary.buttons.textEditor[lang]}
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
                    onClick={() => {
                      setSlide({
                        ...slide,
                        onAnimationKey: "jsnSubtitle",
                        defaultStyle: subtitleDefaultStyle,
                      });
                      handleAnimationEditorOpen();
                    }}
                  >
                    <Typography
                      px={1}
                      sx={{
                        color: "#fff",
                        fontWeight: "800",
                        textTransform: "capitalize",
                      }}
                    >
                      {dictionary.buttons.textAnimation[lang]}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  sx={{textTransform:"capitalize"}}
                  required
                  name="subtitleEng"
                  label={dictionary.labels.subtitleEng[lang]}
                  dir="ltr"
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
                label={dictionary.buttons.saveBtn[lang]}
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
        <AnimationEditor
          dir={dir}
          lang={lang}
          handleClose={handleAnimationEditorClose}
          objText={slide}
          onChange={onChangeAnimationEditor}
          open={openAnimationEditor}
        />
      </Dialog>
    </React.Fragment>
  );
}

export default EditHeroContent;
