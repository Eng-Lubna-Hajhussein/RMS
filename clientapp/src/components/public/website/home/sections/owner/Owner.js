import { Avatar, Grid, Typography } from "@mui/material";
import React from "react";
import ownerAvatar from 'assets/image/owner-avatar.jpg';

function Owner() {
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
                fontSize: "18px",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontWeight: "800",
              }}
            >
              ABOUT THE FOOD RESTAURANT
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
              New Ground with Dishes to be Enjoyed
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs="6">
          <Grid item xs="12">
            <Typography sx={{fontSize:"18px",color:"#555"}}>
              Nisl quam nestibulum ac quam nec odio eleme aucan ligula. Orci
              varius nat oque pena tibus et urient monte nascete ridiculus mus
              nellentesq um ac qu am nec odio rbine. Nisl quam nestibu aucan
              ligula.
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
                    color:"#000"
                }}
                >
                Willimes James
                </Typography>
                </Grid>
                <Grid item xs="12">
                <Typography sx={{fontSize:"16px",color:"#555"}}>
                Director and Chief Operations Officer
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
