import React, { useState } from "react";
import {
  Box,
  Grid,
  Rating,
  Typography,
  Button,
  SvgIcon,
  useTheme,
} from "@basetoolkit/ui";
import { dictionary } from "appHelper/appDictionary";
import videoIcon from "assets/image/video.svg";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import AnimButton0002 from "components/sharedUI/AnimButton0002/AnimButton0002";
import EditHeroContent from "./EditHeroContent";
import AnimationBox from "components/sharedUI/AnimationBox/AnimationBox";

const styles = {
  container: {
    lg: { height: "580px", px: "60px" },
    xs: { height: "900px", px: "15px" },
  },
  title: {
    color: "#fff",
    textTransform: "capitalize",
    lineHeight: "1.2",
    lg: { width: "60%", fontSize: "50px !important" },
    xs: { fontSize: "30px !important" },
    fontWeight: "700",
    fontFamily: "Fredoka",
  },
  subtitle: {
    color: "#fff",
    textTransform: "capitalize",
    lineHeight: "34px",
    lg: { width: "60%", fontSize: "20.5px !important" },
    xs: { fontSize: "15px !important" },
    fontWeight: "500",
    fontFamily: "sans-serif",
  },
  box: {
    border: "3px solid #ffd40d",
    borderRadius: "30px",
    backgroundColor: "#000000d4",
    width: "100%",
    position: "relative",
    lg: { p: "20px 30px" },
    xs: { p: "15px 10px" },
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
    fontWeight: "700",
    lineHeight: "1.2",
    fontFamily: "sans-serif",
    display: "inline-block",
    textAlign: "left",
    lg: { fontSize: "28px" },
    xs: { fontSize: "20px" },
  },
  dollarSign: {
    color: "#f3274c",
    display: "inline-block",
    lg: { fontSize: "28px" },
    xs: { fontSize: "20px" },
  },
  boxSubtitle: {
    color: "#fff",
    fontWeight: "700",
    lineHeight: "1.2",
    textTransform: "capitalize",
    lg: { fontSize: "18px" },
    xs: { fontSize: "12px" },
  },
  py20: {
    paddingY: "20px",
  },
  editBox: {
    color: "#dad8d9",
  },
  editNote: {
    color: "#000",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  description: {
    color: "#555",
    fontWeight: "400",
    fontSize: "13px",
    lg: { height: "fit-content", overflowY: "hidden" },
    xs: { height: "40px !important", overflowY: "auto" },
  },
  videoBtn: {
    lg: { pt: "0px" },
    xs: { py: "30px !important" },
  },
};

function HeroContent({
  content,
  lstHeroSlides,
  lang,
  editable,
  onSaveHero,
  dir,
}) {
  const theme = useTheme();
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  return (
    <React.Fragment>
      {editable && (
        <Grid item container justifyContent={"start"} xs={12}>
          <Button
            variant="text"
            startIcon={<SvgIcon icon="edit" />}
            color="#dad8d9"
            style={{ padding: "0px" }}
            onClick={handleEditOpen}
          >
            <Typography sx={styles.editNote} color="#dad8d9">
              {dictionary.heroSection.title[lang]}
            </Typography>
          </Button>
        </Grid>
      )}
      <Grid
        container
        alignContent={"center"}
        alignItems={"center"}
        alignSelf={"center"}
        sx={styles.container}
        item
        xs={12}
      >
        <Grid container item xs={editable ? 11 : 12}>
          <Grid item xs={12} sx={styles.py20} justify={"start"}>
            <AnimationBox
              animationMode="loop"
              easing={"linear"}
              forceTrigger={true}
              trigger="manual"
              type={
                content?.jsnTitle?.strAnimationType
                  ? content?.jsnTitle?.strAnimationType
                  : "none"
              }
            >
              <Typography sx={{ ...styles.title, ...content.jsnTitle.style }}>
                {content.jsnTitle[lang]}
              </Typography>
            </AnimationBox>
          </Grid>
          <Grid item xs={12} sx={styles.py20}>
            <AnimationBox
              animationMode="loop"
              easing={"linear"}
              forceTrigger={true}
              trigger="manual"
              type={
                content?.jsnSubtitle?.strAnimationType
                  ? content?.jsnSubtitle?.strAnimationType
                  : "none"
              }
            >
              <Typography
                sx={{ ...styles.subtitle, ...content.jsnSubtitle.style }}
              >
                {content.jsnSubtitle[lang]}
              </Typography>
            </AnimationBox>
          </Grid>
          <Grid item lg={8} sx={styles.py20} xs={12}>
            <Grid container px={2} justify={"start"} alignItems={"flex-start"}>
              <Grid item lg={4} xs={12}>
                <AnimButton0001
                  label={dictionary.buttons.seeOurMenuBtn[lang]}
                  color={theme.palette.primary.main}
                />
              </Grid>
              <Grid item lg={4} xs={12} sx={styles.videoBtn}>
                <AnimButton0002
                  img={videoIcon}
                  src={"https://www.youtube.com/"}
                  label={dictionary.buttons.watchVideo[lang]}
                />
              </Grid>
            </Grid>
          </Grid>
          {content?.wsCategory && (
            <Grid
              item
              lg={4}
              xs={12}
              sx={{
                lg: { py: "0px" },
                xs: { py: "40px" },
              }}
            >
              <Grid container justify={"end"}>
                <Grid item lg={12} xs={12} alignSelf={"start"}>
                  <Box
                    outline="0"
                    elevation="0"
                    hoverElevation="0"
                    color="default"
                    textColor="default"
                    sx={styles.box}
                  >
                    <span style={styles.boxCaption}>
                      {dictionary.heroSection.weeklySpecial[lang]}
                    </span>
                    <Grid
                      container
                      justifyContent={"center"}
                      alignContent={"start"}
                    >
                      <Grid item xs={8} container justify={"start"}>
                        <Grid item xs={12} justify={"start"}>
                          <Typography dir="ltr" sx={styles.boxTitle}>
                            <Typography
                              dir="ltr"
                              component={"span"}
                              display="inline"
                              sx={styles.dollarSign}
                            >
                              $
                            </Typography>
                            {content.wsCategory.jsnCategoryInfo.strPrice}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography sx={styles.boxSubtitle}>
                            {content.wsCategory.jsnName[lang]}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography sx={styles.description}>
                            {
                              content.wsCategory.jsnCategoryInfo.jsnDescription[
                                lang
                              ]
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          {content?.wsCategory?.intRating && (
                            <Rating
                              name="read-only"
                              value={content.wsCategory.intRating}
                              readOnly
                            />
                          )}
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={4}
                        container
                        justifyContent={"center"}
                        alignContent={"center"}
                      >
                        <Box
                          component={"img"}
                          src={content.wsCategory.jsnCategoryInfo.strImgPath}
                          sx={{
                            lg: { height: "100px", width: "100px" },
                            xs: { height: "80px", width: "80px" },
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <EditHeroContent
        openEdit={openEdit}
        handleEditOpen={handleEditOpen}
        handleEditClose={handleEditClose}
        content={content}
        titleDefaultStyle={styles.title}
        subtitleDefaultStyle={styles.subtitle}
        lstHeroSlides={lstHeroSlides}
        onSave={onSaveHero}
        lang={lang}
        dir={dir}
      />
    </React.Fragment>
  );
}

export default HeroContent;
