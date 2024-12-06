import React from "react";
import { Grid, Typography, Box } from "@basetoolkit/ui";
import bgImg from "assets/image/footer.png";
import logo from "assets/image/logo-white.png";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
  container: {
    lg: { height: "98vh" },
    xs: { height: "fit-content" },
    background: "#f5f8fd",
    paddingTop: "100px",
  },
  containerItem: {
    height: "100%",
    background: `url(${bgImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  box: {
    padding: "20px",
    borderRadius: "30px",
    background: "#f3274c",
    width: "90%",
  },
  date: {
    color: "#fff",
    lineHeight: "30px !important",
    display: "inline !important",
    lg: { fontSize: "16px" },
    xs: { fontSize: "14px",fontWeight:800 },
  },
  closedDateBtn: {
    fontSize: "16px",
    lineHeight: "30px",
    display: "inline",
    borderBottom: "1px solid #000",
  },
  regIn: {
    lg: {fontSize:"16px !important"}, xs: {fontSize:"14px" },
    color: "#fff",
    fontWeight: "800 !important",
    textTransform: "capitalize",
  },
  nav: {
    color: "#fff",
    fontSize: "16px !important",
    lineHeight: "30px !important",
    borderWidth: "80% !important",
    cursor: "pointer !important",
    display: "inline !important",
    transition: ".3 ease-in-out",
  },
  copyRights: {
    lg: {fontSize:"18px !important"}, xs: {fontSize:"12px" },
    fontWeight: "800 !important",
  },
  locationIframe: {
    borderRadius: "10px",
  },
  logo: {
    width: "150px",
    height: "30px",
  },
};

function Info({ lang, dir, jsnSystemLocation, websiteLogo }) {
  return (
    <Grid
      item
      lg={4}
      xs={12}
      alignItems={"start"}
      alignSelf={"start"}
    >
      <div style={styles.box}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box component={"img"} sx={styles.logo} src={websiteLogo} />
          </Grid>
          <Grid item xs={12} container>
            <iframe
              src={`https://maps.google.com/maps?q=${jsnSystemLocation?.lat}, ${jsnSystemLocation?.long}&z=5&output=embed`}
              width="100%"
              height="100"
              frameborder="0"
              style={styles.locationIframe}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={styles.regIn}>
              {dictionary.footer.registeredIn[lang]}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box component={"img"} width={"150px"} src={logo} />
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
}

export default Info;
