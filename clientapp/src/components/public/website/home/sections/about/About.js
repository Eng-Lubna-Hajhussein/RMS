import { Circle, CircleOutlined, CircleRounded, Download } from "@mui/icons-material";
import { Box, Grid, Typography,Button } from "@mui/material";
import React from "react";
import googlePlayIcon from 'assets/image/google-play.png';
import appleIcon from 'assets/image/apple.png';
import bgImg from 'assets/image/manage-your.png';

function About() {
  return (
    <Grid
      container
      sx={{
        marginTop: "100px",
        marginBottom: "100px",
        background: "#f5f8fd",
        paddingX:'100px',
      }}
    >
      <Grid item container xs="6" sx={{paddingY:"50px"}}>
        <Grid item xs='12'>
            <Typography
            sx={{
                color:"#f3274c",
                fontSize:"18px",
                textTransform:"uppercase",
                letterSpacing:"2px",
                fontWeight:"800"
            }}
            >BEST APP FOR FOODS ORDERING</Typography>
        </Grid>
        <Grid item xs='12'>
            <Typography
            sx={{
                fontSize:"50px",
                color:"#000",
                fontWeight:"800",
            }}
            >
            Manage Your Restaurant Anytime! Anywhere!
            </Typography>
        </Grid>
        <Grid item xs='12' container py={3}>
        {['Higher Reach - Minimal Effort','Showcase your Brand','Exclusive offers & discounts'].map((feature)=>(
            <Grid item xs='12' container py={1} >
                <Grid item container xs='1' px={2} alignContent={'center'}>
                    <Box sx={{
                        border:"5px solid #ffd40d",
                        height:"15px",
                        width:'15px',
                        borderRadius:"100%"

                    }}/>
                </Grid>
                <Grid item xs='10'>
                    <Typography
                    sx={{
                        fontSize:"18px",
                        fontWeight:"400",
                        color:"#555",
                        textTransform:"capitalize"
                    }}
                    >
                        {feature}
                    </Typography>
                </Grid>
            </Grid>
        ))}
        </Grid>
        <Grid item xs='12' container spacing={2}>
            <Grid item xs='5'>
                <Button fullWidth variant="contained" sx={{background:"#f3274c",paddingY:"15px",borderRadius:"15px",':hover':{background:"#f3274c"}}}>
                    <Grid container item xs='12' justifyContent={'center'} justifyItems={'center'}>
                        <Grid item xs='3' container  alignContent={'center'}>
                        <img src={googlePlayIcon} height={'40px'} width={'40px'} />
                        </Grid>
                        <Grid item container xs='8'>
                            <Grid item xs='12' container justifyContent={'flex-start'}>
                                <Typography
                                sx={{
                                    color:'#fff',
                                    textTransform:"uppercase",
                                    fontSize:"12px",
                                    fontWeight:'800'
                                }}
                                >Download From</Typography>
                            </Grid>
                            <Grid item xs='12' container justifyContent={'flex-start'}>
                                <Typography
                                sx={{
                                    fontSize:'16px',
                                    textTransform:'capitalize',
                                    color:'#fff',
                                    fontWeight:'800'
                                }}
                                >
                                    google play
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
            <Grid item xs='5'>
                <Button fullWidth variant="contained" sx={{background:"#000",paddingY:"15px",borderRadius:"15px",':hover':{background:"#000"}}}>
                    <Grid container item xs='12' justifyContent={'center'} justifyItems={'center'}>
                        <Grid item xs='3' container  alignContent={'center'}>
                        <img src={appleIcon} height={'40px'} width={'40px'} />
                        </Grid>
                        <Grid item container xs='8'>
                            <Grid item xs='12' container justifyContent={'flex-start'}>
                                <Typography
                                sx={{
                                    color:'#fff',
                                    textTransform:"uppercase",
                                    fontSize:"12px",
                                    fontWeight:'800'
                                }}
                                >Download From</Typography>
                            </Grid>
                            <Grid item xs='12' container justifyContent={'flex-start'}>
                                <Typography
                                sx={{
                                    fontSize:'16px',
                                    textTransform:'capitalize',
                                    color:'#fff',
                                    fontWeight:'800'
                                }}
                                >
                                    app store
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
        </Grid>
      </Grid>
      <Grid item container xs="6">
        <img src={bgImg} />
      </Grid>
    </Grid>
  );
}

export default About;
