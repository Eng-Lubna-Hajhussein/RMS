import { Instagram } from "@mui/icons-material";
import { Box, Grid, Icon, Typography } from "@mui/material";
import bgImg from "assets/image/follow.jpg";



export default function Follow() {
  return (
    <Grid container sx={{marginTop:"100px",marginBottom:"100px",background:`url(${bgImg})`,backgroundSize:"100% 100%",height:"500px"}}>
        <Grid item container alignContent={'center'}alignItems={'center'} xs='12' sx={{height:"100%", backgroundColor: "#ffffffdd"}}>
            <Grid item xs='12' container justifyContent={'center'} >
                <Box sx={{background:'#f3274c',height:"90px",width:"90px",borderRadius:"100%"}}>
                    <Grid container item xs='12' sx={{height:"100%"}} justifyContent={'center'} alignContent={'center'}>
                        <Instagram fontSize="large" sx={{color:'#fff'}} />
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs='12' container justifyContent={'center'}>
                <Typography
                sx={{
                    fontSize:'40px',
                    color:'#000',
                    fontWeight:"800"
                }}
                >
                Follow @Winsfolio.com
                </Typography>
            </Grid>
            <Grid item xs='12' container justifyContent={'center'}>
                <Typography
                sx={{
                    fontSize:'16px',
                    color:'#555',
                    fontWeight:"400"
                }}
                >
                Join our community to inspire your desires
                </Typography>
            </Grid>
        </Grid>
    </Grid>
  );
}