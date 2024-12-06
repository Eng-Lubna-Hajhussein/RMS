import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from "@basetoolkit/ui";
import { App_Localhost_Client_Url } from "appHelper/appVariables";
import CopyToClipboardButton from "components/sharedUI/CopyToClipboardButton/CopyToClipboardButton";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import { AppContext } from "contextapi/context/AppContext";
import { useContext } from "react";

const styles = {
  dialogTitle: {
    height: "fit-content",
  },
  closeIcon: {
    cursor: "pointer",
  },
};

function SharedLink({ open, handleClose }) {
  const { appState } = useContext(AppContext);
  const lang = appState.clientInfo.strLanguage;
  const dir = appState.clientInfo.strDir;
  return (
    <Dialog open={open} onClose={handleClose} fullWidth >
      <DialogTitle sx={styles.dialogTitle}>
        <Grid container justifyContent={"end"}>
          <Close sx={styles.closeIcon} onClick={handleClose} />
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container py={1}>
          <Grid item xs={12} p={1}>
            <Title0001
              title={"Share Your Website Link:"}
              dir={dir}
            />
          </Grid>
          <Grid item xs={12} p={1}>
            <CopyToClipboardButton
              label="Your Restaurant Link"
              value={`${App_Localhost_Client_Url}${appState?.systemInfo?.strSystemPathURL}`}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default SharedLink;
