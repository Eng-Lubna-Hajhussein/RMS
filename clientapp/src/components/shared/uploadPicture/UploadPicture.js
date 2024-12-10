import { AddAPhoto, Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Avatar,
  Button,
} from "@basetoolkit/ui";
import { App_Primary_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import VisuallyHiddenInput from "components/sharedUI/VisuallyHiddenInput/VisuallyHiddenInput";
import { AppContext } from "contextapi/context/AppContext";
import useUpload from "hooks/useUpload/useUpload";
import React, { useContext, useEffect, useState } from "react";
import { ctrlUploadPicture } from "./controller/CtrlUploadPicture";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import { dictionary } from "appHelper/appDictionary";

function UploadPicture({ open, handleClose }) {
  const { appState, appDispatch } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  const { data, setRequestFiles, setUserData } = useUpload();

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
                <Title0001
                  title={dictionary.shared.profilePicture[lang]}
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
                  <Button
                    size="large"
                    component="label"
                    aria-label="add"
                    variant="contained"
                    role={undefined}
                    tabIndex={-1}
                    sx={{
                      boxShadow: "none",
                      borderRadius: "50% !important",
                      p: "15px !important",
                    }}
                    type="button"
                  >
                    <AddAPhoto />
                    <VisuallyHiddenInput type="file" onChange={onImgChange} />
                  </Button>
                </Grid>
                <Grid item xs={12} container justifyContent={"center"}>
                  <Avatar src={img} height={200} width={200} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ py: "0" }}>
          <Grid
            container
            p={2}
            justifyItems={"end"}
            justifyContent={"end"}
            width={"100%"}
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
