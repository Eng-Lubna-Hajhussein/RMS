import { Button, Grid, Paper, Typography } from "@mui/material";
import "./EventCard.css";

const style = {
  paper: {
    lg: {
      width: "100%",
      height: "400px",
      borderRadius: "30px !important",
    },
  },
  frontCard: {
    lg: {
      border: "4px solid #ffd40d",
      height: "100%",
      borderRadius: "30px",
      position: "relative",
      padding:"0 !important",
      margin:"0 !important"
    },
  },
  fullHeight: {
    lg: {
      height: "100%",
      padding:"0 !important",
      margin:"0 !important"
    },
  },
  frontBtn: {
    lg: {
      width: "102% !important",
      maxWidth: "102% !important",
      minWidth: "102% !important",
      borderRadius: "30px !important",
      padding:"0 !important",
      margin:"0 !important",
      fontFamily: "sans-serif !important",
      height: "55px !important",
      boxShadow: "none !important",
      background: "#ffd40d !important",
      position: "absolute",
      bottom: "-1px",
      color: "#000",
      textAlign: "center",
    },
  },
  frontTitle:{
    lg:{
      fontSize: "22px !important",
      fontWeight: "900 !important",
      fontFamily: "sans-serif !important",
      color:"#000"
    }
  },
  title: {
    lg: {
      color: "#fff",
      fontSize: "30px !important",
      fontWeight: "800 !important",
      textTransform: "capitalize",
    },
  },
  description: {
    lg: {
      color: "#fff !important",
      fontSize: "14px !important",
      fontWeight: "200px !important",
      lineHeight: "30px !important",
    },
  },
  btnBack: {
    lg: {
      padding: "10px 15px !important",
      borderRadius: "10px !important",
      height: "35px !important",
      fontSize: "16px !important",
      fontWeight: "800 !important",
      color:"#000",
      background:"#fff"
    },
  },
};

export default function EventCard({ title, description, bgImg }) {
  return (
    <Paper
      className="restaurant-card"
      sx={{
        ...style.paper.lg,
        background: `url(${bgImg})`,
      }}
      
    >
      <Grid
        item
        xs={"12"}
        sx={style.frontCard.lg}
        justify={"center"}
      >
        <Grid container px-0 alignItems={"flex-end"}  mx-0  sx={style.fullHeight.lg} py-0>
          <Grid
            item
            xs="12"
      
            sx={style.frontBtn.lg}
            px-0 mx-0 
          >
              <Typography sx={style.frontTitle.lg}>{title}</Typography>
              {/* <Grid item xs='12' px-0 mx-0  sx={{height:"100%"}} alignItems={"center"} alignSelf={}>
              </Grid> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={"12"} container justifyItems={'center'} className="coctail-bar">
      <Grid item xs={"12"}>
            <Typography sx={style.title.lg}>{title}</Typography>
          </Grid>
          <Grid item xs={"12"}>
            <Typography sx={style.description.lg}>{description}</Typography>
          </Grid>
          <Grid item xs="12">
            <Button
            variant="contained"
              sx={style.btnBack.lg}
            >
                <Typography>
                Reserve a Table
                </Typography>
            </Button>
          </Grid>
      </Grid>
      {/* <Grid item xs={"12"} className="coctail-bar">
        <Grid container justify={"center"}>
          <Grid item xs={"12"}>
            <Typography sx={style.title.lg}>{title}</Typography>
          </Grid>
          <Grid item xs={"12"}>
            <Typography sx={style.description.lg}>{description}</Typography>
          </Grid>
          <Grid item xs="12" pt-4>
            <Button
              color="#fff"
              textColor="#000"
              sx={style.btnBack.lg}
            >
                <Typography>
                Reserve a Table
                </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid> */}
    </Paper>
  );
}
