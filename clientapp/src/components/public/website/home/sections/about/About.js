import { Circle, CircleOutlined, CircleRounded, Download } from "@mui/icons-material";
import { Box, Grid, Typography,Button } from "@mui/material";
import React from "react";
import googlePlayIcon from 'assets/image/google-play.png';
import appleIcon from 'assets/image/apple.png';
import bgImg from 'assets/image/manage-your.png';
import { dictionary } from "appHelper/appDictionary";

function About({lang,dir,jsnAboutSection}) {
  return (
    <Grid
      container
      sx={{
        marginTop: "100px",
        marginBottom: "100px",
        background: "#f5f8fd",
        // paddingX:'100px',
      }}
    >
      <Grid item container lg='6' xs="12" sx={{paddingY:"50px"}}>
        <Grid item xs='12'>
            <Typography
            sx={{
                color:"#f3274c",
                fontSize:{lg:"25px",xs:"14px"},
                textTransform:"uppercase",
                letterSpacing:dir==='ltr'&&"2px",
                fontWeight:"800"
            }}
            >{jsnAboutSection.jsnTitle[lang]}</Typography>
        </Grid>
        <Grid item xs='12'>
            <Typography
            sx={{
                fontSize:{lg:"50px",xs:"20px"},
                color:"#000",
                fontWeight:"800",
                textTransform:"capitalize"
            }}
            >
            {jsnAboutSection.jsnSubtitle[lang]}
            </Typography>
        </Grid>
        <Grid item xs='12' container py={3}>
        {jsnAboutSection.lstFeatures.map((feature)=>(
            <Grid item xs='12' container py={1} >
                <Grid item container xs='1' px={1} alignContent={'center'}>
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
                        fontSize:{lg:"18px",xs:"10px"},
                        fontWeight:"400",
                        color:"#555",
                        textTransform:"capitalize"
                    }}
                    >
                        {feature[lang]}
                    </Typography>
                </Grid>
            </Grid>
        ))}
        </Grid>
        <Grid item xs='12' container >
            <Grid item lg='5' xs='6'>
                <Button fullWidth variant="contained" sx={{background:"#f3274c",paddingY:"15px",borderRadius:"15px",':hover':{background:"#f3274c"}}}>
                    <Grid container item xs='12' justifyContent={'center'} justifyItems={'center'}>
                        <Grid item xs='3' container  alignContent={'center'}>
                        <Box component={'img'} src={googlePlayIcon}
                        sx={{height:{lg:"40px",xs:"20px"},width:{lg:"40px",xs:"20px"}}}
                        />
                        </Grid>
                        <Grid item container xs='8'>
                            <Grid item xs='12' container justifyContent={'flex-start'}>
                                <Typography
                                sx={{
                                    color:'#fff',
                                    textTransform:"uppercase",
                                    fontSize:{lg:"12px",xs:"7px"},
                                    fontWeight:'800'
                                }}
                                >{dictionary.buttons.downloadFrom[lang]}</Typography>
                            </Grid>
                            <Grid item xs='12' container justifyContent={'flex-start'}>
                                <Typography
                                sx={{
                                    fontSize:{lg:'16px',xs:"6px"},
                                    textTransform:'capitalize',
                                    color:'#fff',
                                    fontWeight:'800'
                                }}
                                >
                                   {dictionary.buttons.appStore[lang]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
            <Grid item lg='5' xs='6'>
                <Button fullWidth variant="contained" sx={{background:"#000",paddingY:"15px",borderRadius:"15px",':hover':{background:"#000"}}}>
                    <Grid container item xs='12' justifyContent={'center'} justifyItems={'center'}>
                        <Grid item xs='3' container  alignContent={'center'}>
                        <Box component={'img'} src={appleIcon}
                        sx={{height:{lg:"40px",xs:"20px"},width:{lg:"40px",xs:"20px"}}}
                        />
                        </Grid>
                        <Grid item container xs='8'>
                            <Grid item xs='12' container justifyContent={'flex-start'}>
                                <Typography
                                sx={{
                                    color:'#fff',
                                    textTransform:"uppercase",
                                    fontSize:{lg:"12px",xs:"7px"},
                                    fontWeight:'800'
                                }}
                                >{dictionary.buttons.downloadFrom[lang]}</Typography>
                            </Grid>
                            <Grid item xs='12' container justifyContent={'flex-start'}>
                                <Typography
                                sx={{
                                    fontSize:{lg:'16px',xs:"6px"},
                                    textTransform:'capitalize',
                                    color:'#fff',
                                    fontWeight:'800'
                                }}
                                >
                                    {dictionary.buttons.googlePlay[lang]}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Button>
            </Grid>
        </Grid>
      </Grid>
      <Grid item container lg='6' xs="12">
        <img src={jsnAboutSection.strImgPath} width={'100%'} />
      </Grid>
    </Grid>
  );
}

export default About;
