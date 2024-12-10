import { Grid, TextField, useMediaQueryMatch, useTheme } from "@basetoolkit/ui";
import { dictionary } from "appHelper/appDictionary";
import CopyToClipboardButton from "components/sharedUI/CopyToClipboardButton/CopyToClipboardButton";
import moment from "moment";
import { useParams } from "react-router-dom";

const styles = {
  username: {
    cursor: "pointer",
    textTransform: "capitalize",
  },
};

function PersonalInfo({ user, lang, dir }) {
  const { systemName, systemID } = useParams();
  const theme = useTheme();
  const isExtraSmallAndDown = useMediaQueryMatch(theme.breakpoints.down("xs"));
  return (
    <Grid container>
      <Grid item xs="12" py={1} px={isExtraSmallAndDown ? 0 : "30px"}>
        <CopyToClipboardButton
          label={dictionary.labels.userProfileLink[lang]}
          value={`http:/localhost:3000/profile/${user.bigUserID}/${systemName}/${systemID}`}
        />
      </Grid>
      <Grid item xs="12" py={1} px={isExtraSmallAndDown ? 0 : "30px"}>
        <TextField
          readOnly
          fullWidth
          value={user.jsnFullName[lang]}
          sx={styles.username}
          label={dictionary.labels.userFullName[lang]}
          variant="outlined"
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
        />
      </Grid>
      <Grid item xs="12" py={1} px={isExtraSmallAndDown ? 0 : "30px"}>
        <TextField
          readOnly
          fullWidth
          value={user.strEmail}
          label={dictionary.labels.userEmail[lang]}
          variant="outlined"
        />
      </Grid>
      <Grid item xs="12" py={1} px={isExtraSmallAndDown ? 0 : "30px"}>
        <TextField
          readOnly
          fullWidth
          value={
            user.jsnAddress.jsnCity[lang] +
            ", " +
            user.jsnAddress.jsnCountry[lang]
          }
          label={dictionary.labels.userAddress[lang]}
          variant="outlined"
          inputProps={{
            style: { textTransform: "capitalize", direction: dir },
          }}
        />
      </Grid>
      <Grid item lg="6" xs="12" py={1} px={isExtraSmallAndDown ? 0 : "30px"}>
        <TextField
          readOnly
          fullWidth
          value={moment(new Date(user.dtmCreatedDate)).format("YYYY-MM-DD")}
          label={dictionary.labels.joinedDate[lang]}
          variant="outlined"
          inputProps={{
            style: { textTransform: "capitalize" },
          }}
          type="date"
        />
      </Grid>
      <Grid item lg="6" xs="12" py={1} px={isExtraSmallAndDown ? 0 : "30px"}>
        <TextField
          readOnly
          fullWidth
          value={moment(new Date(user.dtmUpdatedDate)).format("YYYY-MM-DD")}
          label={dictionary.labels.lastUpdate[lang]}
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
