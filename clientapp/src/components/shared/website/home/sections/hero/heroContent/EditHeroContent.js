import React, { useEffect, useState } from "react";
import { AnimationOutlined, Close, StyleOutlined } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";
import { dictionary } from "appHelper/appDictionary";
import { bgAnimationTypes } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import AnimationBG from "components/sharedUI/AnimationBG/AnimationBG";
import AnimationEditor from "components/sharedUI/AnimationEditor/AnimationEditor";
import TextEditor from "components/sharedUI/TextEditor/TextEditor";
import UploadButton001 from "components/sharedUI/UploadButton001/UploadButton001";
import useUpload from "hooks/useUpload/useUpload";
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
  inputLabel: {
    textTransform: "capitalize",
  },
  select: {
    background: "#fff",
    borderRadius: "5px",
    textTransform: "capitalize",
  },
  bgBox: {
    backgroundSize: "100% 100%",
    height: "280px",
    borderRadius: "20px",
    background: "red",
  },
  btnLabel: {
    color: "#fff",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  btn: {
    height: "55px",
    boxShadow: "none",
  },
  textField: {
    textTransform: "capitalize",
  },
  dialogActions: { py: "0" },
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
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();
  const [slide, setSlide] = useState({ ...content });
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const [openAnimationEditor, setOpenAnimationEditor] = useState(false);
  const handleTextEditorOpen = () => {
    setOpenTextEditor(true);
  };
  const handleTextEditorClose = () => {
    setOpenTextEditor(false);
  };
  const handleAnimationEditorOpen = () => {
    setOpenAnimationEditor(true);
  };
  const handleAnimationEditorClose = () => {
    setOpenAnimationEditor(false);
  };

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
  const onChangeBgAnimation = (e) =>
    setSlide({
      ...slide,
      strBgAnimationType: e.target.value,
    });
  const onClickTextEditor = (onStyleKey, defaultStyle) => {
    setSlide({
      ...slide,
      onStyleKey: onStyleKey,
      defaultStyle: defaultStyle,
    });
    handleTextEditorOpen();
  };
  const onClickAnimationEditor = (onAnimationKey, defaultStyle) => {
    setSlide({
      ...slide,
      onAnimationKey: onAnimationKey,
      defaultStyle: defaultStyle,
    });
    handleAnimationEditorOpen();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
                  title={dictionary.editHeroSection.slideImg[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item xs={12} container>
                <Grid item xs={6} p={1} container justifyContent={"start"}>
                  <UploadButton001
                    onChange={onImgChange}
                    label={dictionary.buttons.changeSlideImg[lang]}
                    fullWidth={true}
                    variant={"square"}
                  />
                </Grid>
                <Grid item xs={6} p={1} container justifyContent={"end"}>
                  <FormControl fullWidth>
                    <InputLabel sx={styles.inputLabel}>
                      {dictionary.labels.backgroundAnimation[lang]}
                    </InputLabel>
                    <Select
                      label={dictionary.labels.backgroundAnimation[lang]}
                      value={slide?.strBgAnimationType || "none"}
                      required
                      dir="ltr"
                      variant="outlined"
                      onChange={onChangeBgAnimation}
                      sx={styles.select}
                    >
                      <MenuItem value={"none"}>{"none"}</MenuItem>
                      {bgAnimationTypes.map((type, index) => (
                        <MenuItem key={index} value={type}>{type}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={12} container p={1}>
                <AnimationBG type={slide?.strBgAnimationType || "none"}>
                  <Box
                    component={"img"}
                    height="240px"
                    width={"100%"}
                    src={slide.strImgPath}
                    sx={styles.bgBox}
                  />
                </AnimationBG>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.editHeroSection.title[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={6} p={1}>
                  <Button
                    color="secondary"
                    fullWidth
                    sx={styles.btn}
                    variant="contained"
                    startIcon={<StyleOutlined />}
                    onClick={() =>
                      onClickTextEditor("jsnTitle", titleDefaultStyle)
                    }
                  >
                    <Typography px={1} sx={styles.btnLabel}>
                      {dictionary.buttons.textEditor[lang]}
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} p={1}>
                  <Button
                    color="secondary"
                    fullWidth
                    sx={styles.btn}
                    variant="contained"
                    startIcon={<AnimationOutlined />}
                    onClick={() =>
                      onClickAnimationEditor("jsnTitle", titleDefaultStyle)
                    }
                  >
                    <Typography px={1} sx={styles.btnLabel}>
                      {dictionary.buttons.textAnimation[lang]}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={6} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
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
              <Grid item xs={6} p={1}>
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
                  defaultValue={slide.jsnTitle["arb"]}
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.editHeroSection.subtitle[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={6} p={1}>
                  <Button
                    color="secondary"
                    fullWidth
                    sx={styles.btn}
                    variant="contained"
                    startIcon={<StyleOutlined />}
                    onClick={() =>
                      onClickTextEditor("jsnSubtitle", subtitleDefaultStyle)
                    }
                  >
                    <Typography px={1} sx={styles.btnLabel}>
                      {dictionary.buttons.textEditor[lang]}
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={6} p={1}>
                  <Button
                    color="secondary"
                    fullWidth
                    sx={styles.btn}
                    variant="contained"
                    startIcon={<AnimationOutlined />}
                    onClick={() =>
                      onClickAnimationEditor(
                        "jsnSubtitle",
                        subtitleDefaultStyle
                      )
                    }
                  >
                    <Typography px={1} sx={styles.btnLabel}>
                      {dictionary.buttons.textAnimation[lang]}
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={6} p={1}>
                <TextField
                  color="warning"
                  sx={styles.textField}
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
              <Grid item xs={6} p={1}>
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
                  defaultValue={slide.jsnSubtitle["arb"]}
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
            <Grid item xs={2}>
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
