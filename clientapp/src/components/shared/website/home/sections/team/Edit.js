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
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { generateRandomID } from "appHelper/appFunctions";
import { objCategoriesType } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import useUpload from "hooks/useUpload/useUpload";
import React, { useEffect, useRef, useState } from "react";

function Edit({ open, handleClose, chef, lang, dir, onSave }) {
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();

  const onImgChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({ intTotalFiles: [...e.target.files].length });
  };

  const [img, setImg] = useState(chef?.strImgPath);

  useEffect(()=>{
    setImg(chef?.strImgPath)
  },[chef])

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
            const chefObj = {
              bigID: chef?.bigID,
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
            onSave(chefObj);
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
            <Grid item xs="6" container>
              <Grid item xs="12" p={1}>
                <Typography
                  sx={{
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "600",
                    px: "3px",
                  }}
                >
                  Chef Image
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
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "600",
                    px: "3px",
                  }}
                >
                  Chef Contact
                </Typography>
              </Grid>
              <Grid item xs="12" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  name="facebook"
                  label="Facebook"
                  type="url"
                  fullWidth
                  defaultValue={chef?.strFacebookLink}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="12" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  name="twitter"
                  label="Twitter"
                  type="url"
                  fullWidth
                  defaultValue={chef?.strInstagramLink}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="12" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  name="instagram"
                  label="Instagram"
                  type="url"
                  fullWidth
                  defaultValue={chef?.strTwitterLink}
                  variant="outlined"
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
                  Chef Name
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  name="nameEng"
                  label="Name English"
                  type="text"
                  fullWidth
                  defaultValue={chef?.jsnName['eng']}
                  variant="outlined"
                  multiline
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  dir="rtl"
                  name="nameArb"
                  label="Name Arabic"
                  type="text"
                  fullWidth
                  multiline
                  defaultValue={chef?.jsnName['arb']}
                  variant="outlined"
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
                  Chef Specialization
                </Typography>
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  name="specializationEng"
                  label="Specialization English"
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  defaultValue={chef?.jsnSpecialization['eng']}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs="6" p={1}>
                <TextField
                  color="warning"
                  autoFocus
                  required
                  dir="rtl"
                  name="specializationArb"
                  label="Specialization Arabic"
                  type="text"
                  fullWidth
                  multiline
                  rows={2}
                  defaultValue={chef?.jsnSpecialization['arb']}
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