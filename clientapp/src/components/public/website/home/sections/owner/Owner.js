import { Avatar, Grid, Typography } from "@mui/material";
import ownerAvatar from 'assets/image/owner-avatar.jpg';
import React from "react";

function Owner({lang,dir,jsnOwnerSection}) {
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          marginTop: "50px",
          marginBottom: "50px",
        }}
        // spacing={2}
      >
        <Grid item container lg="6" xs='12'>
          <Grid item xs="12">
            <Typography
              sx={{
                color: "#f3274c",
                fontSize: {lg:"25px",xs:"12px"},
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
                fontSize: {lg:"50px",xs:"20px"},
                textTransform: "capitalize",
                fontWeight: "700",
              }}
            >
               {jsnOwnerSection.jsnSubtitle[lang]}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container lg="6" xs="12">
          <Grid item xs="12">
            <Typography sx={{fontSize:{lg:"18px",xs:"10px"},color:"#555"}}>
              {jsnOwnerSection.jsnOwnerComment[lang]}
            </Typography>
          </Grid>
          <Grid item container xs='12'>
            <Grid item xs="2">
            <Avatar alt="Remy Sharp" sx={{height:{lg:"80px",xs:"50px"},width:{lg:"80px",xs:"50px"}}} src={ownerAvatar} />
            </Grid>
            <Grid item container xs="10" sx={{height:"fit-content"}} alignSelf={'center'}>
                <Grid item xs="12">
                <Typography
                sx={{
                    fontSize:{lg:"24px",xs:"12px"},
                    fontWeight:"700",
                    color:"#000",
                    textTransform:"capitalize"
                }}
                >
                 {jsnOwnerSection.jsnOwnerName[lang]}
                </Typography>
                </Grid>
                <Grid item xs="12">
                <Typography sx={{fontSize:{lg:"16px",xs:"8px"},color:"#555",textTransform:"capitalize"}}>
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
