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
  HowToRegOutlined,
} from "@mui/icons-material";

const styles = {
  upperToolbar: {
    backgroundColor: "#ffd40d",
    boxShadow: "none",
    "&": {
      minHeight: "50px",
      paddingLeft: "80px",
      paddingRight: "80px",
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

function UpperToolbar({listSystemContact,listSystemSocial}){
    return (
        <Toolbar sx={styles.upperToolbar}>
        <Grid container direction={"row"} alignItems={"center"}>
          {listSystemContact.map(({ ContactIcon, name, value }) => (
            <Grid container item xs="3" key={name} spacing={"3"}>
              <Grid item>
                <Box sx={styles.contactIconBox}>
                  <Icon>{<ContactIcon fontSize="small" />}</Icon>
                </Box>
              </Grid>

              <Grid item alignSelf={"center"}>
                <Typography component={"p"} sx={styles.font} color={"#000"}>
                  {name}: {value}
                </Typography>
              </Grid>
            </Grid>
          ))}
          <Grid container item xs="3" justifyContent={"center"} spacing={"3"}>
            {listSystemSocial.map(({ name, path }) => (
              <Grid item xs="4">
                <Link href="#" sx={styles.socialLink}>
                  {name}
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
                Login / Register
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    )
}

export default UpperToolbar;