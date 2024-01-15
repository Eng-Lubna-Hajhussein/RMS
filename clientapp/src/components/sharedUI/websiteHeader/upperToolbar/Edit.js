import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";

function Edit({ openEdit, handleEditClose }) {
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
          const email = formJson.email;
          console.log(email);
          handleEditClose();
        },
      }}
      maxWidth="md"
    >
      <DialogTitle sx={{ height: "fit-content" }}>
        <Grid container justifyContent={"end"}>
          <Close />
        </Grid>
      </DialogTitle>
      <DialogContent sx={{py:"0"}}>
        <Grid container py={1} justifyContent={'center'}>
          <Grid item container xs="12">
            <Grid item xs='12' p={1}>
                <Typography sx={{borderLeft:`5px solid ${App_Second_Color}`,fontWeight:"600",px:"3px"}}>System Contact</Typography>
            </Grid>
            <Grid item xs="6" p={1}>
              <TextField
                color="warning"
                autoFocus
                required
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                defaultValue={'lubna@gmail.com'}
              />
            </Grid>
            <Grid item xs="6" p={1}>
              <TextField
                color="warning"
                autoFocus
                required
                name="phone"
                label="Phone Number"
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item container xs="12">
          <Grid item xs='12' p={1}>
                <Typography sx={{borderLeft:`5px solid ${App_Second_Color}`,fontWeight:"600",px:"3px"}}>System Social</Typography>
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
                variant="outlined"
              />
            </Grid>
            <Grid item xs="12" p={1}>
              <TextField
                color="warning"
                autoFocus
                required
                name="youtube"
                label="Youtube"
                type="url"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{py:"0"}}>
        <Grid container p={2} justifyItems={"flex-end"} justifyContent={"flex-end"}>
          <Grid item xs="3">
            <AnimButton0001
              label={"save"}
              color={App_Primary_Color}
              fullWidth={true}
              type='submit'
            />
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
}

export default Edit;
