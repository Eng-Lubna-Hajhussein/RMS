import React from "react";
import { Box, Grid, Icon, Paper, Typography } from "@mui/material";
import {
  FacebookSharp,
  Instagram,
  MoreVert,
  Twitter,
} from "@mui/icons-material";
import OptionList from "../OptionList/OptionList";
import { objAppActions } from "appHelper/appVariables";

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
    textTransform: "capitalize",
  },
  name: {
    fontSize: "30px !important",
    transition: "3s ease-in-out",
    color: "#000",
    fontWeight: "900 !important",
    transition: ".3s ease-in-out",
    fontFamily: "san-serif",
    textTransform: "capitalize",
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
  optionListContainer: {
    marginBottom: "-100px",
  },
};

function TeamCard({ item, lang, onDelete, onEdit, editable }) {
  const actionNavList = [
    { bigNavID: objAppActions.Delete, nav: { eng: "delete", arb: "حذف" } },
    { bigNavID: objAppActions.Edit, nav: { eng: "edit", arb: "تعديل" } },
  ];

  const socials = [
    {
      icon: <FacebookSharp />,
      link: "",
    },
    {
      icon: <Twitter />,
      link: "",
    },
    {
      icon: <Instagram />,
      link: "",
    },
  ];

  return (
    <>
      {editable && (
        <Grid
          item
          lg={12}
          px={2}
          sx={styles.optionListContainer}
          container
          justifyContent={"flex-end"}
        >
          <OptionList
            nav={""}
            onClick={() => {}}
            navList={actionNavList.map((nav) => ({
              ...nav,
              onClick: () => {
                if (objAppActions["Delete"] === nav.bigNavID) {
                  onDelete(item.bigID);
                }
                if (objAppActions["Edit"] === nav.bigNavID) {
                  onEdit();
                }
              },
            }))}
            endIcon={<MoreVert />}
            lang={lang}
          />
        </Grid>
      )}
      <Grid item xs={12} sx={styles.imgContainer}>
        <Box
          component={"img"}
          src={item.strImgPath}
          width={"100%"}
          height={"350px"}
        />
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyContent={"center"}
        sx={styles.contentContainer}
      >
        <Box className="chef-content" sx={styles.chefContent}>
          <Grid
            container
            item
            xs={12}
            alignItems={"center"}
            justifyContent={"center"}
            alignContent={"center"}
            sx={styles.fullHeight}
          >
            <Grid item xs={12} container justifyContent={"center"}>
              <Typography sx={styles.specialization}>
                {item.jsnSpecialization[lang]}
              </Typography>
            </Grid>
            <Grid item xs={12} container justifyContent={"center"}>
              <Typography sx={styles.name}>{item.jsnName[lang]}</Typography>
            </Grid>
            <Grid item xs={12} container justifyContent={"center"}>
              {socials.map(({ icon, link }, index) => (
                <Grid item xs="3" container justifyContent={"center"}>
                  <Box sx={styles.social}>
                    <Grid
                      container
                      item
                      xs={12}
                      justifyContent={"center"}
                      alignContent={"center"}
                      sx={styles.fullHeight}
                    >
                      {icon}
                    </Grid>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default TeamCard;
