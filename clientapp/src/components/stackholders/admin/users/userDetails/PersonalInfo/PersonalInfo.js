import { Grid, TextField } from "@mui/material";
import CopyToClipboardButton from "components/sharedUI/CopyToClipboardButton/CopyToClipboardButton";
import { useParams } from "react-router-dom";

const styles = {
  username: {
    cursor: "pointer",
    textTransform: "capitalize",
  },
};

function PersonalInfo({ user, lang }) {
  const { systemName, systemID } = useParams();
  return (
    <Grid container>
      <Grid item xs="12" py={1} px={3}>
        <CopyToClipboardButton
          label="User Profile Link"
          value={`http:/localhost:3000/customer/profile/${user.bigUserID}/${systemName}/${systemID}`}
        />
      </Grid>
      <Grid item xs="12" py={1} px={3}>
        <TextField
          aria-readonly
          fullWidth
          value={user.jsnFullName[lang]}
          sx={styles.username}
          label={"User Full Name"}
          variant="outlined"
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
        />
      </Grid>
      <Grid item xs="12" py={1} px={3}>
        <TextField
          aria-readonly
          fullWidth
          value={user.strEmail}
          label={"User Email"}
          variant="outlined"
        />
      </Grid>
      <Grid item xs="12" py={1} px={3}>
        <TextField
          aria-readonly
          fullWidth
          value={
            user.jsnAddress.jsnCity[lang] +
            ", " +
            user.jsnAddress.jsnCountry[lang]
          }
          label={"User Address"}
          variant="outlined"
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
        />
      </Grid>
      <Grid item xs="6" py={1} px={3}>
        <TextField
          aria-readonly
          fullWidth
          value={user.dtmCreatedDate}
          label={"Joined Date"}
          variant="outlined"
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
          type="date"
        />
      </Grid>
      <Grid item xs="6" py={1} px={3}>
        <TextField
          aria-readonly
          fullWidth
          value={user.dtmUpdatedDate}
          label={"Last Updated Date"}
          variant="outlined"
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
          type="date"
        />
      </Grid>
    </Grid>
  );
}

export default PersonalInfo;
