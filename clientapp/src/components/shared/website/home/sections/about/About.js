import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Button0001 from "components/sharedUI/button0001/Button0001";
import { dictionary } from "appHelper/appDictionary";
import googlePlayIcon from "assets/image/google-play.png";
import appleIcon from "assets/image/apple.png";
import EditAbout from "./EditAbout";

const styles = {
  container: {
    marginY: { lg: "100px", xs: "20px" },
    // paddingX: { lg: "60px", xs: "10px" },
    background: "#f5f8fd",
  },
  containerItem: {
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
  editNote: {
    color: "#000",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  editBox: {
    background: "#dad8d9",
  },
  downloadContainer: {
    marginTop: { xs: "20px" },
  },
};

function About({ lang, dir, jsnAboutSection, editable, onSaveAbout }) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  return (
    <React.Fragment>
      <Grid container sx={styles.container}>
        {editable && (
          <Grid
            item
            container
            justifyContent={"start"}
            sx={styles.editBox}
            xs={12}
          >
            <Button variant="text" onClick={handleEditOpen}>
              <Typography sx={styles.editNote}>
                {dictionary.aboutSection.title[lang]}
              </Typography>
            </Button>
          </Grid>
        )}
        <Grid item container sx={styles.containerItem} xs={12}>
          <Grid item container lg={6} xs={12} sx={styles.leftItemContainer}>
            <Grid item xs={12}>
              <Typography sx={styles.title}>
                {jsnAboutSection.jsnTitle[lang]}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={styles.subtitle}>
                {jsnAboutSection.jsnSubtitle[lang]}
              </Typography>
            </Grid>
            <Grid item xs={12} container py={2}>
              <Grid item lg={5} px={1} xs={6}>
                <Button0001
                  startIcon={googlePlayIcon}
                  label={dictionary.buttons.googlePlay[lang]}
                  style={styles.appStoreBtn}
                />
              </Grid>
              <Grid item lg={5} px={1} xs={6}>
                <Button0001
                  startIcon={appleIcon}
                  label={dictionary.buttons.appStore[lang]}
                  style={styles.googlePlayBtn}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item container lg={6} xs={12}>
            <Box
              component={"img"}
              src={jsnAboutSection.strImgPath}
              width={"100%"}
            />
          </Grid>
        </Grid>
      </Grid>
      <EditAbout
        openEdit={openEdit}
        handleEditOpen={handleEditOpen}
        handleEditClose={handleEditClose}
        jsnAboutSection={jsnAboutSection}
        onSave={onSaveAbout}
        lang={lang}
        dir={dir}
      />
    </React.Fragment>
  );
}

export default About;
