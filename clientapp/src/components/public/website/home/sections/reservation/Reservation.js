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
        sx={{
          // paddingX:{lg:"60px",xs:"15px"}
        marginY:"50px"}}
      >
        <Grid item container lg='10' xs='12' 
         alignContent={'center'} 
         alignItems={'center'} sx={{
          
          background: `url(${bgImg})`,
          height: {lg:"350px",xs:"fit-content"},
          borderRadius:"20px",
          paddingY:"40px",
          paddingX:{lg:"40px",xs:"20px"}
        }}>
        <Grid item container lg="3" xs='12' sx={{marginBottom:{lg:"0",xs:"25px"}}}>
          <Grid item xs="12">
            <Typography sx={{
              fontSize:{lg:"46px",xs:"20px",width:"fit-content"},
              color:"#fff",
              textTransform:"uppercase",
              borderBottom:"3px solid #ffd40d",
              fontWeight:"800"
            }}>RESERVE A TABLE</Typography>
          </Grid>
          <Grid item xs="12">
            <Typography sx={{
              fontSize:{lg:'20px'},
              color:"#fff",
              textTransform:"capitalize",
              marginTop:{lg:"16px",xs:"5px"},
            }}>Discover our New Menu !</Typography>
          </Grid>
        </Grid>
        <Grid item xs='1' />
        <Grid item container lg="8" xs='12' justifyContent={'center'}>
              <Grid item lg="6"  xs='12'>
              <TextField label="Complete Name" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item lg="6"  xs='12'>
              <TextField label="Email Address" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item lg="6"  xs='12'>
              <TextField type="number" label="Number Of Guest" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item lg="3"  xs='6'>
              <TextField type="date" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item lg="3"  xs='6'>
              <TextField type="time" color="warning" fullWidth sx={{"&":{background:"#fff",borderRadius:"5px"}}} variant="outlined" />
              </Grid>
              <Grid item lg="12" xs='12' container justifyContent={'flex-end'}>
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
