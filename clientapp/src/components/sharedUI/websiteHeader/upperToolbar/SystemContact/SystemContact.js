import { icons } from "appHelper/appVariables";
import { dictionary } from "appHelper/appDictionary";
import React from "react";
import { Box, Grid, Icon, Typography } from "@mui/material";
import { App_Primary_Color } from "appHelper/appColor";

const styles = {
  contactIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    // background: "#f3274c",
    borderRadius: "50%",
  },
  contactTypography: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
};

function SystemContact({ lang, contact,color=App_Primary_Color }) {
  return (
    <Grid container item xs='12' alignContent={'center'} alignItems={'center'} spacing={2}>
      <Grid item >
        <Box sx={{...styles.contactIconBox,
        background:color
        }}>
          <Icon>{icons[contact.type]}</Icon>
        </Box>
      </Grid>
        <Grid item>
          <Typography
            component={"span"}
            sx={styles.contactTypography}
            color={"#000"}
          >
            {dictionary.contact[contact.type][lang]} :
          </Typography>
        </Grid>
        <Grid item >
          <Typography
            dir="ltr"
            component={"span"}
            sx={styles.contactTypography}
            color={"#000"}
          >
            {contact.value}
          </Typography>
        </Grid>
    </Grid>
  );
}

export default SystemContact;
