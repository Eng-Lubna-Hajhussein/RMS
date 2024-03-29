import { Box, Grid, Typography } from "@mui/material";

const styles = {
  box: {
    width: "100%",
    background: "#f4fcfc !important",
    height: { lg: "100px", xs: "80px" },
    borderRadius: "20px",
    paddingX: "20px",
  },
  title: {
    textTransform: "capitalize",
    color: "#555",
    fontSize: { lg: "14px", xs: "12px" },
  },
  description: {
    textTransform: "capitalize",
    color: "#000",
    fontSize: { lg: "25px", xs: "15px" },
    fontWeight: "800 !important",
  },
  icon: {
    padding: { lg: "18px", xs: "10px" },
    background: "#ffd40d",
    borderRadius: "10px",
  },
  logo: {
    width: "150px",
  },
  container: {
    height: "fit-content",
    marginY: "50px",
    borderRadius: "20px",
    padding: "20px",
  },
  systemName: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    fontSize: "30px",
  },
  systemAddress: {
    fontWeight: "700",
    fontSize: "15px",
    textTransform: "capitalize",
  },
  fitContentHeight: {
    height: "fit-content",
  },
  fullHeight: {
    height: "100%",
  },
};

function Box001({ title, description, img }) {
  return (
    <Box sx={styles.box}>
      <Grid container sx={styles.fullHeight}>
        <Grid
          item
          xs={10}
          container
          alignContent={"center"}
          sx={styles.fullHeight}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography sx={styles.title}>{title}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={styles.description}>{description}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={2}
          container
          alignContent={"center"}
          justifyContent={"end"}
          sx={styles.fullHeight}
        >
          <Box component={"img"} src={img} sx={styles.icon} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Box001;
