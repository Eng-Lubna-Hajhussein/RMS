import React, { useState } from "react";
import { Grid } from "@mui/material";
import AnimationBG from "../AnimationBG/AnimationBG";
import "./Carousel.css";

const styles = {
  container: {
    backgroundPosition: "center",
    backgroundSize: "cover",
    
    height: { lg: "600px", xs: "700px" },
    width: "100%",
    content: '""',
    position: "absolute",
    left: "0",
    right: "0",
    bottom: "0",
    zIndex: "-1",
  },
  lgDisplay: {
    display: { lg: "flex", xs: "none" },
  },
  insetIndicators: {
    marginTop: "-80px",
    paddingX: { lg: "60px !important", xs: "15px" },
  },
};

export const Carousel = ({
  slides,
  activeSlides,
  activeColor,
  inactiveColor,
  justify,
  inset,
  lang,
  dir,
  editable,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const indicators = Math.ceil(slides.length / activeSlides);

  return (
    <Grid container mx={0} className="carousel-container">
      <Grid item container xs={12}>
        {slides.map((slide, index) => {
          return (
            <div
              className={activeSlide === index ? "slide" : "slide slide-hidden"}
              key={index}
            >
              <AnimationBG type={slide?.bgAnimation || "none"}>
                <Grid
                  container
                  item
                  xs={12}
                  sx={{
                    ...slide.sxStyle,
                    ":before": slide?.image && {
                      background: `url(${slide?.image})`,
                      transform: dir === "rtl" && "scaleX(-1)",
                      ...styles.container,
                    },
                  }}
                >
                  {activeSlides === 1 && slide?.slideContent}
                  {activeSlides === 2 && index === 0 && (
                    <>
                      <Grid item container xs={12} lg={6}>
                        {slide?.slideContent}
                      </Grid>
                      {slides[index + 1] && (
                        <Grid
                          item
                          container
                          xs={12}
                          lg={6}
                          sx={styles.lgDisplay}
                        >
                          {slides[index + 1]?.slideContent}
                        </Grid>
                      )}
                    </>
                  )}
                  {activeSlides === 2 && index !== 0 && (
                    <>
                      {slides[index * activeSlides]?.slideContent && (
                        <Grid item lg={6} sx={styles.lgDisplay}>
                          {slides[index * activeSlides]?.slideContent}
                        </Grid>
                      )}
                      {slides[index * activeSlides + 1]?.slideContent && (
                        <Grid item lg={6} sx={styles.lgDisplay}>
                          {slides[index * activeSlides + 1]?.slideContent}
                        </Grid>
                      )}
                    </>
                  )}
                  {activeSlides === 3 && index === 0 && (
                    <>
                      <Grid item container xs={12} lg={4}>
                        {slide?.slideContent}
                      </Grid>
                      {slides[index + 1] && (
                        <Grid
                          item
                          container
                          xs={12}
                          lg={4}
                          sx={styles.lgDisplay}
                        >
                          {slides[index + 1]?.slideContent}
                        </Grid>
                      )}
                      {slides[index + 2] && (
                        <Grid
                          item
                          container
                          xs={12}
                          lg={4}
                          sx={styles.lgDisplay}
                        >
                          {slides[index + 2]?.slideContent}
                        </Grid>
                      )}
                    </>
                  )}
                  {activeSlides === 3 && index !== 0 && (
                    <>
                      {slides[index * activeSlides]?.slideContent && (
                        <Grid item xs={4} lg={4} sx={styles.lgDisplay}>
                          {slides[index * activeSlides]?.slideContent}
                        </Grid>
                      )}
                      {slides[index * activeSlides + 1]?.slideContent && (
                        <Grid item xs={4} lg={4} sx={styles.lgDisplay}>
                          {slides[index * activeSlides + 1]?.slideContent}
                        </Grid>
                      )}
                      {slides[index * activeSlides + 2]?.slideContent && (
                        <Grid item xs={4} lg={4} sx={styles.lgDisplay}>
                          {index === 0
                            ? slides[index + 2]?.slideContent
                            : slides[index * activeSlides + 2]?.slideContent}
                        </Grid>
                      )}
                    </>
                  )}
                </Grid>
              </AnimationBG>
            </div>
          );
        })}
      </Grid>
      {indicators > 1 && (
        <Grid
          item
          container
          xs={12}
          justifyContent={justify}
          display={styles.lg}
          sx={inset && styles.insetIndicators}
          className="indicators"
          py={!inset && 3}
        >
          {Array(indicators)
            .fill(1)
            .map((_, index) => {
              return (
                <button
                  key={index}
                  className={
                    activeSlide === index
                      ? "indicator"
                      : "indicator indicator-inactive"
                  }
                  style={{
                    borderColor: activeColor,
                    backgroundColor:
                      activeSlide == index ? "transparent" : inactiveColor,
                  }}
                  onClick={() => setActiveSlide(index)}
                ></button>
              );
            })}
        </Grid>
      )}
      {slides.length > 1 && (
        <Grid
          item
          container
          xs={12}
          justifyContent={justify}
          display={{ lg: "none", xs: "flex" }}
          sx={inset && styles.insetIndicators}
          className="indicators"
        >
          {Array(indicators)
            .fill(1)
            .map((_, index) => {
              return (
                <button
                  key={index}
                  className={
                    activeSlide === index
                      ? "indicator"
                      : "indicator indicator-inactive"
                  }
                  style={{
                    borderColor: activeColor,
                    backgroundColor:
                      activeSlide == index ? "transparent" : inactiveColor,
                  }}
                  onClick={() => setActiveSlide(index)}
                ></button>
              );
            })}
        </Grid>
      )}
    </Grid>
  );
};
export default Carousel;
