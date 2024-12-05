import { Box, Button, Grid, Typography } from "@basetoolkit/ui";
import React, { useState } from "react";
import EditOwner from "./EditOwner";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  container: {
    lg:{my:"100px",px:"60px"},
    xs:{my:"20px",px:"15px"}
  },
  title: {
    color: "#f3274c",
    textTransform: "uppercase",
    fontWeight: "800",
    lg:{fontSize:"25px"},
    xs:{fontSize:"12px"}
  },
  subtitle: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "700",
    lg:{fontSize:"50px"},
    xs:{fontSize:"20px"}
  },
  ownerComment: {
    color: "#555",
    lg:{fontSize:"18px"},
    xs:{fontSize:"10px"}
  },
  avatar: {
    lg:{height:"80px",width:"80px"},
    xs:{height:"50px",width:"50px"}
  },
  name: {
    fontWeight: "700",
    color: "#000",
    textTransform: "capitalize",
    lg:{fontSize:"24px"},
    xs:{fontSize:"12px"}
  },
  specialization: {
    color: "#555",
    textTransform: "capitalize",
    lg:{fontSize:"16px"},
    xs:{fontSize:"8px"}
  },
  heightFitContent: {
    height: "fit-content",
  },
  logo: {
    width: "150px",
    height: "30px",
  },
  editBox: {
    background: "#dad8d9",
  },
  editNote: {
    color: "#000",
    fontSize: "15px",
    fontWeight: "600",
    textTransform: "capitalize",
  },
};

function Owner({
  lang,
  dir,
  jsnOwnerSection,
  onSaveOwner,
  editable,
  websiteLogo,
}) {
  const [openEdit, setOpenEdit] = useState(false);
  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);
  return (
    <React.Fragment>
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
              {dictionary.ownerSection.title[lang]}
            </Typography>
          </Button>
        </Grid>
      )}
      <Grid container sx={styles.container}>
        <Grid
          item
          container
          lg={6}
          xs={12}
          pr={dir === "ltr" && 2}
          pl={dir === "rtl" && 2}
        >
          <Grid item xs={12}>
            <Typography sx={styles.title}>
              {jsnOwnerSection.jsnTitle[lang]}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component={"h2"} sx={styles.subtitle}>
              {jsnOwnerSection.jsnSubtitle[lang]}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          lg={6}
          xs={12}
          pl={dir === "ltr" && 2}
          pr={dir === "rtl" && 2}
        >
          <Grid item xs={12}>
            <Typography sx={styles.ownerComment}>
              {jsnOwnerSection.jsnOwnerComment[lang]}
            </Typography>
          </Grid>
          <Grid item container xs={12} alignContent={"center"}>
            <Grid item xs={12}>
              <Box component={"img"} sx={styles.logo} src={websiteLogo} />
            </Grid>
            <Grid
              item
              container
              xs={12}
              sx={styles.heightFitContent}
              alignSelf={"center"}
            >
              <Grid item xs={12}>
                <Typography sx={styles.name}>
                  {jsnOwnerSection.jsnOwnerName[lang]}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography sx={styles.specialization}>
                  {jsnOwnerSection.jsnOwnerSpecialization[lang]}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <EditOwner
        openEdit={openEdit}
        handleEditOpen={handleEditOpen}
        handleEditClose={handleEditClose}
        jsnOwnerSection={jsnOwnerSection}
        onSave={onSaveOwner}
        lang={lang}
        dir={dir}
      />
    </React.Fragment>
  );
}

export default Owner;
