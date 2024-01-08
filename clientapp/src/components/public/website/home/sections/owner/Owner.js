import { Avatar, Grid, Typography } from "@mui/material";
import ownerAvatar from 'assets/image/owner-avatar.jpg';
import React from "react";

function Owner({lang,dir,jsnOwnerSection}) {
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          paddingLeft: "80px",
          paddingRight: "80px",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Grid item container xs="6">
          <Grid item xs="12">
            <Typography
              sx={{
                color: "#f3274c",
                fontSize: "25px",
                textTransform: "uppercase",
                letterSpacing: dir==='ltr'&&"2px",
                fontWeight: "800",
              }}
            >
              {jsnOwnerSection.jsnTitle[lang]}
            </Typography>
          </Grid>
          <Grid item xs="12">
            <Typography
              component={"h2"}
              sx={{
                color: "#000",
                fontSize: "50px",
                textTransform: "capitalize",
                fontWeight: "700",
              }}
            >
               {jsnOwnerSection.jsnSubtitle[lang]}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs="6">
          <Grid item xs="12">
            <Typography sx={{fontSize:"18px",color:"#555"}}>
              {jsnOwnerSection.jsnOwnerComment[lang]}
            </Typography>
          </Grid>
          <Grid item container xs='12'>
            <Grid item xs="2">
            <Avatar alt="Remy Sharp" sx={{height:"80px",width:"80px"}} src={ownerAvatar} />
            </Grid>
            <Grid item container xs="10" sx={{height:"fit-content"}} alignSelf={'center'}>
                <Grid item xs="12">
                <Typography
                sx={{
                    fontSize:"24px",
                    fontWeight:"700",
                    color:"#000",
                    textTransform:"capitalize"
                }}
                >
                 {jsnOwnerSection.jsnOwnerName[lang]}
                </Typography>
                </Grid>
                <Grid item xs="12">
                <Typography sx={{fontSize:"16px",color:"#555",textTransform:"capitalize"}}>
                {jsnOwnerSection.jsnOwnerSpecialization[lang]}
                </Typography>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Owner;
