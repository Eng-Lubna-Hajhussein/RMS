import { Avatar, Grid, Typography } from "@mui/material";
import ownerAvatar from "assets/image/owner-avatar.jpg";
import React from "react";

const styles = {
  container: {
    marginY: "100px",
    paddingX: { lg: "60px", xs: "15px" },
  },
  title: {
    color: "#f3274c",
    fontSize: { lg: "25px", xs: "12px" },
    textTransform: "uppercase",
    fontWeight: "800",
  },
  subtitle: {
    color: "#000",
    fontSize: { lg: "50px", xs: "20px" },
    textTransform: "capitalize",
    fontWeight: "700",
  },
  ownerComment: {
    fontSize: { lg: "18px", xs: "10px" },
    color: "#555",
  },
  avatar: {
    height: { lg: "80px", xs: "50px" },
    width: { lg: "80px", xs: "50px" },
  },
  name: {
    fontSize: { lg: "24px", xs: "12px" },
    fontWeight: "700",
    color: "#000",
    textTransform: "capitalize",
  },
  specialization: {
    fontSize: { lg: "16px", xs: "8px" },
    color: "#555",
    textTransform: "capitalize",
  },
  heightFitContent: {
    height: "fit-content",
  },
};

function Owner({ lang, dir, jsnOwnerSection }) {
  return (
    <Grid container sx={styles.container}>
      <Grid
        item
        container
        lg="6"
        xs="12"
        pr={dir === "ltr" && 2}
        pl={dir === "rtl" && 2}
      >
        <Grid item xs="12">
          <Typography sx={styles.title}>
            {jsnOwnerSection.jsnTitle[lang]}
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography component={"h2"} sx={styles.subtitle}>
            {jsnOwnerSection.jsnSubtitle[lang]}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        lg="6"
        xs="12"
        pl={dir === "ltr" && 2}
        pr={dir === "rtl" && 2}
      >
        <Grid item xs="12">
          <Typography sx={styles.ownerComment}>
            {jsnOwnerSection.jsnOwnerComment[lang]}
          </Typography>
        </Grid>
        <Grid item container xs="12">
          <Grid item xs="2">
            <Avatar sx={styles.avatar} src={ownerAvatar} />
          </Grid>
          <Grid
            item
            container
            xs="10"
            sx={styles.heightFitContent}
            alignSelf={"center"}
          >
            <Grid item xs="12">
              <Typography sx={styles.name}>
                {jsnOwnerSection.jsnOwnerName[lang]}
              </Typography>
            </Grid>
            <Grid item xs="12">
              <Typography sx={styles.specialization}>
                {jsnOwnerSection.jsnOwnerSpecialization[lang]}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Owner;