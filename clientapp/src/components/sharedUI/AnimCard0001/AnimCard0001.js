import { Button, Grid, Paper, Typography } from "@mui/material";
import "./AnimCard0001.css";

const styles = {
  paper: {
    width: "100%",
    height: "450px",
    borderRadius: "30px !important",
  },
  frontCard: {
    border: "4px solid #ffd40d",
    height: "100%",
    borderRadius: "30px",
    position: "relative",
    padding: "0 !important",
    margin: "0 !important",
  },
  fullHeight: {
    height: "100%",
    padding: "0 !important",
    margin: "0 !important",
  },
  frontBtn: {
    width: "102% !important",
    maxWidth: "102% !important",
    minWidth: "102% !important",
    borderRadius: "30px !important",
    padding: "0 !important",
    margin: "0 !important",
    fontFamily: "sans-serif !important",
    height: "55px !important",
    boxShadow: "none !important",
    background: "#ffd40d !important",
    position: "absolute",
    bottom: "-1px",
    color: "#000",
    textAlign: "center",
    textTransform: "capitalize",
  },
  frontTitle: {
    fontSize: "22px",
    fontWeight: "900",
    fontFamily: "sans-serif",
    color: "#000",
  },
  title: {
    color: "#fff",
    fontSize: "30px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  description: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: "200px",
    lineHeight: "30px",
  },
  btn: {
    background: "#fff",
    padding: "25px",
    borderRadius: "20px",
    ":hover": { background: "#fff" },
  },
  label: {
    color: "#000",
    fontWeight: "800",
    textTransform: "capitalize",
  },
};

export default function AnimCard0001({ title, description, bgImg, label }) {
  return (
    <Paper
      className="anim-card-0001"
      sx={{
        ...styles.paper,
        background: `url(${bgImg})`,
      }}
    >
      <Grid item xs={12} sx={styles.frontCard} justify={"center"}>
        <Grid container alignItems={"flex-end"} sx={styles.fullHeight}>
          <Grid
            item
            xs={12}
            sx={styles.frontBtn}
            container
            alignContent={"center"}
            justifyContent={"center"}
          >
            <Typography sx={styles.frontTitle}>{title}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyItems={"center"}
        className="back-card"
      >
        <Grid item xs={12}>
          <Typography sx={styles.title}>{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={styles.description}>{description}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" sx={styles.btn}>
            <Typography sx={styles.label}>{label}</Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
