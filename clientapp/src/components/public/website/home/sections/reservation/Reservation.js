// import "./App.css";

import { Grid, TextField, Box, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import bgImg from "assets/image/patron.jpg";
import React from "react";

const style = {};

function Reservation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // reset();
  };

  // console.log(watch());

  // console.log(errors.name)

  return (
    <React.Fragment>
      <Grid
        container
        justifyContent={'center'}
      >
        <Grid item container xs='10' spacing={3} alignContent={'center'} alignItems={'center'} sx={{
          paddingLeft: "100px",
          paddingRight: "100px",
          marginTop: "100px",
          marginBottom: "100px",
          background: `url(${bgImg})`,
          height: "350px",
          borderRadius:"20px",
          padding:"40px"
        }}>
        <Grid item container xs="3">
          <Grid item xs="12">
            <Typography sx={{
              fontSize:"46px",
              color:"#fff",
              textTransform:"uppercase",
              borderBottom:"3px solid #ffd40d",
              fontWeight:"800"
            }}>RESERVE A TABLE</Typography>
          </Grid>
          <Grid item xs="12">
            <Typography sx={{
              fontSize:'20px',
              color:"#fff",
              textTransform:"capitalize",
              paddingTop:"16px"
            }}>Discover our New Menu !</Typography>
          </Grid>
        </Grid>
        <Grid item xs='1' />
        <Grid item container xs="8" justifyContent={'center'} spacing={3}>
              <Grid item xs="6" >
              <TextField label="Complete Name" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item xs="6" >
              <TextField label="Email Address" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item xs="6" >
              <TextField type="number" label="Number Of Guest" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item xs="3" >
              <TextField type="date" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item xs="3" >
              <TextField type="time" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item xs="12" container justifyContent={'flex-end'}>
              <Button>
                <Typography
                  className="animated-btn-002"
                  sx={{ fontWeight: "800" }}
                >
                  Reverse A Table
                </Typography>
              </Button>
              </Grid>
        </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Reservation;
