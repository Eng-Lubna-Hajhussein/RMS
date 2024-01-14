import React from "react";
import { Box, Grid, Icon, Paper, Typography } from "@mui/material";
import { FacebookSharp, Instagram, Twitter } from "@mui/icons-material";

const styles = {
  chefContent: {
    width: "280px !important",
    height: "280px !important",
    borderRadius: "50% !important",
    transition: ".3s ease-in-out",
    backgroundColor: "#fff !important",
    border: "7px solid #f5f8fd !important",
    pointer: "cursor",
    marginTop: "-140px",
    zIndex: "222 !important",
  },
  specialization: {
    color: "#f3274c",
    fontSize: "18px !important",
    fontWeight: "800 !important",
  },
  name: {
    fontSize: "30px !important",
    transition: "3s ease-in-out",
    color: "#000",
    fontWeight: "900 !important",
    transition: ".3s ease-in-out",
    fontFamily: "san-serif",
  },
  social: {
    transition: ".3s ease-in-out",
    backgroundColor: "#f5f8fd !important",
    borderRadius: "50%",
    height: "50px",
    width: "50px",
    ":hover": { backgroundColor: "#ffd40d !important" },
  },
  imgContainer: {
    zIndex: "-1",
    height: "fit-content",
  },
  contentContainer: {
    zIndex: "111",
    height: "140px",
  },
  fullHeight: {
    height: "100%",
  },
};

function TeamCard({ item, lang }) {
  return (
    <>
      <Grid item xs="12" sx={styles.imgContainer}>
        <Box
          component={"img"}
          src={item.strImgPath}
          width={"100%"}
          height={"350px"}
        />
      </Grid>
      <Grid
        item
        xs="12"
        container
        justifyContent={"center"}
        sx={styles.contentContainer}
      >
        <Box className="chef-content" sx={styles.chefContent}>
          <Grid
            container
            item
            xs="12"
            alignItems={"center"}
            justifyContent={"center"}
            alignContent={"center"}
            sx={styles.fullHeight}
          >
            <Grid item xs="12" container justifyContent={"center"}>
              <Typography sx={styles.specialization}>
                {item.jsnSpecialization[lang]}
              </Typography>
            </Grid>
            <Grid item xs="12" container justifyContent={"center"}>
              <Typography sx={styles.name}>{item.jsnName[lang]}</Typography>
            </Grid>
            <Grid item xs="12" container justifyContent={"center"}>
              <Grid item xs="3" container justifyContent={"center"}>
                <Box sx={styles.social}>
                  <Grid
                    container
                    item
                    xs="12"
                    justifyContent={"center"}
                    alignContent={"center"}
                    sx={styles.fullHeight}
                  >
                    <FacebookSharp />
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs="3" container justifyContent={"center"}>
                <Box sx={styles.social}>
                  <Grid
                    container
                    item
                    xs="12"
                    justifyContent={"center"}
                    alignContent={"center"}
                    sx={styles.fullHeight}
                  >
                    <Twitter />
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs="3" container justifyContent={"center"}>
                <Box sx={styles.social}>
                  <Grid
                    container
                    item
                    xs="12"
                    justifyContent={"center"}
                    alignContent={"center"}
                    sx={styles.fullHeight}
                  >
                    <Instagram />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid
              item
              xs={"12"}
              pt={2}
              container
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box
                component={"img"}
                src={item.strSignImgPath}
                height={"20px"}
                width={"50%"}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default TeamCard;
