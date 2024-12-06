import { Instagram } from "@mui/icons-material";
import { Box, Grid, Typography } from "@basetoolkit/ui";
import { dictionary } from "appHelper/appDictionary";
import bgImg from "assets/image/follow.jpg";

const styles = {
  container: {
    lg: { my: "100px", px: "60px !important" },
    xs: { my: "20px", px: "10px !important" },
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
    lg: { fontSize: "40px" },
    xs: { fontSize: "20px" },
    color: "#000",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  subTitle: {
    lg: { fontSize: "16px" },
    xs: { fontSize: "12px" },
    color: "#555",
    fontWeight: "400",
    textTransform: "capitalize",
  },
  fullHeight: {
    height: "100%",
  },
};

export default function Follow({ lang }) {
  return (
    <Grid container sx={styles.container}>
      <Grid
        item
        container
        alignContent={"center"}
        alignItems={"center"}
        xs={12}
        sx={styles.containerItem}
      >
        <Grid item xs={12} container justifyContent={"center"}>
          <Box sx={styles.box}>
            <Grid
              container
              item
              xs={12}
              sx={styles.fullHeight}
              justifyContent={"center"}
              alignContent={"center"}
            >
              <Instagram fontSize="large" sx={styles.instagramIcon} />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} container justifyContent={"center"}>
          <Typography sx={styles.title}>
            {dictionary.followSection.title[lang]}
          </Typography>
        </Grid>
        <Grid item xs={12} container justifyContent={"center"}>
          <Typography sx={styles.subTitle}>
            {dictionary.followSection.subtitle[lang]}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
