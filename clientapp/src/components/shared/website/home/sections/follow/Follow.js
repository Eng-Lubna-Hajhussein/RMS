import { Instagram } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import bgImg from "assets/image/follow.jpg";

const styles = {
  container: {
    marginY: "100px",
    background: `url(${bgImg})`,
    backgroundSize: "100% 100%",
    height: "500px",
  },
  containerItem: {
    height: "100%",
    backgroundColor: "#ffffffdd",
  },
  box: {
    background: "#f3274c",
    height: "90px",
    width: "90px",
    borderRadius: "100%",
  },
  instagramIcon: {
    color: "#fff",
  },
  title: {
    fontSize: "40px",
    color: "#000",
    fontWeight: "800",
  },
  subTitle: {
    fontSize: "16px",
    color: "#555",
    fontWeight: "400",
  },
  fullHeight:{
    height:"100%"
  }
};

export default function Follow() {
  return (
    <Grid container sx={styles.container}>
      <Grid
        item
        container
        alignContent={"center"}
        alignItems={"center"}
        xs="12"
        sx={styles.containerItem}
      >
        <Grid item xs="12" container justifyContent={"center"}>
          <Box sx={styles.box}>
            <Grid
              container
              item
              xs="12"
              sx={styles.fullHeight}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Instagram fontSize="large" sx={styles.instagramIcon} />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs="12" container justifyContent={"center"}>
          <Typography sx={styles.title}>Follow @Winsfolio.com</Typography>
        </Grid>
        <Grid item xs="12" container justifyContent={"center"}>
          <Typography sx={styles.subTitle}>
            Join our community to inspire your desires
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
