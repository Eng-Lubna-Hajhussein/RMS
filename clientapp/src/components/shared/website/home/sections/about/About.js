import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Button0001 from "components/sharedUI/button0001/Button0001";
import { dictionary } from "appHelper/appDictionary";
import googlePlayIcon from "assets/image/google-play.png";
import appleIcon from "assets/image/apple.png";

const styles = {
  container: {
    marginY: "100px",
    background: "#f5f8fd",
    paddingX: { lg: "60px", xs: "15px" },
  },
  leftItemContainer: {
    paddingY: "50px",
  },
  title: {
    color: "#f3274c",
    fontSize: { lg: "25px", xs: "14px" },
    textTransform: "uppercase",
    fontWeight: "800",
  },
  subtitle: {
    fontSize: { lg: "50px", xs: "20px" },
    color: "#000",
    fontWeight: "800",
    textTransform: "capitalize",
  },
  circle: {
    border: "5px solid #ffd40d",
    height: "15px",
    width: "15px",
    borderRadius: "100%",
  },
  feature: {
    fontSize: { lg: "18px", xs: "10px" },
    fontWeight: "400",
    color: "#555",
    textTransform: "capitalize",
  },
  googlePlayBtn: {
    background: "#f3274c",
    paddingY: "15px",
    borderRadius: "15px",
    ":hover": { background: "#f3274c" },
  },
  appStoreBtn: {
    background: "#000",
    paddingY: "15px",
    borderRadius: "15px",
    ":hover": { background: "#000" },
  },
};

function About({ lang, dir, jsnAboutSection }) {
  return (
    <Grid container sx={styles.container}>
      <Grid item container lg="6" xs="12" sx={styles.leftItemContainer}>
        <Grid item xs="12">
          <Typography sx={styles.title}>
            {jsnAboutSection.jsnTitle[lang]}
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography sx={styles.subtitle}>
            {jsnAboutSection.jsnSubtitle[lang]}
          </Typography>
        </Grid>
        <Grid item xs="12" container py={3}>
          {jsnAboutSection.lstFeatures.map((feature) => (
            <Grid item xs="12" container py={1}>
              <Grid item container xs="1" px={1} alignContent={"center"}>
                <Box sx={styles.circle} />
              </Grid>
              <Grid item xs="10">
                <Typography sx={styles.feature}>{feature[lang]}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs="12" container>
          <Grid item lg="5" xs="6" px={2}>
            <Button0001
              startIcon={googlePlayIcon}
              label={dictionary.buttons.googlePlay[lang]}
              style={styles.appStoreBtn}
            />
          </Grid>
          <Grid item lg="5" xs="6" px={2}>
            <Button0001
              startIcon={appleIcon}
              label={dictionary.buttons.appStore[lang]}
              style={styles.googlePlayBtn}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container lg="6" xs="12">
        <Box
          component={"img"}
          src={jsnAboutSection.strImgPath}
          width={"100%"}
        />
      </Grid>
    </Grid>
  );
}

export default About;
