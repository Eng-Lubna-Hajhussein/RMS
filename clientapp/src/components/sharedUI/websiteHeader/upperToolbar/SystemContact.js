import { icons } from "appHelper/appVariables";
import { dictionary } from "appHelper/appDictionary";
import React from "react";
import { Box, Grid, Icon, Typography } from "@mui/material";

const styles = {
  contactIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    background: "#f3274c",
    borderRadius: "50%",
  },
  contactTypography: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "capitalize",
  },
};

function SystemContact({ lang, contact }) {
  return (
    <React.Fragment>
      <Grid item>
        <Box sx={styles.contactIconBox}>
          <Icon>{icons[contact.type]}</Icon>
        </Box>
      </Grid>
      <Grid item container xs="8" alignSelf={"center"}>
        <Grid item>
          <Typography
            component={"p"}
            sx={styles.contactTypography}
            color={"#000"}
          >
            {dictionary.contact[contact.type][lang]} :&nbsp;
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            dir="ltr"
            component={"p"}
            sx={styles.contactTypography}
            color={"#000"}
          >
            &nbsp;{contact.value}
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default SystemContact;
