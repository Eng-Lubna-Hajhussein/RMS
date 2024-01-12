import "./Carousel.css";
import React, { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import { dictionary } from "appHelper/appDictionary";

const style = {
  container: {
    height: { lg: "600px", xs: "700px" },
    paddingLeft: { lg: "60px !important", xs: "15px" },
    paddingRight: { lg: "60px !important", xs: "15px" },
  },
  title: {
    color: "#fff",
    textTransform: "capitalize",
    fontSize: { lg: "50px !important", xs: "30px" },
    lineHeight: "1.2",
    width: { lg: "60%" },
    fontWeight: "700 !important",
    fontFamily: "Fredoka !important",
  },
  subtitle: {
    color: "#fff !important",
    textTransform: "capitalize",
    fontSize: { lg: "20.5px !important", xs: "15px" },
    lineHeight: "34px",
    width: { lg: "60%" },
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

export const Carousel = ({ slides, activeSlides, activeColor,inactiveColor,justify,inset, lang, dir }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const indicators = Math.ceil(slides.length / activeSlides);

  return (
    <Grid
      container
      mx={0}
    //   sx={{ ...style.container, position: "relative" }}
      className="carousel-container"
    //   sx={{background:"red"}}

    >
        <Grid item container xs='12'>

      {slides.map((slide, idx) => {
        return (
          <div className={activeSlide === idx ? "slide" : "slide slide-hidden"}>
            <Grid
              container
              item
              xs='12'
              sx={{
                ...slide.sxStyle,
                ":before": slide?.image&& {
                  background: `url(${slide?.image})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  transform: dir === "rtl" && "scaleX(-1)",
                  height: { lg: "600px", xs: "700px" },
                  width: "100%",
                  content: '""',
                  position: "absolute",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  zIndex: "-1",
                },
              }}
            >
              {activeSlides===1&&slide?.slideContent}
              {activeSlides===2&&(
                <>
                <Grid item container xs={"12"} lg="6" >
                    {slide?.slideContent}
                </Grid>
               {slides[idx+1]&& <Grid item container xs={"12"} lg="6" sx={{display:{lg:"flex",xs:"none"}}}>
                    {slides[idx+1]?.slideContent}
                </Grid>}
                </>
              )}
              {activeSlides===3&&(
                <>
                <Grid item container xs={"12"} lg="4" >
                    {slide.slideContent}
                </Grid>
                {slides[idx+1]&&<Grid item container xs={"12"} lg="4" sx={{display:{lg:"flex",xs:"none"}}}>
                    {slides[idx+1]?.slideContent}
                </Grid>}
                {slides[idx+2]&&<Grid item container xs={"12"} lg="4" sx={{display:{lg:"flex",xs:"none"}}}>
                    {slides[idx+2]?.slideContent}
                </Grid>}
                </>
              )}
            </Grid>
          </div>
        );
      })}
        </Grid>
      {indicators>1&&<Grid
        item
        container
        xs="12"
        justifyContent={justify}
        display={{lg:"flex",xs:"none"}}
        sx={inset&&{
          marginTop: "-50px",
          paddingLeft: { lg: "60px !important", xs: "15px" },
          paddingRight: { lg: "60px !important", xs: "15px" },
          
        }}
        className="indicators"
      >
        { Array(indicators).fill(1)
          .map((_, idx) => {
            return (
              <button
                key={idx}
                className={
                    activeSlide === idx ? "indicator" : "indicator indicator-inactive"
                }
                style={{ borderColor: activeColor ,backgroundColor:activeSlide==idx?'transparent':inactiveColor}}
                onClick={() => setActiveSlide(idx)}
              ></button>
            );
          })}
      </Grid>}
      {slides.length>1&&<Grid
        item
        container
        xs="12"
        justifyContent={justify}
        display={{lg:"none",xs:"flex"}}
        sx={inset&&{
          marginTop: "-50px",
          paddingLeft: { lg: "60px !important", xs: "15px" },
          paddingRight: { lg: "60px !important", xs: "15px" },
          
        }}
        className="indicators"
      >
        { Array(indicators).fill(1)
          .map((_, idx) => {
            return (
              <button
                key={idx}
                className={
                    activeSlide === idx ? "indicator" : "indicator indicator-inactive"
                }
                style={{ borderColor: activeColor ,backgroundColor:activeSlide==idx?'transparent':inactiveColor}}
                onClick={() => setActiveSlide(idx)}
              ></button>
            );
          })}
      </Grid>}
    </Grid>
  );
};
export default Carousel;
