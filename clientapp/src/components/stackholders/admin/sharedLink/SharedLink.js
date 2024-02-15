import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import { App_Second_Color } from "appHelper/appColor";
import { App_Localhost_Client_Url } from "appHelper/appVariables";
import CopyToClipboardButton from "components/sharedUI/CopyToClipboardButton/CopyToClipboardButton";
import { AppContext } from "contextapi/context/AppContext";
import { useContext } from "react";

function SharedLink({open,handleClose}) {
  const { appState } = useContext(AppContext);
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ height: "fit-content" }}>
          <Grid container justifyContent={"end"}>
            <Close sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Grid>
        </DialogTitle>
      <DialogContent >
        <Grid container py={1}>
        <Grid item xs="12" p={1}>
                <Typography
                  sx={{
                    borderLeft: `5px solid ${App_Second_Color}`,
                    fontWeight: "600",
                    px: "3px",
                  }}
                >
                  Share Your Restaurant Website Link:
                </Typography>
              </Grid>
          <Grid item xs="12" p={1}>
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
