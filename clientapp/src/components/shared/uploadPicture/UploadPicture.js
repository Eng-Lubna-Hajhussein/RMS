import {
  AddAPhoto,
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
  Avatar,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import { generateRandomID } from "appHelper/appFunctions";
import { objCategoriesType } from "appHelper/appVariables";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { AppContext } from "contextapi/context/AppContext";
import useUpload from "hooks/useUpload/useUpload";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ctrlUploadPicture } from "./controller/CtrlUploadPicture";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import { dictionary } from "appHelper/appDictionary";

function UploadPicture({ open, handleClose }) {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();

  const onImgChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({ intTotalFiles: [...e.target.files].length });
  };
  const [img, setImg] = useState(appState?.userInfo?.strImgPath);

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
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            ctrlUploadPicture.handelSubmit({
              appDispatch: appDispatch,
              appState: appState,
              img: img,
            });
            handleClose();
          },
        }}
        maxWidth="sm"
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
            <Grid item xs={12} container justifyContent={"center"}>
              <Grid item xs={12} py={2}>
                 <Title0001 title={dictionary.shared.profilePicture[lang]} dir={dir} />
              </Grid>
              <Grid
                item
                xs={12}
                p={1}
                container
                justifyContent={"center"}
                alignContent={"center"}
                sx={{
                  height: "fit-content",
                  border: "4px dashed #ececec",
                  borderRadius: "10px",
                  position: "relative",
                }}
              >
                <Grid
                  item
                  xs={12}
                  container
                  justifyContent={"center"}
                  sx={{ position: "absolute", top: "40%", bottom: "60%" }}
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
                        boxShadow: "none",
                        borderRadius: "10px",
                      }}
                    >
                      <AddAPhoto />
                    </Fab>
                  </label>
                </Grid>
                <Grid item xs={12} container justifyContent={"center"}>
                  <Avatar src={img} sx={{ height: "200px", width: "200px" }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ py: "0" }}>
          <Grid
            container
            p={2}
            // px={5}
            justifyItems={"flex-end"}
            justifyContent={"flex-end"}
          >
            <Grid item lg={3} xs={5}>
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

export default UploadPicture;
