import React from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ArrowForwardIos } from "@mui/icons-material";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  navListTitle: {
    fontSize: "26px !important",
    color: "#000 !important",
    fontWeight: "700 !important",
    fontFamily: "sans-serif !important",
    width: "fit-content",
    borderBottom: "6px solid #ffd40d",
    textTransform:"capitalize"
  },
};

function About({
    lang,dir,aboutList
}){
    return  <Grid
    item
    lg={2}
    xs={12}
    justify={"start"}
    alignItems={"flex-start"}
    alignSelf={"flex-start"}
  >
    <Grid
      container
      justify={"start"}
      alignItems={"flex-start"}
      alignSelf={"flex-start"}
    >
      <Grid item xs={12}>
        <Grid container justify={"start"} alignItems={"flex-start"}>
          <Grid item xs={12} justify={"start"}>
            <Typography sx={styles.navListTitle}>
              {dictionary.footer.about[lang]}
            </Typography>
          </Grid>
          <Grid item xs={12} pt={2}>
            {aboutList.map((nav) => (
              <Grid container py={1}>
                <Grid item p-0 m-0 justify={"start"}>
                  <ArrowForwardIos
                    sx={{ color: "#555" }}
                    fontSize="small"
                  />
                </Grid>
                <Grid item p-0 m-0>
                  <Link
                    style={{
                      color: "#555",
                      transition: ".3s ease-in-out",
                      fontSize: "19px !important",
                      textTransform:"capitalize"
                    }}
                  >
                    <Typography>{nav[lang]}</Typography>
                  </Link>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}

export default About;