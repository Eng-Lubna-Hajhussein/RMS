import { Grid } from "@basetoolkit/ui";

const styles = {
    locationIframe:{
        borderRadius: "10px"
    }
}

function Location({ userLocation }) {
  return (
    <Grid container py={1} px={3}>
      <iframe
        src={`https://maps.google.com/maps?q=${userLocation.lat}, ${userLocation.long}&z=5&output=embed`}
        width="100%"
        height="350"
        frameborder="0"
        style={styles.locationIframe}
      />
    </Grid>
  );
}

export default Location;
