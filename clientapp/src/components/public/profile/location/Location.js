import React from "react";
import { Grid } from "@basetoolkit/ui";

const styles = {
  locationIframe: {
    borderRadius: "10px",
  },
};

function Location({ userInfo }) {
  return (
    <Grid item container xs="12" p={2}>
      <iframe
        src={`https://maps.google.com/maps?q=${userInfo?.userInfo?.jsnLocation?.lat}, ${userInfo?.userInfo?.jsnLocation?.long}&z=15&output=embed`}
        width="100%"
        height="350"
        frameborder="0"
        style={styles.locationIframe}
      />
    </Grid>
  );
}

export default Location;
