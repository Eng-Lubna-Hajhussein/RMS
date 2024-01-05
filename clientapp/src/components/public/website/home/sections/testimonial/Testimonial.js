import { Box, Grid, Rating, Typography } from "@mui/material";
import quoteIcon from "assets/image/quote.png";
import img1 from 'assets/image/bratlee-hamint-1.jpg';
import img2 from 'assets/image/bratlee-hamint-2.jpg';
import img3 from 'assets/image/bratlee-hamint-3.jpg';


const style = {
  container: {
    height: "114vh",
    marginTop:"50px !important",
    xs: {
      height: "fit-content",
    },
  },
  containerItem: {
    height: "100%",
    xs: {
    },
  },
  fullHeight: {
    height: "100%",
  },
  title: {
    color: "#f3274c !important",
    fontSize: "18px !important",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: "800 !important",
    width: "100%",
    xs: {
    },
  },
  subtitle: {
    color: "#000 !important",
    fontSize: "40px !important",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontWeight: "800 !important",
    width: "100%",
    fontFamily: "sans-serif",
    xs: {
      fontSize: "20px !important",
      letterSpacing: "0px",
    },
  },
  img1: {
    position: "absolute",
    top: "0",
    left: "300px",
    borderRadius: "30px",
    xs: {
    },
  },
  img2: {
    position: "absolute",
    top: "160px",
    left: "80px",
    zIndex: "-1",
    borderRadius: "30px",
    xs: {
    },
  },
  img3: {
    position: "absolute",
    top: "280px",
    left: "80px",
    left: "330px",
    borderRadius: "30px",
    xs: {
    },
  },
};

function Testimonial() {
  return (
    <Grid
      container
      sx={{
        paddingLeft: "100px",
        paddingRight: "100px",
        marginTop: "100px",
        marginBottom: "100px",
        height:'fit-content',
        minHeight:"fit-content",
      }}
      alignContent={'flex-start'}
      alignItems={'flex-start'}
    >
      <Grid item container xs="6">
        <Grid item xs="12">
          <Typography
            sx={{
              textTransform: "uppercase",
              color: "#f3274c",
              fontSize: "18px",
              letterSpacing: "2px",
              fontWeight: "800",
            }}
          >
            TESTIMONIALS & REVIEWS
          </Typography>
        </Grid>
        <Grid item xs="12">
          <Typography
            sx={{
              color: "#000",
              fontSize: "50px",
              fontWeight: "800",
            }}
          >
            Our Customar Feedbacks
          </Typography>
        </Grid>
        <Grid item xs="10">
          <Box
            sx={{
              padding: "40px",
              border: "5px solid #ffd40d",
              borderRadius: "30px",
            }}
          >
            <Grid item container xs="12">
              <Grid item xs="12">
                <Typography
                  sx={{
                    fontSize: "20px",
                    color: "#555",
                    fontWeight: "400",
                  }}
                >
                  A good restaurant is like a vacation; it transports you, and
                  it becomes a lot more than just about the food. All great
                  deeds and all great thoughts
                </Typography>
              </Grid>
              <Grid
                item
                xs="10"
                pt={2}
                container
                alignContent={"center"}
                alignItems={"center"}
              >
                <Grid item xs="12">
                  <Typography
                    sx={{
                      fontSize: "26px",
                      color: "#000",
                      fontWeight: "800",
                      textTransform: "capitalize",
                    }}
                  >
                    Bratlee Hamint
                  </Typography>
                </Grid>
                <Grid item xs="12" container alignContent={"center"}>
                  <Rating value={5} />
                </Grid>
              </Grid>
              <Grid
                item
                xs="2"
                container
                alignContent={"end"}
                alignItems={"end"}
              >
                <Box
                  sx={{
                    height: "70px",
                    width: "70px",
                    textAlign: "center",
                    background: "#ffd40d",
                    borderRadius: "100%",
                  }}
                >
                    <Grid container sx={{height:"100%"}} justifyContent={'center'} alignContent={'center'}>

                  <img src={quoteIcon} height={"30px"} width={"30px"} />
                    </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid item container xs='6'   alignContent={'center'}
      alignItems={'center'} sx={{position:"relative",height:"fit-content",height:"600px"}}>
        <Grid item xs='12'>

      <img
              src={img1}
              width={"200px"}
              height={"200px"}
              style={style.img1}
            />
        </Grid>
        <Grid item xs='12'>

            <img src={img2} width={"280px"} style={style.img2} height={"300px"} />
        </Grid>
        <Grid item xs='12'>
            <img
              src={img3}
              width={"280px"}
              height={"300px"}
              style={style.img3}
            />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Testimonial;
