import {
  AnimationOutlined,
  Close,
  Favorite,
  FavoriteBorder,
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
  Checkbox,
  FormGroup,
  FormControlLabel,
  Alert,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { dictionary } from "appHelper/appDictionary";
import { generateRandomID } from "appHelper/appFunctions";
import { objCategoriesType } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import useUpload from "hooks/useUpload/useUpload";
import React, { useEffect, useRef, useState } from "react";

const styles = {
  title: {
    fontWeight: "600",
    px: "3px",
    textTransform: "capitalize",
  },
};

function AddChef({
  open,
  handleClose,
  activeTabID,
  addWS,
  ws,
  lang,
  dir,
  onSave,
}) {
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

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
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
          },
        }}
        maxWidth="md"
      >
        <DialogTitle sx={{ height: "fit-content" }}>
          <Grid container justifyContent={"end"}>
            <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Grid>
        </DialogTitle>
        <DialogContent sx={{ py: "0" }}>
          <Grid
            container
            py={1}
            justifyContent={"start"}
            alignContent={"start"}
            alignItems={"start"}
            sx={{ height: "fit-content" }}
          >
            <Grid item xs="12" container>
              {/* remove bg */}
            </Grid>
            <Grid item xs="6" container>
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
                  {dictionary.teamSection.chefImg[lang]}
                </Typography>
              </Grid>
              <Grid
                item
                xs="12"
                p={1}
                container
                justifyContent={"center"}
                alignContent={"center"}
              >
                <Grid
                  item
                  container
                  xs="12"
                  p={1}
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={{
                    height: "fit-content",
                    border: "4px dashed #ececec",
                    borderRadius: "10px",
                  }}
                >
                  <Grid
                    item
                    xs="8"
                    container
                    justifyContent={"center"}
                    alignContent={"center"}
                    sx={{
                      height: "180px",
                      background: `url(${img})`,
                      backgroundSize: "100% 100%",
                    }}
                  >
                    <label htmlFor="upload-photo">
                      <input
                        style={{ display: "none" }}
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
                          background: App_Second_Color,
                        }}
                      >
                        <Upload />
                      </Fab>
                    </label>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container xs="6">
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
                  {dictionary.teamSection.chefContact[lang]}
                </Typography>
              </Grid>
              <Grid item xs="12" p={1}>
                <TextField
                  color="warning"
                  required
                  name="facebook"
                  sx={{textTransform:"capitalize"}}
                  label={dictionary.labels.facebook[lang]}
                  dir="ltr"
                  type="url"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="12" p={1}>
                <TextField
                  color="warning"
                  required
                  name="twitter"
                  sx={{textTransform:"capitalize"}}
                  label={dictionary.labels.twitter[lang]}
                  dir="ltr"
                  type="url"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="12" p={1}>
                <TextField
                  color="warning"
                  required
                  name="instagram"
                  sx={{textTransform:"capitalize"}}
                  label={dictionary.labels.instagram[lang]}
                  dir="ltr"
                  type="url"
                  fullWidth
                  variant="outlined"
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
                  {dictionary.teamSection.chefName[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  name="nameEng"
                  sx={{textTransform:"capitalize"}}
                  label={dictionary.labels.nameEng[lang]}
                  dir="ltr"
                  type="text"
                  fullWidth
                  variant="outlined"
                  multiline
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  dir="rtl"
                  name="nameArb"
                  sx={{textTransform:"capitalize"}}
                  label={dictionary.labels.nameArb[lang]}
                  type="text"
                  fullWidth
                  multiline
                  variant="outlined"
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
                  {dictionary.teamSection.chefSpecialization[lang]}
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  name="specializationEng"
                  sx={{textTransform:"capitalize"}}
                  label={dictionary.labels.specializationEng[lang]}
                  dir="ltr"
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  required
                  dir="rtl"
                  name="specializationArb"
                  sx={{textTransform:"capitalize"}}
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

export default AddChef;