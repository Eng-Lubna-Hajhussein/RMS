import React from "react";
import { Grid } from "@mui/material";
import Title0001 from "components/sharedUI/Title0001.js/Title0001";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  locationIframe: {
    borderRadius: "10px",
  },
};

function Location({ appState, lang, dir }) {
  return (
    <Grid item container xs={12}>
      <Grid item xs={12} p={2}>
        <Title0001 title={dictionary.customerSettings.location[lang]} dir={dir} />
      </Grid>
      <Grid item xs={12} container p={2}>
        <iframe
          src={`https://maps.google.com/maps?q=${appState?.userInfo?.jsnLocation?.lat}, ${appState?.userInfo?.jsnLocation?.long}&z=15&output=embed`}
          width="100%"
          height="350"
          frameborder="0"
          style={styles.locationIframe}
        />
      </Grid>
    </Grid>
  );
}

export default Location;
