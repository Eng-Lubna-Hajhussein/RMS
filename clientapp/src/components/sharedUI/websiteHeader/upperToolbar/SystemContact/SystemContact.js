import { Box, Grid, Typography, SvgIcon } from "@basetoolkit/ui";
import { icons } from "appHelper/appVariables";
import { dictionary } from "appHelper/appDictionary";
import React from "react";
import { App_Primary_Color } from "appHelper/appColor";

const styles = {
  contactIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    borderRadius: "50%",
  },
  contactTypography: {
    fontSize: "14px",
    fontWeight: "800",
    xs:{fontSize:"12px"},
    textTransform: "capitalize",
  },
};

function SystemContact({ lang, contact, color = App_Primary_Color }) {
  return (
    <Grid
      container
      item
      xs="12"
      px={0}
      mx={0}
      alignContent={"center"}
      alignItems={"center"}
      spacing={1}
    >
      <Grid item>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ ...styles.contactIconBox, background: color }}
        >
          <SvgIcon
            fontSize={18}
            color="white"
            variant="filled"
            icon={icons[contact.type]}
          />
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
      <Grid item>
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
