import { Grid, TextField } from "@mui/material";
import CopyToClipboardButton from "components/sharedUI/CopyToClipboardButton/CopyToClipboardButton";
import moment from "moment";
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
      <Grid item xs="12" py={1}  sx={{paddingX:{lg:"30px",xs:"0px"}}}>
        <CopyToClipboardButton
          label="User Profile Link"
          value={`http:/localhost:3000/customer/profile/${user.bigUserID}/${systemName}/${systemID}`}
        />
      </Grid>
      <Grid item xs="12" py={1}  sx={{paddingX:{lg:"30px",xs:"0px"}}}>
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
      <Grid item xs="12" py={1}  sx={{paddingX:{lg:"30px",xs:"0px"}}}>
        <TextField
          aria-readonly
          fullWidth
          value={user.strEmail}
          label={"User Email"}
          variant="outlined"
        />
      </Grid>
      <Grid item xs="12" py={1}  sx={{paddingX:{lg:"30px",xs:"0px"}}}>
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
      <Grid item lg="6" xs='12' py={1}  sx={{paddingX:{lg:"30px",xs:"0px"}}}>
        <TextField
          aria-readonly
          fullWidth
          value={moment(new Date(user.dtmCreatedDate)).format("YYYY-MM-DD")}
          label={"Joined Date"}
          variant="outlined"
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
          type="date"
        />
      </Grid>
      <Grid item lg="6" xs='12' py={1}  sx={{paddingX:{lg:"30px",xs:"0px"}}}>
        <TextField
          aria-readonly
          fullWidth
          value={moment(new Date(user.dtmUpdatedDate)).format("YYYY-MM-DD")}
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
