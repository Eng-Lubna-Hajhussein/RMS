import React from "react";
import { Avatar, Grid, Typography } from "@basetoolkit/ui";

const styles = {
  avatar: {
    lg: { height: "200px", width: "200px" },
    xs: { height: "150px", width: "150px" },
  },
  fullName: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    lg: { fontSize: "30px" },
    xs: { fontSize: "15px" },
  },
  address: {
    fontWeight: "700",
    lg: { fontSize: "15px" },
    xs: { fontSize: "10px" },
    textTransform: "capitalize",
  },
};

function PersonalInfo({ appState, lang }) {
  return (
    <Grid item container xs={12}>
      <Grid item xs={12} pb={1} container justifyContent={"center"}>
        <Avatar src={appState?.userInfo?.strImgPath} sx={styles.avatar} />
      </Grid>
      <Grid item xs={12} container justifyContent={"center"}>
        <Typography component={"h3"} sx={styles.fullName}>
          {appState?.userInfo?.jsnFullName[lang]}
        </Typography>
      </Grid>
      <Grid item xs={12} pb={3} container justifyContent={"center"}>
        <Typography sx={styles.address}>
          {`${appState?.userInfo?.jsnAddress?.jsnCity[lang]}${
            appState?.userInfo?.jsnAddress?.jsnTown
              ? ` (${appState?.userInfo?.jsnAddress?.jsnTown[lang]})`
              : ""
          }, ${appState?.userInfo?.jsnAddress?.jsnCountry[lang]}`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PersonalInfo;
