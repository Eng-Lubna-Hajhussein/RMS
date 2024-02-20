import React from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import { objIDRole } from "appHelper/appVariables";
import { App_Primary_Color } from "appHelper/appColor";

const styles = {
  avatar: {
    height: "200px",
    width: "200px",
  },
  fullName: {
    color: "#000",
    textTransform: "capitalize",
    fontWeight: "800",
    fontSize: "30px",
  },
  address: {
    fontWeight: "700",
    fontSize: "15px",
    textTransform: "capitalize",
  },
  role: {
    fontWeight: "700",
    fontSize: "20px",
    textTransform: "capitalize",
  },
};

function PersonalInfo({ userInfo,lang }) {
  return (
    <Grid item container xs="12">
      <Grid item xs="12" pb={1} container justifyContent={"center"}>
        <Avatar src={userInfo?.strImgPath} sx={styles.avatar} />
      </Grid>
      <Grid item xs="12" container justifyContent={"center"}>
        <Typography component={"h3"} color={App_Primary_Color} sx={styles.role}>
          {objIDRole[userInfo?.bigUserRoleID]}
        </Typography>
      </Grid>
      <Grid item xs="12" container justifyContent={"center"}>
        <Typography component={"h3"} sx={styles.fullName}>
          {userInfo?.jsnFullName[lang]}
        </Typography>
      </Grid>
      
      <Grid item xs="12" pb={3} container justifyContent={"center"}>
        <Typography sx={styles.address}>
            {`${userInfo?.jsnAddress?.jsnCity[lang]}${userInfo?.jsnAddress?.jsnTown?` (${userInfo?.jsnAddress?.jsnTown[lang]})`:""}, ${userInfo?.jsnAddress?.jsnCountry[lang]}`}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PersonalInfo;
