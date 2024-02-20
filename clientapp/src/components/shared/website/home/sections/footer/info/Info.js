import React from "react";
import {
  Button,
  Grid,
  //   Icon,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import bgImg from "assets/image/footer.png";
import logo from "assets/image/logo-white.png";
import tripaLogo from "assets/image/tripa.png";
import { Link } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";
import SystemContact from "components/sharedUI/websiteHeader/UpperToolbar/SystemContact/SystemContact";
import AnimButton0001 from "components/sharedUI/AnimButton0001/AnimButton0001";
import { dictionary } from "appHelper/appDictionary";
import { App_Primary_Color, App_Second_Color } from "appHelper/appColor";
import SystemSocial from "components/sharedUI/websiteHeader/UpperToolbar/SystemSocial/SystemSocial";

const style = {
  navListTitle: {
    fontSize: "26px !important",
    color: "#000 !important",
    fontWeight: "700 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
    borderBottom: "6px solid #ffd40d",
  },
  line: {
    width: "100%",
    background: "#ffd40d",
    borderRadius: "26px",
    height: "12px",
  },
  container: {
    height: { lg: "98vh", xs: "fit-content" },
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
    fontSize: { lg: "16px", xs: "14px" },
    lineHeight: "30px !important",
    display: "inline !important",
    fontWeight: { xs: "800" },
  },
  closedDateBtn: {
    fontSize: "16px",
    lineHeight: "30px",
    display: "inline",
    borderBottom: "1px solid #000",
  },
  tripaReview: {
    fontSize: { lg: "16px !important", xs: "14px" },
    color: "#fff",
    fontWeight: "800 !important",
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
    fontSize: { lg: "18px !important", xs: "12px" },
    fontWeight: "800 !important",
  },
  line: {
    borderBottom: "6px solid #ffd40d",
    width: "100%",
  },
  socialLink: {
    fontSize: "15px",
    marginLeft: "15px",
    transition: ".3 ease-in-out",
    textDecoration: "underline",
    color: "#000",
    fontWeight: "800",
    textTransform: "capitalize",
    cursor: "pointer",
  },
  locationIframe: {
    borderRadius: "10px",
  },
};

function Info({
    lang,dir,jsnSystemLocation,
    websiteLogo
}){
    return <Grid
    item
    lg={4}
    xs={12}
    alignItems={"flex-start"}
    alignSelf={"flex-start"}
  >
    <div style={style.box}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box component={"img"} width={"150px"} src={websiteLogo} />
        </Grid>
        <Grid item xs="12" container>
          <iframe
            src={`https://maps.google.com/maps?q=${jsnSystemLocation?.lat}, ${jsnSystemLocation?.long}&z=15&output=embed`}
            width="100%"
            height="100"
            frameborder="0"
            style={style.locationIframe}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography sx={style.tripaReview}>
            Supported By Foodio (RMS)
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box component={"img"} width={"150px"} src={logo} />
        </Grid>
      </Grid>
    </div>
  </Grid>
}

export default Info;