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
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";

const styles = {
  title: {
    fontWeight: "600",
    px: "3px",
    textTransform: "capitalize",
  },
  textfield: {
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
  dialogActions: {
    py: "0",
  },
};

function EditUpperToolbar({
  openEdit,
  handleEditClose,
  jsnSystemContact,
  onSave,
  dir,
  lang,
}) {
  return (
    <Dialog
      open={openEdit}
      onClose={handleEditClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const { email, phone, facebook, instagram, youtube } = formJson;
          const updatedContacts = {
            strEmail: email,
            strPhone: phone,
            strFacebook: facebook,
            strInstagram: instagram,
            strYoutube: youtube,
          };
          onSave(updatedContacts);

          handleEditClose();
        },
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
                title={dictionary.editUpperHeaderSection.title[lang]}
                dir={dir}
              />
            </Grid>
            <Grid item lg={6} xs="12" p={1}>
              <TextField
                color="warning"
                required
                dir="ltr"
                name="email"
                label={dictionary.labels.emailAddress[lang]}
                sx={styles.textfield}
                type="email"
                fullWidth
                variant="outlined"
                defaultValue={jsnSystemContact.strEmail}
              />
            </Grid>
            <Grid item lg={6} xs="12" p={1}>
              <TextField
                color="warning"
                dir="ltr"
                required
                name="phone"
                label={dictionary.labels.phoneNumber[lang]}
                sx={styles.textfield}
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={jsnSystemContact.strPhone}
              />
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12} p={1}>
              <Title0001
                title={dictionary.editUpperHeaderSection.subtitle[lang]}
                dir={dir}
              />
            </Grid>
            <Grid item xs={12} p={1}>
              <TextField
                color="warning"
                required
                name="facebook"
                label={dictionary.labels.facebook[lang]}
                sx={styles.textfield}
                type="url"
                fullWidth
                dir="ltr"
                variant="outlined"
                defaultValue={jsnSystemContact.strFacebook}
              />
            </Grid>
            <Grid item xs={12} p={1}>
              <TextField
                color="warning"
                required
                name="instagram"
                label={dictionary.labels.instagram[lang]}
                sx={styles.textfield}
                type="url"
                fullWidth
                dir="ltr"
                variant="outlined"
                defaultValue={jsnSystemContact.strInstagram}
              />
            </Grid>
            <Grid item xs={12} p={1}>
              <TextField
                color="warning"
                required
                dir="ltr"
                name="youtube"
                label={dictionary.labels.youtube[lang]}
                sx={styles.textfield}
                type="url"
                fullWidth
                variant="outlined"
                defaultValue={jsnSystemContact.strYoutube}
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={styles.dialogActions}>
        <Grid
          container
          p={2}
          justifyItems={"flex-end"}
          justifyContent={"flex-end"}
        >
          <Grid item lg={2} xs="6">
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
  );
}

export default EditUpperToolbar;
