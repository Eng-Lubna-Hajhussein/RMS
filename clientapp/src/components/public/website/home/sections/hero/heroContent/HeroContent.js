import React from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import { dictionary } from "appHelper/appDictionary";
import { App_Primary_Color } from "appHelper/appColor";
import videoIcon from "assets/image/video.svg";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import AnimButton0002 from "components/sharedUI/AnimButton0002/AnimButton0002";

const styles = {
  container: {
    height: { lg: "600px", xs: "700px" },
    paddingX: { lg: "60px", xs: "15px" },
  },
  title: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: { lg: "50px", xs: "30px" },
    lineHeight: "1.2",
    width: { lg: "60%" },
    fontWeight: "700",
    fontFamily: "Fredoka",
  },
  subtitle: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: { lg: "20.5px", xs: "15px" },
    lineHeight: "34px",
    width: { lg: "60%" },
    fontWeight: "500",
    fontFamily: "sans-serif",
  },
  box: {
    border: "3px solid #ffd40d",
    padding: "20px 30px",
    borderRadius: "30px",
    backgroundColor: "#000000d4",
    width: "100%",
    position: "relative",
  },
  boxCaption: {
    lineHeight: "14px",
    fontSize: "14px",
    color: "white",
    position: "absolute",
    padding: "6px 10px",
    textTransform: "capitalize",
    borderRadius: "5px",
    top: "-16px",
    fontFamily: "Epilogue",
    background: "#f3274c",
  },
  boxTitle: {
    color: "#fff",
    fontSize: "28px",
    fontWeight: "700",
    lineHeight: "1.2",
    fontFamily: "sans-serif",
    display: "inline-block",
    textAlign: "left",
  },
  dollarSign: {
    color: "#f3274c",
    fontSize: "28px",
    display: "inline-block",
  },
  boxSubtitle: {
    color: "#fff",
    fontWeight: "700",
    lineHeight: "1.2",
    fontSize: "18px",
  },
  py20:{
    paddingY:"20px"
  }
};

function HeroContent({ content, lang, dir }) {
  return (
    <Grid
      container
      alignContent={"center"}
      alignItems={"center"}
      alignSelf={"center"}
      justify={"center"}
      sx={styles.container}
      item
      xs="12"
    >
      <Grid
        item
        xs="12"
        sx={styles.py20}
        justify={"start"}
      >
        <Typography sx={styles.title}>{content.jsnTitle[lang]}</Typography>
      </Grid>
      <Grid item xs="12" sx={styles.py20}>
        <Typography sx={styles.subtitle}>
          {content.jsnSubtitle[lang]}
        </Typography>
      </Grid>
      <Grid
        item
        lg="8"
        sx={styles.py20}
        xs={"12"}
      >
        <Grid container spacing={2} justify={"start"} alignItems={"flex-start"}>
          <Grid item lg={"4"} xs={"12"}>
            <AnimButton0001
              label={dictionary.buttons.seeOurMenuBtn[lang]}
              color={App_Primary_Color}
            />
          </Grid>
          <Grid item lg={"4"} pt-5 xs={"12"}>
            <AnimButton0002
              img={videoIcon}
              label={dictionary.buttons.watchVideo[lang]}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={"4"}>
        <Grid container justify={"end"}>
          <Grid item lg="12" xs={"12"} alignSelf={"flex-start"}>
            <Box
              outline="0"
              elevation="0"
              hoverElevation="0"
              color="default"
              textColor="default"
              sx={styles.box}
            >
              <span style={styles.boxCaption}>Weekly Special</span>
              <Grid container justify={"center"} p-0 m-0>
                <Grid item xs="8" container justify={"start"}>
                  <Grid item xs="12" justify={"start"}>
                    <Typography sx={styles.boxTitle}>
                      <Typography sx={styles.dollarSign}>$</Typography>
                      {content.wsCategory.jsnProductInfo.strPrice}
                    </Typography>
                  </Grid>
                  <Grid item xs="12">
                    <Typography sx={styles.boxSubtitle}>
                      {content.wsCategory.jsnName[lang]}
                    </Typography>
                  </Grid>
                  <Grid item xs="12">
                    <Rating
                      name="read-only"
                      value={content.wsCategory.intRating}
                      readOnly
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs="4"
                  container
                  justifyContent={"center"}
                  alignContent={"center"}
                >
                  <Box
                    component={"img"}
                    src={content.wsCategory.jsnProductInfo.strImgPath}
                    height={"150px"}
                    width={"150px"}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HeroContent;
