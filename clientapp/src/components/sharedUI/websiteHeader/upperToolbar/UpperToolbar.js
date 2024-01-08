import React, { useState } from "react";
import {
  Toolbar,
  Grid,
  Icon,
  Box,
  Typography,
  Link,
} from "@mui/material";
import {
  EmailOutlined,
  HowToRegOutlined,
  Language,
  PhoneOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import {icons} from 'appHelper/appVariables';
import {dictionary} from 'appHelper/appDictionary';
import { Badge } from "react-bootstrap";

const styles = {
  upperToolbar: {
    backgroundColor: "#ffd40d",
    boxShadow: "none",
    "&": {
      minHeight: "50px",
      paddingLeft: "50px",
      paddingRight: "50px",
    },
    display: {
      xs: "none",
      lg: "flex",
    },
  },
  contactIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    background: "#f3274c",
    borderRadius: "50%",
  },
  font: {
    fontSize: "14px",
    fontWeight: "800",
    textTransform:"capitalize"
  },
  socialLink: {
    color: "#000",
    fontSize: "14px",
    textDecoration: "underline #000",
    fontWeight: "600",
  },
  socialIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    background: "#f3274c",
    borderRadius: "50%",
  },
  regIconBox: {
    height: "34px",
    padding: "2px",
    width: "34px",
    textAlign: "center",
    borderRadius: "50%",
    border: "2px solid #000",
  },
};



function UpperToolbar({lstContact,lstSocial,lang}){
    return (
        <Toolbar sx={styles.upperToolbar} >
        <Grid container direction={"row"}  alignItems={"center"}>
          {lstContact.map(({ jsnName, strValue,strIcon },index) => (
            <Grid container item xs="3" key={index} spacing={"3"}>
              <Grid item>
                <Box sx={styles.contactIconBox}>
                  <Icon>{icons[strIcon]}</Icon>
                </Box>
              </Grid>
              <Grid item container xs='8' alignSelf={"center"}>
                <Grid item>
                <Typography component={"p"} sx={styles.font} color={"#000"}>
                {jsnName[lang]} :&nbsp;
                </Typography>
                </Grid>
                <Grid item>
                <Typography dir="ltr" component={"p"} sx={styles.font} color={"#000"}>
                &nbsp;{strValue}
                </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Grid container item xs="3" justifyContent={"center"} spacing={"3"}>
            {lstSocial.map(({ jsnName, strPath }) => (
              <Grid item xs="3">
                <Link href={strPath} target="_blank" sx={styles.socialLink}>
                  {jsnName[lang]}
                </Link>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            item
            xs="3"
            spacing={"3"}
            justifyContent={"flex-end"}
          >
            <Grid item>
              <Box sx={styles.regIconBox}>
                <Icon>
                  <HowToRegOutlined sx={{ color: "#000000" }} />
                </Icon>
              </Box>
            </Grid>
            <Grid item alignSelf={"center"}>
              <Typography component={"p"} sx={styles.font} color={"#000"}>
                {dictionary.buttons.regBtn[lang]}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    )
}

export default UpperToolbar;