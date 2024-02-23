import React from "react";
import {
  Grid,
  Typography,
} from "@mui/material";
import { dictionary } from "appHelper/appDictionary";

const styles = {
  copyRights: {
    fontSize: { lg: "18px !important", xs: "12px" },
    fontWeight: "800 !important",
  },
  line: {
    borderBottom: "6px solid #ffd40d",
    width: "100%",
  },
};

function Copyrights({lang,dir}){
    return <Grid container item xs='12'>
    <Grid item xs={12}>
      <div style={styles.line} />
    </Grid>
    <Grid item lg={6} container xs={12} pt={5} px={2}>
      <Grid item>
        <Typography color="#f3274c" sx={styles.copyRights}>
          {dictionary.footer.copyRights[lang]}
        </Typography>
      </Grid>
      <Grid item>
        <Typography color="#000" sx={styles.copyRights}>
          {" "}
         | {dictionary.footer.rms[lang]}
        </Typography>
      </Grid>
    </Grid>
  </Grid>
}

export default Copyrights;