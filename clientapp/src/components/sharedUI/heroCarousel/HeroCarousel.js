// import "./HeroCarousel.css";
import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { dictionary } from "appHelper/appDictionary";

const style = {
  container: {
    height: {lg:"600px",xs:"700px"},
    paddingLeft: {lg:"60px !important",xs:'15px'},
    paddingRight: {lg:"60px !important",xs:'15px'},
  },
  title: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: {lg:"50px !important",xs:"30px"},
    lineHeight: "1.2",
    width:{lg:"60%"},
    fontWeight: "700 !important",
    fontFamily: "Fredoka !important",
  },
  subtitle: {
    color: "#fff !important",
    textTransform: "capitalize",
    fontSize: {lg:"20.5px !important",xs:"15px"},
    lineHeight: "34px",
    width:{lg:"60%"},
    fontWeight: "500 !important",
    fontFamily: "sans-serif !important",
  },
  box: {
    border: "3px solid #ffd40d !important",
    padding: "20px 30px !important",
    borderRadius: "30px !important",
    backgroundColor: "#000000d4 !important",
    width: "100% !important",
    position: "relative",
  },
  boxCaption: {
    lineHeight: "14px",
    fontSize: "14px",
    color: "white",
    position: "absolute",
    padding: "6px 10px",
    textTransform: "capitalize",
    borderRadius: "5px",
    top: "-16px",
    //   right: "22px",
    fontFamily: "Epilogue",
    background: "#f3274c",
    //   marginBottom:"-100px"
  },
  boxTitle: {
    color: "#fff !important",
    fontSize: "28px !important",
    fontWeight: "700 !important",
    lineHeight: "1.2",
    fontFamily: "sans-serif",
    display: "inline-block !important",
    textAlign: "left !important",
  },
  dollarSign: {
    color: "#f3274c !important",
    fontSize: "28px !important",
    display: "inline-block !important",
  },
  boxSubtitle: {
    color: "#fff !important",
    fontWeight: "700 !important",
    lineHeight: "1.2",
    fontSize: "18px !important",
  },
  boxRating: {
    height: "30px !important",
    minHeight: "30px !important",
  },
};

export const HeroCarousel = ({ jsnHeroSection, lang, dir }) => {
  const [slide, setSlide] = useState(0);

  return (
    <Grid container  mx={0}
        sx={{...style.container,position:"relative"}} className="carousel">
      {jsnHeroSection.lstSlidesImgs.map((img, idx) => {
        return (
          <div className={slide === idx ? "slide" : "slide slide-hidden"}>
            <Grid
            container
              sx={{
                height: {lg:"600px",xs:"700px"},
                ":before": {
                  background: `url(${img})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  transform:dir==='rtl'&& "scaleX(-1)",
                  height: {lg:"600px",xs:"700px"},
                  width:"100%",
                  content: '""',
                  position: "absolute",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  zIndex: "-1",
                },
              }}
            >
              <Grid
                container
                alignContent={"center"}
                alignItems={"center"}
                alignSelf={"center"}
                justify={"center"}
                sx={style.container}
                item xs='12'
              >
                <Grid
                  item
                  xs="12"
                  sx={{ paddingTop: "20px", paddingBottom: "20px" }}
                  justify={"start"}
                >
                  <Typography sx={style.title}>
                    {jsnHeroSection.jsnTitle[lang]}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs="12"
                  sx={{ paddingTop: "20px", paddingBottom: "20px" }}
                >
                  <Typography sx={style.subtitle}>
                    {jsnHeroSection.jsnSubtitle[lang]}
                  </Typography>
                </Grid>
                <Grid
                  item
                  lg="8"
                  sx={{ paddingTop: "20px", paddingBottom: "20px" }}
                  xs={"12"}
                >
                  <Grid
                    container
                    spacing={2}
                    justify={"start"}
                    alignItems={"flex-start"}
                  >
                    <Grid item lg={"4"} xs={"12"} px-0>
                      <Button mode="link" px-0 mx-0>
                        <Typography
                          className="animated-btn-001"
                          sx={{ fontWeight: "800" }}
                        >
                          {dictionary.buttons.seeOurMenuBtn[lang]}
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item lg={"4"} pt-5 xs={"12"}>
                      <div className="video">
                        <a href="https://www.youtube.com/watch?v=1La4QzGeaaQ">
                          <i>
                            <svg
                              width="15"
                              height="22"
                              viewBox="0 0 11 17"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 8.5L0.5 0.272758L0.5 16.7272L11 8.5Z"
                                fill="#fff"
                              ></path>
                            </svg>
                          </i>
                          <Typography
                            mx={2}
                            sx={{
                              fontWeight: "800 !important",
                              cursor: "pointer",
                              textTransform: "capitalize",
                            }}
                          >
                            {dictionary.buttons.watchVideo[lang]}
                          </Typography>
                        </a>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item lg={"4"}>
                <Grid container justify={"end"}>
                  <Grid item lg="12" xs={"12"} alignSelf={"flex-start"}>
                    <Box
                      outline="0"
                      elevation="0"
                      hoverElevation="0"
                      color="default"
                      textColor="default"
                      sx={style.box}
                    >
                      <span style={style.boxCaption}>Weekly Special</span>
                      <Grid container justify={"center"} p-0 m-0>
                        <Grid item xs="8" container justify={"start"}>
                          <Grid item xs="12" justify={"start"}>
                            <Typography sx={style.boxTitle}>
                              <Typography sx={style.dollarSign}>$</Typography>
                              {item.weeklySpecial.price}
                            </Typography>
                          </Grid>
                          <Grid item xs="12">
                            <Typography sx={style.boxSubtitle}>
                              {item.weeklySpecial.name}
                            </Typography>
                          </Grid>
                          <Grid item xs="12">
                            <Rating
                              name="read-only"
                              value={item.weeklySpecial.rating}
                              readOnly
                            />
                          </Grid>
                        </Grid>
                        <Grid item xs="4" container>
                          <img src={item.weeklySpecial.img} />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Grid> */}
              </Grid>
            </Grid>
          </div>
        );
      })}
      <Grid item
        container
        xs="12"
        justifyContent={"start"}
        sx={{marginTop:"-50px",    paddingLeft: {lg:"60px !important",xs:'15px'},
        paddingRight: {lg:"60px !important",xs:'15px'},}}
        className="indicators"
        >
        {jsnHeroSection.lstSlidesImgs.map((_, idx) => {
          return (
            <button
              key={idx}
              className={
                slide === idx ? "indicator" : "indicator indicator-inactive"
              }
              onClick={() => setSlide(idx)}
            ></button>
          );
        })}
      </Grid>
    </Grid>
  );
};
export default HeroCarousel;
