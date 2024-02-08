import { Grid } from "@mui/material";

function Location ({userLocation}){
    return (
        <Grid container py={1} px={3}>
             <iframe
          src="https://maps.google.com/maps?q=35.856737, 10.606619&z=15&output=embed"
          width="100%"
          height="350"
          frameborder="0"
          style={{ borderRadius: "10px" }}
        ></iframe>
        </Grid>
    )
}

export default Location;