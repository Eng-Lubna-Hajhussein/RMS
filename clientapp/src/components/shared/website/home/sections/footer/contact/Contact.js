import React from "react";
import { Grid, Typography } from "@basetoolkit/ui";
import SystemContact from "components/sharedUI/websiteHeader/upperToolbar/SystemContact/SystemContact";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { dictionary } from "appHelper/appDictionary";
import { App_Primary_Color } from "appHelper/appColor";

const styles = {
  navListTitle: {
    fontSize: "26px !important",
    color: "#000 !important",
    fontWeight: "700 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
    borderBottom: "6px solid #ffd40d",
    textTransform: "capitalize",
  },
};

function Contact({ lang, dir, jsnSystemContact, blnAdmin }) {
  return (
    <Grid
      item
      lg={4}
      xs={12}
      justify={"start"}
      alignItems={"start"}
      alignSelf={"start"}
    >
      <Grid
        container
        justifyContent={"end"}
        alignItems={"start"}
        alignSelf={"start"}
      >
        <Grid item xs={12}>
          <Grid container justifyContent={"end"} alignItems={"start"}>
            <Grid item xs={12} justify={"start"}>
              <Typography sx={styles.navListTitle}>
                {dictionary.footer.contactUs[lang]}
              </Typography>
            </Grid>
            <Grid item xs={12} pt={2} px={0} mx={0}>
              <Grid container item xs={12} pb={1} px={0} mx={0} justifyContent={"start"}>
                <SystemContact
                  contact={{
                    type: "strEmail",
                    value: jsnSystemContact.strEmail,
                  }}
                  color={"#e4e4e4"}
                  lang={lang}
                />
              </Grid>
              <Grid container item xs={12} pb={1} px={0} mx={0}>
                <SystemContact
                  contact={{
                    type: "strPhone",
                    value: jsnSystemContact.strPhone,
                  }}
                  color={"#e4e4e4"}
                  lang={lang}
                />
              </Grid>
              <Grid container item xs={12}>
                <AnimButton0001
                  label={
                    blnAdmin
                      ? dictionary.buttons.addTableBtn[lang]
                      : dictionary.buttons.reverseTableBtn[lang]
                  }
                  color={App_Primary_Color}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Contact;
