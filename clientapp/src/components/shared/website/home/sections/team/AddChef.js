import React, { useEffect, useState } from "react";
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
import { generateRandomID } from "appHelper/appFunctions";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import UploadButton001 from "components/sharedUI/UploadButton001/UploadButton001";
import useUpload from "hooks/useUpload/useUpload";

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
  heightFitContent: {
    height: "fit-content",
  },
  chefImgContainer: {
    height: "fit-content",
    border: "4px dashed #ececec",
    borderRadius: "10px",
  },
  chefImg: {
    height: "180px",
    backgroundSize: "100% 100%",
  },
  textField:{
    textTransform:"capitalize"
  },
  dialogActions:{
    py: "0"
  }
};

function AddChef({ open, handleClose, lang, dir, onSave }) {
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();

  const onImgChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({ intTotalFiles: [...e.target.files].length });
  };

  const [img, setImg] = useState(null);

  useEffect(() => {
    if (!!data && data[0]?.strFileFullPath) {
      setImg(data[0]?.strFileFullPath);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const {
      nameEng,
      nameArb,
      specializationEng,
      specializationArb,
      facebook,
      instagram,
      twitter,
    } = formJson;
    const bigID = generateRandomID(10);
    const chef = {
      bigID: Number(bigID),
      jsnName: { eng: nameEng, arb: nameArb },
      jsnSpecialization: {
        eng: specializationEng,
        arb: specializationArb,
      },
      strFacebookLink: facebook,
      strInstagramLink: instagram,
      strTwitterLink: twitter,
      strImgPath: img,
    };
    setImg(null);
    onSave(chef);
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
          <Grid
            container
            py={1}
            justifyContent={"start"}
            alignContent={"start"}
            alignItems={"start"}
            sx={styles.heightFitContent}
          >
            <Grid item lg={6} xs={12} container>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.teamSection.chefImg[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid
                item
                xs={12}
                p={1}
                container
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Grid
                  item
                  container
                  xs={12}
                  p={1}
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={styles.chefImgContainer}
                >
                  <Grid
                    item
                    xs={8}
                    container
                    justifyContent={"center"}
                    alignContent={"center"}
                    sx={{
                      background: `url(${img})`,
                      ...styles.chefImg,
                    }}
                  >
                    <UploadButton001 onChange={onImgChange} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container lg={6} xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.teamSection.chefContact[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  name="facebook"
                  sx={styles.textField}
                  label={dictionary.labels.facebook[lang]}
                  dir="ltr"
                  type="url"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  name="twitter"
                  sx={styles.textField}
                  label={dictionary.labels.twitter[lang]}
                  dir="ltr"
                  type="url"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  name="instagram"
                  sx={styles.textField}
                  label={dictionary.labels.instagram[lang]}
                  dir="ltr"
                  type="url"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.teamSection.chefName[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  name="nameEng"
                  sx={styles.textField}
                  label={dictionary.labels.nameEng[lang]}
                  dir="ltr"
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  dir="rtl"
                  name="nameArb"
                  sx={styles.textField}
                  label={dictionary.labels.nameArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12} p={1}>
                <Title0001
                  title={dictionary.teamSection.chefSpecialization[lang]}
                  dir={dir}
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  name="specializationEng"
                  sx={styles.textField}
                  label={dictionary.labels.specializationEng[lang]}
                  dir="ltr"
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={6} xs={12} p={1}>
                <TextField
                  color="warning"
                  required
                  dir="rtl"
                  name="specializationArb"
                  sx={styles.textField}
                  label={dictionary.labels.specializationArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
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
            px={5}
            justifyItems={"flex-end"}
            justifyContent={"flex-end"}
          >
            <Grid item lg={2} xs={6}>
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

export default AddChef;
