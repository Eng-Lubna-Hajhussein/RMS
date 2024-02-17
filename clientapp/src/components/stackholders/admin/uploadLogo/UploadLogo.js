import React, { useContext, useEffect, useState } from "react";
import { Close, Upload } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Fab,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { AppContext } from "contextapi/context/AppContext";
import useUpload from "hooks/useUpload/useUpload";
import { ctrlUploadPicture } from "./controller/CtrlUploadLogo";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import UploadButton001 from "components/sharedUI/UploadButton001/UploadButton001";

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
  fitContentHeight: {
    height: "fit-content",
  },
  container: {
    height: "186px",
    border: "4px dashed #ececec",
    borderRadius: "10px",
  },
  logoImgBox: {
    height: "150px",
    backgroundSize: "100% 100%",
  },
  dialogActions: {
    py: "0",
  },
};

function UploadLogo({ open, handleClose, lang, dir }) {
  const { appState, appDispatch } = useContext(AppContext);
  const { data, error, isPending, setRequestFiles, setUserData } = useUpload();

  const onImgChange = (e) => {
    setRequestFiles([...e.target.files]);
    setUserData({ intTotalFiles: [...e.target.files].length });
  };

  const [img, setImg] = useState(appState.systemInfo.strLogoPath);

  useEffect(() => {
    if (!!data && data[0]?.strFileFullPath) {
      setImg(data[0]?.strFileFullPath);
    }
  }, [data]);

  const handelSubmit = (event) => {
    event.preventDefault();
    ctrlUploadPicture.handelSubmit({
      appDispatch: appDispatch,
      appState: appState,
      img: img,
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          component: "form",
          onSubmit: handelSubmit,
        }}
        maxWidth="sm"
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
            sx={styles.fitContentHeight}
          >
            <Grid item xs="12" container justifyContent={"center"}>
              <Grid item xs="12" py={2}>
                <Title0001 title={"Profile Picture Image"} dir={dir} />
              </Grid>
              <Grid
                item
                xs="12"
                p={1}
                container
                justifyContent={"center"}
                alignContent={"center"}
                sx={styles.container}
              >
                <Grid
                  item
                  xs="8"
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                  sx={{
                    background: `url(${img})`,
                    ...styles.logoImgBox,
                  }}
                >
                  <UploadButton001 onChange={onImgChange} />
                </Grid>
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
            <Grid item xs="4">
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

export default UploadLogo;
